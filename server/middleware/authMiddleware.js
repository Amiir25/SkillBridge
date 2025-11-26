import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const middleware = async (req, res, next) => {
    let token;

    // Check for authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Extract token
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Attach user object
            req.user = await User.findById(decoded.id).select('-password');

            return next();

        } catch (error) {
            console.error('Authentication Error:', error.message);
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    // Not token provided
    return res.status(401).json({ message: 'Not authorized, no token provided' });
}