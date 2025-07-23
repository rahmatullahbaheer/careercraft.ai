# Stripe Payment Integration Setup

## Required Environment Variables

Add these environment variables to your `.env.local` file:

```bash
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxx  # Your Stripe secret key (starts with sk_test_ for testing)
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxx   # Your webhook endpoint secret from Stripe dashboard
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx  # Your Stripe publishable key (starts with pk_test_ for testing)

# NextAuth URL (should already exist)
NEXTAUTH_URL=http://localhost:3000  # Your app's base URL
```

## How to Get Stripe Keys

1. **Sign up/Login to Stripe Dashboard**: https://dashboard.stripe.com/
2. **Get API Keys**:

   - Go to Developers > API keys
   - Copy the "Secret key" for `STRIPE_SECRET_KEY`
   - Copy the "Publishable key" for `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

3. **Set up Webhook**:
   - Go to Developers > Webhooks
   - Click "Add endpoint"
   - Set URL to: `https://yourdomain.com/api/webhooks/stripe` (or ngrok URL for testing)
   - Select events: `checkout.session.completed` and `payment_intent.succeeded`
   - Copy the "Signing secret" for `STRIPE_WEBHOOK_SECRET`

## Testing with ngrok (for local development)

```bash
# Install ngrok if you haven't already
npm install -g ngrok

# Expose your local server
ngrok http 3000

# Use the ngrok URL for webhook endpoint in Stripe dashboard
# Example: https://abc123.ngrok.io/api/webhooks/stripe
```

## Payment Flow Summary

1. User clicks "Purchase Now" on pricing page
2. System creates Stripe checkout session
3. User completes payment on Stripe
4. Stripe sends webhook to your app
5. Credits automatically added to user account
6. User sees success page with confirmation

## Files Created/Modified

- `/api/stripe/create-checkout-session/route.js` - Creates payment sessions
- `/api/stripe/verify-payment/route.js` - Verifies payment completion
- `/api/webhooks/stripe/route.js` - Handles payment success webhooks (ENHANCED)
- `/payment/success/page.jsx` - Payment success page
- `/payment/cancel/page.jsx` - Payment cancellation page
- `/pricing/page.jsx` - Pricing page component
- `Price.jsx` - Enhanced with Stripe integration (UPDATED)
