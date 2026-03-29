import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import userRoutes from './routes/user';
import scoresRoutes from './routes/scores';
import drawRoutes from './routes/draw';
import charityRoutes from './routes/charity';
import winnerRoutes from './routes/winner';
import adminRoutes from './routes/admin';
import webhookRoutes from './routes/webhooks';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

// Webhooks must be mounted before body-parser!
app.use('/api/webhooks', webhookRoutes);

app.use(express.json());

app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Golf Charity API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/scores', scoresRoutes);
app.use('/api/draw', drawRoutes);
app.use('/api/charity', charityRoutes);
app.use('/api/winner', winnerRoutes);
app.use('/api/admin', adminRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
