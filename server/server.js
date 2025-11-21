import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectDB } from './config/db.js';
import userRouter from './routes/userRoutes.js';
import projectRouter from './routes/projectRoutes.js';

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// DB
connectDB();

// Routes
app.use('/api/auth', userRouter);
app.use('/api/projects', projectRouter);

app.get('/', (req, res) => {
    res.send('API working');
})

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
})