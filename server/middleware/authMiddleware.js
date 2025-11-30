import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const middleware = async (req, res, next) => {
    let token;

    // Check for token in cookies
    if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }
    // Fallback: Check for token in Authorization header
    else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        return next();
    } catch (error) {
        console.error('Authentication Error:', error.message);
        return res.status(401).json({ message: 'Not authorized, token failed' });
    }
}