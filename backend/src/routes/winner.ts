import { Router } from 'express';
import { requireAuth, AuthRequest } from '../middleware/auth';
import { supabase } from '../db';

const router = Router();

// Upload proof (URL provided by frontend Supabase Storage upload, just updating DB here)
router.post('/upload-proof', requireAuth, async (req: AuthRequest, res) => {
    try {
        const { draw_result_id, proof_url } = req.body;
        if (!draw_result_id || !proof_url) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const { data, error } = await supabase
            .from('winners')
            .insert({
                user_id: req.user.id,
                draw_result_id,
                proof_url,
                status: 'pending'
            })
            .select()
            .single();

        if (error) throw error;
        res.json(data);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// Get user's winner statuses
router.get('/status', requireAuth, async (req: AuthRequest, res) => {
    try {
        const { data, error } = await supabase
            .from('winners')
            .select('*, draw_results(prize_amount)')
            .eq('user_id', req.user.id);

        if (error) throw error;
        res.json(data);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
