import { Router } from 'express';
import { supabase } from '../db';

const router = Router();

// List all charities
router.get('/list', async (req, res) => {
    try {
        const { data: charities, error } = await supabase
            .from('charities')
            .select('*')
            .order('name');

        if (error) throw error;
        res.json(charities);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// Get single charity details
router.get('/:id', async (req, res) => {
    try {
        const { data: charity, error } = await supabase
            .from('charities')
            .select('*')
            .eq('id', req.params.id)
            .single();

        if (error) throw error;
        if (!charity) return res.status(404).json({ error: 'Charity not found' });

        res.json(charity);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
