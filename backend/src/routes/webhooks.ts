import express, { Router } from 'express';
import { requireAuth, AuthRequest } from '../middleware/auth';
import { supabase } from '../db';
import Stripe from 'stripe';

const router = Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2026-02-25.clover' });

// Stripe webhook endpoint MUST be raw body for signature verification
router.post('/', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];

    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig as string, process.env.STRIPE_WEBHOOK_SECRET || '');
    } catch (err: any) {
        console.error(`Webhook Error: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    try {
        switch (event.type) {
            case 'customer.subscription.created':
            case 'customer.subscription.updated':
            case 'customer.subscription.deleted':
                const subscription = event.data.object as Stripe.Subscription;

                // Find user by stripe_customer_id
                // (Assuming you mapped customer_id during checkout session creation)
                const stripeCustomerId = subscription.customer as string;

                const { data: userSub, error: findError } = await supabase
                    .from('subscriptions')
                    .select('user_id')
                    .eq('stripe_customer_id', stripeCustomerId)
                    .single();

                if (findError) {
                    console.error('Could not find user for stripe customer', stripeCustomerId);
                    break;
                }

                const statusMap: Record<string, string> = {
                    active: 'active',
                    past_due: 'inactive',
                    canceled: 'cancelled',
                    unpaid: 'expired',
                };

                const mappedStatus = statusMap[subscription.status] || 'inactive';

                const { error: updateError } = await supabase
                    .from('subscriptions')
                    .update({
                        stripe_subscription_id: subscription.id,
                        status: mappedStatus,
                        period_end: new Date((subscription as any).current_period_end * 1000).toISOString(),
                    })
                    .eq('user_id', userSub.user_id);

                if (updateError) {
                    console.error('Error updating subscription', updateError);
                }
                break;
            default:
                console.log(`Unhandled event type ${event.type}`);
        }

        res.json({ received: true });
    } catch (err) {
        console.error('Webhook processing error:', err);
        res.status(500).send('Internal Server Error');
    }
});

export default router;
