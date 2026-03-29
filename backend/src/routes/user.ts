import { Router } from 'express';
import { requireAuth, AuthRequest } from '../middleware/auth';
import { supabase } from '../db';

const router = Router();

// Get user profile including subscription auth status
router.get('/profile', requireAuth, async (req: AuthRequest, res) => {
    try {
        const { data: user, error: userError } = await supabase
            .from('users')
            .select('*, subscriptions(*), charities(*)')
            .eq('id', req.user.id)
            .single();

        if (userError) throw userError;

        res.json(user);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// Update user settings (charity config)
router.put('/settings', requireAuth, async (req: AuthRequest, res) => {
    try {
        const { charity_id, contribution_pct } = req.body;

        if (contribution_pct !== undefined && (contribution_pct < 10 || contribution_pct > 100)) {
            return res.status(400).json({ error: 'Contribution percentage must be between 10 and 100' });
        }

        const updates: any = {};
        if (charity_id) updates.charity_id = charity_id;
        if (contribution_pct !== undefined) updates.contribution_pct = contribution_pct;

        const { data: user, error: userError } = await supabase
            .from('users')
            .update(updates)
            .eq('id', req.user.id)
            .select()
            .single();

        if (userError) throw userError;

        res.json(user);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
