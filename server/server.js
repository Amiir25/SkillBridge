import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import authRouter from './routes/authRoutes.js';
import projectRouter from './routes/projectRoutes.js';
import applicationRouter from './routes/applicationRoutes.js';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(cookieParser());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/projects', projectRouter);
app.use('/api/applications', applicationRouter);

app.get('/', (req, res) => {
    res.send('Welcome to SkillBridge');
})

app.listen(4000, () => {
    console.log('Server started on http://localhost:4000');
})