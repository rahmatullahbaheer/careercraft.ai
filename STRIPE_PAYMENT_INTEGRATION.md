# Stripe Payment Integration Setup

This document explains how to set up and use the Stripe payment integration in the CareerCraft.ai application.

## Overview

The application includes two payment methods:

1. **Stripe Checkout** - Redirects users to Stripe's hosted checkout page
2. **Payment Intents** - In-app payment form using Stripe Elements

## Environment Variables

Add these environment variables to your `.env.local` file:

```env
# Stripe Keys
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_stripe_webhook_secret_here

# App URL
NEXTAUTH_URL=http://localhost:3000
```

## API Endpoints

### Payment Intent Flow

#### Create Payment Intent

- **URL**: `/api/stripe/create-payment-intent`
- **Method**: `POST`
- **Body**: `{ packageId: string }`
- **Response**: `{ clientSecret, paymentIntentId, amount, currency, packageInfo }`

#### Confirm Payment

- **URL**: `/api/stripe/confirm-payment`
- **Method**: `POST`
- **Body**: `{ paymentIntentId: string }`
- **Response**: `{ success, message, payment, user }`

#### Get Payment Intent Status

- **URL**: `/api/stripe/create-payment-intent?payment_intent_id=pi_xxx`
- **Method**: `GET`
- **Response**: `{ id, status, amount, currency, metadata, charges }`

### Checkout Session Flow

#### Create Checkout Session

- **URL**: `/api/stripe/create-checkout-session`
- **Method**: `POST`
- **Body**: `{ packageId: string }`
- **Response**: `{ url, sessionId }`

#### Verify Payment

- **URL**: `/api/stripe/verify-payment`
- **Method**: `POST`
- **Body**: `{ sessionId: string }`
- **Response**: Payment verification details

### Payment Management

#### Get Payment Status

- **URL**: `/api/user/payment-status`
- **Method**: `GET`
- **Response**: User's credit status and payment history

#### Manage Payment Methods

- **URL**: `/api/stripe/payment-methods`
- **Methods**: `GET`, `POST`, `DELETE`
- **Purpose**: List, save, and remove customer payment methods

## Frontend Components

### StripePaymentModal

A React component that provides in-app payment using Stripe Elements.

**Usage:**

```jsx
import StripePaymentModal from "@/components/StripePaymentModal";

<StripePaymentModal
  isOpen={showPaymentModal}
  onClose={() => setShowPaymentModal(false)}
  packageData={selectedPackage}
  onSuccess={handlePaymentSuccess}
/>;
```

### Price Component

The main pricing page component with both payment methods integrated.

**Features:**

- Payment method selection (Checkout vs Payment Intent)
- Package display with pricing
- Authentication checks
- Success/error handling

## Webhook Setup

1. **Create Webhook in Stripe Dashboard**

   - URL: `https://yourdomain.com/api/webhooks/stripe`
   - Events: `checkout.session.completed`, `payment_intent.succeeded`

2. **Configure Webhook Secret**

   - Add the webhook secret to your environment variables

3. **Webhook Events Handled:**
   - `checkout.session.completed` - For Checkout Session payments
   - `payment_intent.succeeded` - For Payment Intent payments

## Payment Flow

### Checkout Session Flow

1. User selects package and clicks "Purchase Now"
2. Frontend calls `/api/stripe/create-checkout-session`
3. User redirected to Stripe Checkout
4. After payment, user redirected to success page
5. Success page calls `/api/stripe/verify-payment`
6. Webhook processes the payment and adds credits

### Payment Intent Flow

1. User selects package and "Card Payment" method
2. Payment modal opens with Stripe Elements
3. Frontend calls `/api/stripe/create-payment-intent`
4. User enters card details and submits
5. Frontend calls `stripe.confirmCardPayment()`
6. Frontend calls `/api/stripe/confirm-payment` to finalize
7. Credits added to user account

## Testing

### Test Cards

Use Stripe's test cards for testing:

- **Success**: `4242424242424242`
- **Declined**: `4000000000000002`
- **3D Secure**: `4000000000003220`

### Test Mode

- Use test API keys during development
- Test webhooks using Stripe CLI: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`

## Security Features

1. **Authentication Required**: All payment endpoints require user authentication
2. **Payment Verification**: Payments are verified server-side before adding credits
3. **Duplicate Prevention**: Payments are checked to prevent double-processing
4. **Webhook Signature Verification**: Webhooks are verified using Stripe signatures

## Error Handling

The integration includes comprehensive error handling for:

- Authentication failures
- Invalid package IDs
- Payment processing errors
- Network issues
- Webhook validation failures

## Package Structure

```
src/
├── app/
│   ├── api/
│   │   ├── stripe/
│   │   │   ├── create-payment-intent/route.js
│   │   │   ├── confirm-payment/route.js
│   │   │   ├── create-checkout-session/route.js
│   │   │   ├── verify-payment/route.js
│   │   │   └── payment-methods/route.js
│   │   ├── user/
│   │   │   └── payment-status/route.js
│   │   └── webhooks/
│   │       └── stripe/route.js
│   ├── payment/
│   │   ├── success/page.jsx
│   │   └── cancel/page.jsx
│   └── (guest)/
│       └── Price.jsx
└── components/
    └── StripePaymentModal.jsx
```

## Dependencies

```json
{
  "stripe": "^18.3.0",
  "@stripe/stripe-js": "^latest",
  "@stripe/react-stripe-js": "^latest"
}
```

## Production Checklist

- [ ] Replace test API keys with live keys
- [ ] Update webhook URLs to production domain
- [ ] Test all payment flows in production environment
- [ ] Monitor webhook deliveries in Stripe Dashboard
- [ ] Set up proper error monitoring and logging
- [ ] Configure proper CORS and security headers
- [ ] Test refund and dispute handling processes
