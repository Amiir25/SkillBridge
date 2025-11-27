import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRouter from './routes/authRoutes.js';
import projectRouter from './routes/projectRoutes.js';


dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/projects', projectRouter);

app.get('/', (req, res) => {
    res.send('Welcome to SkillBridge');
})

app.listen(4000, () => {
    console.log('Server started on http://localhost:4000');
})