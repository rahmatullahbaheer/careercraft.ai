import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";
import Stripe from "stripe";
import User from "@/db/schemas/User";
import startDB from "@/lib/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// GET - List customer's saved payment methods
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

    const user = await User.findOne({ email: session.user.email });

    if (!user || !user.stripeCustomerId) {
      return NextResponse.json({
        paymentMethods: [],
        message: "No payment methods found",
      });
    }

    // List payment methods from Stripe
    const paymentMethods = await stripe.paymentMethods.list({
      customer: user.stripeCustomerId,
      type: "card",
    });

    const formattedMethods = paymentMethods.data.map((pm) => ({
      id: pm.id,
      brand: pm.card.brand,
      last4: pm.card.last4,
      expMonth: pm.card.exp_month,
      expYear: pm.card.exp_year,
      isDefault: false, // You can implement default logic
    }));

    return NextResponse.json({
      paymentMethods: formattedMethods,
    });
  } catch (error) {
    console.error("Error fetching payment methods:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch payment methods",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

// POST - Save a new payment method
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
    const { paymentMethodId } = body;

    if (!paymentMethodId) {
      return NextResponse.json(
        { error: "Payment method ID is required" },
        { status: 400 }
      );
    }

    await startDB();

    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Create or get customer
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

    // Attach payment method to customer
    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: customerId,
    });

    // Get the attached payment method details
    const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId);

    return NextResponse.json({
      success: true,
      paymentMethod: {
        id: paymentMethod.id,
        brand: paymentMethod.card.brand,
        last4: paymentMethod.card.last4,
        expMonth: paymentMethod.card.exp_month,
        expYear: paymentMethod.card.exp_year,
      },
    });
  } catch (error) {
    console.error("Error saving payment method:", error);
    return NextResponse.json(
      {
        error: "Failed to save payment method",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

// DELETE - Remove a payment method
export async function DELETE(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const url = new URL(req.url);
    const paymentMethodId = url.searchParams.get("payment_method_id");

    if (!paymentMethodId) {
      return NextResponse.json(
        { error: "Payment method ID is required" },
        { status: 400 }
      );
    }

    // Detach payment method from customer
    await stripe.paymentMethods.detach(paymentMethodId);

    return NextResponse.json({
      success: true,
      message: "Payment method removed successfully",
    });
  } catch (error) {
    console.error("Error removing payment method:", error);
    return NextResponse.json(
      {
        error: "Failed to remove payment method",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
