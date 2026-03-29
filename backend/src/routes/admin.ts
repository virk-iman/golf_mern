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

router.use(requireAuth, requireAdmin);

// Get all users
router.get('/users', async (req, res) => {
    try {
        const { data, error } = await supabase.from('users').select('*, subscriptions(*)');
        if (error) throw error;
        res.json(data);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// Add charity
router.post('/charities', async (req, res) => {
    try {
        const { data, error } = await supabase.from('charities').insert([req.body]).select();
        if (error) throw error;
        res.json(data);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
