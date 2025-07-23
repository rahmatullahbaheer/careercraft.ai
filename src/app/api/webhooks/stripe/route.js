import { NextResponse } from "next/server";
import Stripe from "stripe";
import { updateUserAfterPayment } from "@/helpers/updateUserAfterPayment.js";
import { updateUserCreditsByAdmin } from "@/helpers/updateUserCreditsByAdmin";
import User from "@/db/schemas/User";
import Package from "@/db/schemas/Package";
import startDB from "@/lib/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error(`Webhook signature verification failed.`, err.message);
    return NextResponse.json(
      { error: "Webhook signature verification failed" },
      { status: 400 }
    );
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      await handleCheckoutSessionCompleted(event.data.object);
      break;
    case "payment_intent.succeeded":
      await handlePaymentIntentSucceeded(event.data.object);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

async function handleCheckoutSessionCompleted(session) {
  try {
    console.log("Processing checkout session completed:", session.id);

    await startDB();

    // Get customer email from session
    const customerEmail =
      session.customer_details?.email || session.customer_email;

    if (!customerEmail) {
      console.error("No customer email found in session");
      return;
    }

    // Get the price ID from line items
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
    const priceId = lineItems.data[0]?.price?.id;

    if (!priceId) {
      console.error("No price ID found in session");
      return;
    }

    // Find the package by Stripe price ID or metadata
    let packageData = null;

    // First try to find by metadata (for new checkout sessions)
    if (session.metadata?.packageId) {
      packageData = await Package.findById(session.metadata.packageId);
    }

    // Fallback to finding by price ID (for existing integrations)
    if (!packageData && priceId) {
      packageData = await Package.findOne({
        stripePriceLine: { $regex: priceId, $options: "i" },
      });
    }

    if (!packageData) {
      console.error(
        `Package not found for price ID: ${priceId} or metadata packageId: ${session.metadata?.packageId}`
      );
      return;
    }

    // Find user by email
    const user = await User.findOne({ email: customerEmail });

    if (!user) {
      console.error(`User not found with email: ${customerEmail}`);
      return;
    }

    console.log(`=== CHECKOUT SESSION PROCESSING START ===`);
    console.log(`Session ID: ${session.id}`);
    console.log(`Customer Email: ${customerEmail}`);
    console.log(
      `Package: ${packageData.name}, Credits: ${packageData.credits}`
    );

    // Add credits to user account and update payment history
    if (packageData.credits && packageData.credits > 0) {
      try {
        console.log(`🔄 Processing atomic payment update for ${customerEmail}...`);
        
        const paymentData = {
          paymentIntentId: session.payment_intent || session.id,
          amount: (session.amount_total || 0) / 100, // Convert to dollars
          currency: session.currency || "usd",
          stripeChargeId: session.payment_intent,
          metadata: session.metadata || {},
        };

        // Single atomic update
        const updatedUser = await updateUserAfterPayment(
          customerEmail,
          packageData.credits,
          packageData,
          paymentData
        );

        console.log(`✅ Atomic checkout session update completed`);
        console.log(`✅ Final state: userCredits=${updatedUser.userCredits}, totalCredits=${updatedUser.totalCredits}`);
        console.log(`✅ Final package: ${updatedUser.userPackage}, packageId=${updatedUser.creditPackage}`);
        
      } catch (creditError) {
        console.error(
          `❌ Failed to process atomic update for ${customerEmail}:`,
          creditError
        );
        
        // Fallback to individual updates if atomic update fails
        console.log(`🔄 Falling back to individual updates...`);
        await updateUserCreditsByAdmin(customerEmail, packageData.credits);
        
        // Manual package update as fallback
        await User.findOneAndUpdate(
          { email: customerEmail },
          {
            userPackage: packageData.name,
            creditPackage: packageData._id.toString(),
            lastPaymentDate: new Date(),
            subscriptionStatus: "active",
            $push: {
              paymentHistory: {
                paymentIntentId: session.payment_intent || session.id,
                packageId: packageData._id.toString(),
                packageName: packageData.name,
                creditsAdded: packageData.credits || 0,
                paymentDate: new Date(),
                amount: session.amount_total || 0,
                status: "completed",
              }
            }
          }
        );
      }
    }

    console.log(`=== CHECKOUT SESSION PROCESSING END ===`);
  } catch (error) {
      console.error(
        `Failed to update user package info for ${customerEmail}:`,
        updateError
      );
      throw updateError; // This is critical, so we should fail the webhook
    }
  } catch (error) {
    console.error("Error processing checkout session:", error);
    // You might want to log this to an error tracking service
    throw error; // Re-throw to ensure Stripe knows about the failure
  }
}

