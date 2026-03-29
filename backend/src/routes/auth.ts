import express, { Router } from 'express';
import { supabase } from '../db';

const router = Router();

// For Supabase, signup/login are usually handled directly on the frontend using the JS client.
// However, if we need server-side auth endpoints or webhooks, we add them here.
// For example, a webhook to sync user profile from Auth to public.users

router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    // Optional: Listen to Supabase Database Webhooks if not using SQL triggers
    res.status(200).send();
});

export default router;
