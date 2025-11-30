import { Router } from 'express';
import { loginUser, logout, registerUser } from '../controllers/authController.js';
import { middleware } from '../middleware/authMiddleware.js';

const authRouter = Router();

authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);
authRouter.post('/logout', logout);
// Get logged-in user based on the JWT cookie
authRouter.get('/me', middleware , async (req, res) => {
    res.status(200).json({ user: req.user });
})

export default authRouter;