async function handlePaymentIntentSucceeded(paymentIntent) {
  try {
    console.log("Processing payment intent succeeded:", paymentIntent.id);

    await startDB();

    // Get customer email from payment intent
    let customerEmail = paymentIntent.receipt_email;

    // If not found in receipt_email, try to get from metadata or customer object
    if (!customerEmail) {
      customerEmail = paymentIntent.metadata?.userEmail;
    }

    // If still not found, try to get from customer object
    if (!customerEmail && paymentIntent.customer) {
      const customer = await stripe.customers.retrieve(paymentIntent.customer);
      customerEmail = customer.email;
    }

    if (!customerEmail) {
      console.log("No customer email found in payment intent - skipping");
      return;
    }

    // Check if this payment intent has metadata with package information
    const packageId = paymentIntent.metadata?.packageId;

    if (packageId) {
      // Find the package
      const packageData = await Package.findById(packageId);

      if (!packageData) {
        console.error(`Package not found for ID: ${packageId}`);
        return;
      }

      // Find user by email
      const user = await User.findOne({ email: customerEmail });

      if (!user) {
        console.error(`User not found with email: ${customerEmail}`);
        return;
      }

      console.log(
        `=== PAYMENT INTENT PROCESSING START ===`
      );
      console.log(`Payment Intent ID: ${paymentIntent.id}`);
      console.log(`Customer Email: ${customerEmail}`);
      console.log(`Package: ${packageData.name}, Credits: ${packageData.credits}`);

      // Use atomic update for payment intent
      if (packageData.credits && packageData.credits > 0) {
        try {
          console.log(`🔄 Processing atomic payment intent update for ${customerEmail}...`);
          
          const paymentData = {
            paymentIntentId: paymentIntent.id,
            amount: (paymentIntent.amount || 0) / 100, // Convert to dollars
            currency: paymentIntent.currency || "usd",
            stripeChargeId: paymentIntent.charges?.data[0]?.id,
            metadata: paymentIntent.metadata || {},
          };

          // Single atomic update
          const updatedUser = await updateUserAfterPayment(
            customerEmail,
            packageData.credits,
            packageData,
            paymentData
          );

          console.log(`✅ Atomic payment intent update completed`);
          console.log(`✅ Final state: userCredits=${updatedUser.userCredits}, totalCredits=${updatedUser.totalCredits}`);
          console.log(`✅ Final package: ${updatedUser.userPackage}, packageId=${updatedUser.creditPackage}`);
          
        } catch (updateError) {
          console.error(`❌ Failed to process atomic update for payment intent:`, updateError);
          
          // Fallback to individual updates
          await updateUserCreditsByAdmin(customerEmail, packageData.credits);
          
          await User.findOneAndUpdate(
            { email: customerEmail },
            {
              userPackage: packageData.name,
              creditPackage: packageData._id.toString(),
              lastPaymentDate: new Date(),
              subscriptionStatus: "active",
              $push: {
                paymentHistory: {
                  paymentIntentId: paymentIntent.id,
                  packageId: packageData._id.toString(),
                  packageName: packageData.name,
                  creditsAdded: packageData.credits || 0,
                  paymentDate: new Date(),
                  amount: paymentIntent.amount || 0,
                  status: "completed",
                }
              }
            }
          );
        }
      }
      
      console.log(`=== PAYMENT INTENT PROCESSING END ===`);
    } else {
      console.log(
        "Payment intent has no package metadata - likely a different type of payment"
      );
    }
  } catch (error) {
    console.error("Error processing payment intent:", error);
    throw error; // Re-throw to ensure Stripe knows about the failure
  }
}
