import { Router } from 'express';
import { requireAuth, AuthRequest } from '../middleware/auth';
import { supabase } from '../db';

const router = Router();

// Middleware to ensure admin role
const requireAdmin = async (req: AuthRequest, res: any, next: any) => {
    try {
        const { data: user, error } = await supabase
            .from('users')
            .select('role')
            .eq('id', req.user.id)
            .single();
        if (error || !user || user.role !== 'admin') {
            return res.status(403).json({ error: 'Forbidden: Admins only' });
        }
        next();
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

// Start a new draw (Admin only)
router.post('/run', requireAuth, requireAdmin, async (req: AuthRequest, res) => {
    try {
        const month = new Date().toISOString().slice(0, 7); // YYYY-MM
        // Generate 5 random winning numbers between 1 and 45
        const winning_numbers = Array.from({ length: 5 }, () => Math.floor(Math.random() * 45) + 1);

        const { data: draw, error: drawError } = await supabase
            .from('draws')
            .insert({
                month,
                mode: 'random',
                winning_numbers,
                status: 'published' // Simplification
            })
            .select()
            .single();

        if (drawError) throw drawError;

        // TODO: Advanced logic to match users' scores and distribute pool
        // In a real scenario, this would evaluate all active users' latest 5 scores against the winning numbers

        res.json(draw);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// Get latest draw results
router.get('/results', async (req, res) => {
    try {
        const { data: draws, error } = await supabase
            .from('draws')
            .select('*, draw_results(*)')
            .order('created_at', { ascending: false })
            .limit(1);

        if (error) throw error;
        res.json(draws[0] || null);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
