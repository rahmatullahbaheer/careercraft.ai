import { NextResponse } from "next/server";
import User from "@/db/schemas/User";
import startDB from "@/lib/db";

export async function GET(req) {
  try {
    const TARGET_EMAIL = "baheer224@gmail.com";

    console.log(`=== CHECKING STATUS FOR ${TARGET_EMAIL} ===`);

    await startDB();

    const user = await User.findOne({ email: TARGET_EMAIL });

    if (!user) {
      console.log(`❌ User ${TARGET_EMAIL} not found`);
      return NextResponse.json({
        found: false,
        email: TARGET_EMAIL,
        message: "User not found in database",
      });
    }

    console.log(`✅ User found: ${user.firstName} ${user.lastName}`);
    console.log(
      `Credits: userCredits=${user.userCredits || 0}, totalCredits=${
        user.totalCredits || 0
      }`
    );
    console.log(`Package: ${user.userPackage || "None"}`);
    console.log(`Status: ${user.subscriptionStatus || "inactive"}`);
    console.log(`Stripe Customer: ${user.stripeCustomerId || "None"}`);
    console.log(`Payment History: ${user.paymentHistory?.length || 0} entries`);

    // Get recent payments
    const recentPayments = user.paymentHistory
      ? user.paymentHistory
          .sort((a, b) => new Date(b.paymentDate) - new Date(a.paymentDate))
          .slice(0, 10)
          .map((payment, index) => ({
            index: index + 1,
            id: payment.paymentIntentId || payment._id,
            packageName: payment.packageName,
            amount: payment.amount,
            credits: payment.creditsAdded || payment.credits,
            date: payment.paymentDate,
            status: payment.status,
          }))
      : [];

    console.log(`Recent Payments:`, recentPayments);
    console.log(`=== STATUS CHECK COMPLETE ===`);

    return NextResponse.json({
      found: true,
      email: TARGET_EMAIL,
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
        registeredPhone: user.registeredPhone,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      payments: {
        total: user.paymentHistory?.length || 0,
        recent: recentPayments,
      },
      debug: {
        userCreditsType: typeof user.userCredits,
        totalCreditsType: typeof user.totalCredits,
        paymentHistoryExists: !!user.paymentHistory,
        fieldsPresent: {
          userCredits: user.userCredits !== undefined,
          totalCredits: user.totalCredits !== undefined,
          userPackage: user.userPackage !== undefined,
          subscriptionStatus: user.subscriptionStatus !== undefined,
          paymentHistory: user.paymentHistory !== undefined,
        },
      },
    });
  } catch (error) {
    console.error("❌ Error checking Baheer status:", error);
    return NextResponse.json(
      {
        error: "Failed to check status",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
