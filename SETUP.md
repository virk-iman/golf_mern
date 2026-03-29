# Golf Charity Subscription Platform - Setup Guide

## Prerequisites
- Node.js (v18+)
- Supabase Account
- Stripe Account
- Vercel Account (for deployment)

## 1. Supabase Setup
1. Create a new project in [Supabase](https://supabase.com).
2. Go to the **SQL Editor** and paste the contents of `backend/src/db/schema.sql`. Run it.
3. Go to **Authentication -> Providers** and ensure Email/Password is enabled.
4. Go to **Project Settings -> API** and copy:
   - `Project URL`
   - `anon public key`
   - `service_role secret`

## 2. Stripe Setup
1. Create a [Stripe](https://stripe.com) account.
2. In the dashboard, create two Products (recurring):
   - Monthly Subscription (e.g., $25/mo)
   - Yearly Subscription (e.g., $250/yr)
3. Copy the generated `price_...` IDs.
4. Get your Stripe Secret Key.
5. Set up a Webhook pointing to `https://your-backend-domain.com/api/webhooks` listening for:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
6. Copy the Webhook Secret.

## 3. Backend Setup
1. Navigate to `/backend`.
2. Copy `.env.example` to `.env` and fill in:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_KEY`
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET`
   - `STRIPE_MONTHLY_PRICE_ID`
   - `STRIPE_YEARLY_PRICE_ID`
3. Run `npm install`.
4. Run `npm run dev` to start the server on port 5000.

## 4. Frontend Setup
1. Navigate to `/frontend`.
2. Copy `.env.example` to `.local.env` and rename it to `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_BACKEND_URL=http://localhost:5000`
3. Run `npm install`.
4. Run `npm run dev` to start the Next.js app on port 3000.

## 5. Deployment
- **Backend**: Can be deployed to Render, Railway, or Heroku. Ensure you add the `.env` variables there.
- **Frontend**: Best deployed on [Vercel](https://vercel.com). Import the `/frontend` folder and add the `.env` variables.
