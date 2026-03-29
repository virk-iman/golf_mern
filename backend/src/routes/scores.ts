import { Router } from 'express';
import { requireAuth, AuthRequest } from '../middleware/auth';
import { supabase } from '../db';

const router = Router();

// Get user scores
router.get('/', requireAuth, async (req: AuthRequest, res) => {
    try {
        const { data, error } = await supabase
            .from('scores')
            .select('*')
            .eq('user_id', req.user.id)
            .order('date', { ascending: false });

        if (error) throw error;
        res.json(data);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// Add a new score
router.post('/add', requireAuth, async (req: AuthRequest, res) => {
    try {
        const { score, date } = req.body;
        if (!score || score < 1 || score > 45) {
            return res.status(400).json({ error: 'Score must be between 1 and 45' });
        }

        // Insert new score
        const { data: insertedScore, error: insertError } = await supabase
            .from('scores')
            .insert({ user_id: req.user.id, score, date })
            .select()
            .single();

        if (insertError) throw insertError;

        // Check if user has more than 5 scores
        const { data: userScores, error: countError } = await supabase
            .from('scores')
            .select('id')
            .eq('user_id', req.user.id)
            .order('date', { ascending: false });

        if (countError) throw countError;

        // Delete oldest scores if there are more than 5
        if (userScores && userScores.length > 5) {
            const idsToDelete = userScores.slice(5).map(s => s.id);
            await supabase.from('scores').delete().in('id', idsToDelete);
        }

        res.json({ message: 'Score added successfully', score: insertedScore });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
