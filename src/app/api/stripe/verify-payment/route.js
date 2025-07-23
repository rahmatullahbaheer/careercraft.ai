import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";
import Stripe from "stripe";
import User from "@/db/schemas/User";
import startDB from "@/lib/db";

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
    const { sessionId } = body;

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID is required" },
        { status: 400 }
      );
    }

    // Retrieve the checkout session from Stripe
    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId);

    if (!checkoutSession) {
      return NextResponse.json(
        { error: "Invalid session ID" },
        { status: 404 }
      );
    }

    // Verify that the session belongs to the current user
    if (checkoutSession.customer_email !== session.user.email) {
      return NextResponse.json(
        { error: "Unauthorized access to payment session" },
        { status: 403 }
      );
    }

    await startDB();

    // Get user's current credit information
    const user = await User.findOne({ email: session.user.email }).select(
      "userCredits totalCredits paymentHistory userPackage"
    );

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Find the most recent payment for this session
    const recentPayment = user.paymentHistory.find(
      (payment) =>
        payment.paymentIntentId === checkoutSession.payment_intent ||
        payment.paymentIntentId === sessionId
    );

    // If payment is successful and we haven't already processed this payment
    if (checkoutSession.payment_status === "paid" && !recentPayment) {
      try {
        // Get package details from metadata
        const packageId = checkoutSession.metadata?.packageId;
        const creditsToAdd = parseInt(checkoutSession.metadata?.credits) || 0;
        const packageName =
          checkoutSession.metadata?.packageName || "Unknown Package";

        if (packageId && creditsToAdd > 0) {
          // Update user credits and package information
          const updatedUser = await User.findOneAndUpdate(
            { email: session.user.email },
            {
              // Increment credits
              $inc: {
                userCredits: creditsToAdd,
                totalCredits: creditsToAdd,
              },
              // Update package and subscription info
              userPackage: packageName,
              creditPackage: packageId,
              lastPaymentDate: new Date(),
              subscriptionStatus: "active",
              // Add payment to history
              $push: {
                paymentHistory: {
                  paymentIntentId: checkoutSession.payment_intent || sessionId,
                  packageId: packageId,
                  packageName: packageName,
                  creditsAdded: creditsToAdd,
                  amount: checkoutSession.amount_total || 0,
                  paymentDate: new Date(),
                  status: "completed",
                },
              },
            },
            {
              new: true,
              select:
                "userCredits totalCredits userPackage creditPackage subscriptionStatus",
            }
          );

          console.log(
            `✅ Payment verification completed for ${session.user.email}: ${creditsToAdd} credits added`
          );

          const responseData = {
            paymentStatus: checkoutSession.payment_status,
            packageName: packageName,
            creditsAdded: creditsToAdd,
            amountPaid: checkoutSession.amount_total || 0,
            totalCredits: updatedUser.userCredits || 0,
            userPackage: updatedUser.userPackage || "Free Plan",
            creditPackage: updatedUser.creditPackage,
            paymentDate: new Date(),
            updated: true, // Flag to indicate user was updated
          };

          return NextResponse.json(responseData);
        }
      } catch (updateError) {
        console.error(
          "Error updating user after payment verification:",
          updateError
        );
        // Continue with response even if update fails
      }
    }

    const responseData = {
      paymentStatus: checkoutSession.payment_status,
      packageName: checkoutSession.metadata?.packageName || "Unknown Package",
      creditsAdded:
        recentPayment?.creditsAdded ||
        parseInt(checkoutSession.metadata?.credits) ||
        0,
      amountPaid: checkoutSession.amount_total || 0,
      totalCredits: user.userCredits || 0,
      userPackage: user.userPackage || "Free Plan",
      creditPackage: user.creditPackage,
      paymentDate: recentPayment?.paymentDate || new Date(),
      updated: false, // Flag to indicate no update was made
    };

    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error verifying payment:", error);
    return NextResponse.json(
      { error: "Failed to verify payment" },
      { status: 500 }
    );
  }
}
