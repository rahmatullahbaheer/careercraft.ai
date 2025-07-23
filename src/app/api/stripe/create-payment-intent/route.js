import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";
import Stripe from "stripe";
import Package from "@/db/schemas/Package";
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
    const { packageId, currency = "usd" } = body;

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

    // Free packages don't need payment intent
    if (packageData.price === 0) {
      return NextResponse.json(
        { error: "Free packages don't require payment" },
        { status: 400 }
      );
    }

    // Get user details
    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Calculate amount in smallest currency unit (cents for USD)
    const amount = Math.round(packageData.price * 100);

    // Create or retrieve customer
    let customerId = user.stripeCustomerId;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: session.user.email,
        name: session.user.name,
        metadata: {
          userId: user._id.toString(),
        },
      });
      customerId = customer.id;

      // Save customer ID to user
      await User.findByIdAndUpdate(user._id, {
        stripeCustomerId: customerId,
      });
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      customer: customerId,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        packageId: packageData._id.toString(),
        userId: user._id.toString(),
        userEmail: session.user.email,
        packageName: packageData.name,
        credits: packageData.credits.toString(),
      },
      description: `Payment for ${packageData.name} - ${packageData.credits} credits`,
      statement_descriptor: "CareerCraft.ai",
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      amount: amount,
      currency: currency,
      packageInfo: {
        id: packageData._id,
        name: packageData.name,
        price: packageData.price,
        credits: packageData.credits,
        description: packageData.description,
      },
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    return NextResponse.json(
      {
        error: "Failed to create payment intent",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

// GET - Retrieve payment intent status
export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const url = new URL(req.url);
    const paymentIntentId = url.searchParams.get("payment_intent_id");

    if (!paymentIntentId) {
      return NextResponse.json(
        { error: "Payment Intent ID is required" },
        { status: 400 }
      );
    }

    // Retrieve payment intent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    return NextResponse.json({
      id: paymentIntent.id,
      status: paymentIntent.status,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      metadata: paymentIntent.metadata,
      created: paymentIntent.created,
      charges:
        paymentIntent.charges.data.length > 0
          ? {
              id: paymentIntent.charges.data[0].id,
              status: paymentIntent.charges.data[0].status,
              receipt_url: paymentIntent.charges.data[0].receipt_url,
            }
          : null,
    });
  } catch (error) {
    console.error("Error retrieving payment intent:", error);
    return NextResponse.json(
      {
        error: "Failed to retrieve payment intent",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
