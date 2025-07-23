import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";
import Stripe from "stripe";
import Package from "@/db/schemas/Package";
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
    const { packageId } = body;

    if (!packageId) {
      return NextResponse.json(
        { error: "Package ID is required" },
        { status: 400 }
      );
    }

    await startDB();

    // Get package details
    const packageData = await Package.findById(packageId);

    if (!packageData) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 });
    }

    if (packageData.status !== "active") {
      return NextResponse.json(
        { error: "Package is not available" },
        { status: 400 }
      );
    }

    // Create Stripe checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: session.user.email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: packageData.name,
              description: `${packageData.credits} credits included. ${
                packageData.description || ""
              }`,
              metadata: {
                packageId: packageData._id.toString(),
                credits: packageData.credits.toString(),
              },
            },
            unit_amount: Math.round(packageData.price * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXTAUTH_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/payment/cancel?canceled=true`,
      metadata: {
        packageId: packageData._id.toString(),
        userId: session.user.email,
        credits: packageData.credits.toString(),
        packageName: packageData.name,
      },
    });

    return NextResponse.json({
      url: checkoutSession.url,
      sessionId: checkoutSession.id,
    });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
