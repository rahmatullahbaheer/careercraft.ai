import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";
import User from "@/db/schemas/User";
import startDB from "@/lib/db";

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    await startDB();

    const user = await User.findOne({ email: session.user.email }).select(
      "firstName lastName email userCredits totalCredits userPackage creditPackage subscriptionStatus lastPaymentDate paymentHistory stripeCustomerId"
    );

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get recent payment history
    const recentPayments = user.paymentHistory
      ? user.paymentHistory
          .sort((a, b) => new Date(b.paymentDate) - new Date(a.paymentDate))
          .slice(0, 5)
          .map((payment) => ({
            id: payment.paymentIntentId || payment._id,
            packageName: payment.packageName,
            amount: payment.amount,
            credits: payment.creditsAdded || payment.credits,
            date: payment.paymentDate,
            status: payment.status,
          }))
      : [];

    return NextResponse.json({
      user: {
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        userCredits: user.userCredits || 0,
        totalCredits: user.totalCredits || 0,
        userPackage: user.userPackage || "Free Plan",
        creditPackage: user.creditPackage,
        subscriptionStatus: user.subscriptionStatus || "inactive",
        lastPaymentDate: user.lastPaymentDate,
        stripeCustomerId: user.stripeCustomerId,
        hasStripeCustomer: !!user.stripeCustomerId,
      },
      recentPayments,
      debug: {
        userCreditsType: typeof user.userCredits,
        totalCreditsType: typeof user.totalCredits,
        paymentHistoryLength: user.paymentHistory
          ? user.paymentHistory.length
          : 0,
      },
    });
  } catch (error) {
    console.error("Error fetching user debug info:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch user info",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
