# Stripe Configuration

## Environment Variables Required

Add these to your `.env` file:

```bash
# Get these from https://dashboard.stripe.com/apikeys
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here

# Webhook secret - Get this from https://dashboard.stripe.com/webhooks
# For local testing, use Stripe CLI: stripe listen --forward-to localhost:3000/api/stripe/webhook
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

## Testing Webhooks Locally

1. Install Stripe CLI: https://stripe.com/docs/stripe-cli
2. Login: `stripe login`
3. Forward webhooks to local server:
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```
4. The CLI will provide a webhook secret - add it to your `.env` file
5. Test a payment to trigger webhook events

## Database Migration

Run the following command to create the Payment table:

```bash
npx prisma migrate dev --name add_payment_table
```

This will:
- Create a new migration file
- Apply the migration to your database
- Regenerate Prisma Client
