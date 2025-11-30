import { Router } from 'express';
import { loginUser, registerUser } from '../controllers/authController.js';
import { middleware } from '../middleware/authMiddleware.js';

const authRouter = Router();

authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);
// Get logged-in user based on the JWT cookie
authRouter.get('/me', middleware , async (req, res) => {
    res.status(200).json({ user: req.user });
})

export default authRouter;