import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to SkillBridge');
})

app.listen(4000, () => {
    console.log('Server started on http://localhost:4000');
})