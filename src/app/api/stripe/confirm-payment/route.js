import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";
import Stripe from "stripe";
import Package from "@/db/schemas/Package";
import User from "@/db/schemas/User";
import startDB from "@/lib/db";
import { updateUserAfterPayment } from "@/helpers/updateUserAfterPayment.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { paymentIntentId } = body;

    if (!paymentIntentId) {
      return NextResponse.json(
        { error: "Payment Intent ID is required" },
        { status: 400 }
      );
    }

    await startDB();

    // Retrieve payment intent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (!paymentIntent) {
      return NextResponse.json(
        { error: "Payment intent not found" },
        { status: 404 }
      );
    }

    // Verify payment was successful
    if (paymentIntent.status !== "succeeded") {
      return NextResponse.json(
        { error: "Payment not completed" },
        { status: 400 }
      );
    }

    // Verify the user matches
    const user = await User.findOne({ email: session.user.email });
    if (!user || user._id.toString() !== paymentIntent.metadata.userId) {
      return NextResponse.json(
        { error: "Payment verification failed" },
        { status: 403 }
      );
    }

    // Check if payment has already been processed
    const existingPayment = await User.findOne({
      _id: user._id,
      "paymentHistory.paymentIntentId": paymentIntentId,
    });

    if (existingPayment) {
      return NextResponse.json(
        { error: "Payment already processed" },
        { status: 400 }
      );
    }

    // Get package details
    const packageData = await Package.findById(
      paymentIntent.metadata.packageId
    );

    if (!packageData) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 });
    }

    // Add credits to user account
    const creditsToAdd = parseInt(paymentIntent.metadata.credits) || 0;

    console.log(`=== PAYMENT CONFIRMATION START ===`);
    console.log(`User Email: ${session.user.email}`);
    console.log(`Payment Intent ID: ${paymentIntentId}`);
    console.log(`Package: ${packageData.name}`);
    console.log(`Credits to Add: ${creditsToAdd}`);

    if (creditsToAdd > 0) {
      console.log(
        `🔄 Processing atomic payment update for ${session.user.email}...`
      );

      // Prepare payment data for atomic update
      const paymentData = {
        paymentIntentId: paymentIntentId,
        amount: paymentIntent.amount / 100, // Convert back to dollars
        currency: paymentIntent.currency,
        stripeChargeId: paymentIntent.charges.data[0]?.id,
        metadata: paymentIntent.metadata,
      };

      // Single atomic update of all payment-related fields
      const updatedUser = await updateUserAfterPayment(
        session.user.email,
        creditsToAdd,
        packageData,
        paymentData
      );

      console.log(`✅ Atomic payment update completed successfully`);
      console.log(
        `✅ Final state: userCredits=${updatedUser.userCredits}, totalCredits=${updatedUser.totalCredits}`
      );
      console.log(
        `✅ Final package: ${updatedUser.userPackage}, packageId=${updatedUser.creditPackage}`
      );
      console.log(`=== PAYMENT CONFIRMATION END ===`);

      return NextResponse.json({
        success: true,
        message: "Payment confirmed and credits added successfully",
        payment: {
          id: paymentIntentId,
          amount: paymentIntent.amount / 100,
          currency: paymentIntent.currency,
          status: paymentIntent.status,
          package: {
            name: packageData.name,
            credits: creditsToAdd,
          },
        },
        user: {
          userCredits: updatedUser.userCredits,
          totalCredits: updatedUser.totalCredits,
          userPackage: updatedUser.userPackage,
          creditPackage: updatedUser.creditPackage,
          subscriptionStatus: updatedUser.subscriptionStatus,
        },
      });
    } else {
      console.log(`⚠️ No credits to add (creditsToAdd: ${creditsToAdd})`);
      return NextResponse.json(
        { error: "No credits to add for this package" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error confirming payment:", error);
    return NextResponse.json(
      {
        error: "Failed to confirm payment",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
