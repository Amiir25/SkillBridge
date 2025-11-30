import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register
export const registerUser = async (req, res) => {
    try {
        const { username, email, password, confirmPassword, role } = req.body;

        // Validate required fields
        if (!username || !email || !password || !confirmPassword) {
            return res.status(400).json({ message: 'Please fill all the neccessary fields' });
        }

        // Check confirm password
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Password not match' });
        }

        // Check if user exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Check if the username is taken
        const isUsernameTaken = await User.findOne({ username });
        if (isUsernameTaken) {
            return res.status(400).json({ message: 'This username is taken' });
        }

        // Hash passowrd
        const hashedPassword = await bcrypt.hash(password, 10);

        // create new user
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            role: role || 'Student',
        })

        return res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
            }
        })


    } catch (error) {
        console.error('Registeration Error:', error.message);
        return res.status(500).json({ message: 'Server error while registration' });
    }
}

// Login
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verify fields
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Email not found' });
        }

        // Match password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: 'Incorrect password' });
        }

        // jwt payload
        const payload = {
            id: user._id,
            email: user.email,
            role: user.role,
        }

        // Create jwt
        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: process.env.TOKEN_EXPIRES_IN },
        )

        return res.status(201).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            }
        })
        
    } catch (error) {
        console.error('Login Error:', error.message);
        return res.status(500).json({ message: 'Server Error' });
    }
}

// Logout
export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: false,
            sameSite: 'lax'
        })
        .status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error('Logout error:', error.message);
        return res.status(500).json({ message: 'Server error' });
    }
}