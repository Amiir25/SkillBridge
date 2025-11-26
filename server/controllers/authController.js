import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';

export const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Validate required fields
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please fill all the neccessary fields' });
        }

        // Check if user exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash passowrd
        const hashedPassword = await bcrypt.hash(password, 10);

        // create new user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || 'Student',
        })

        return res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            }
        })


    } catch (error) {
        console.error('Registeration Error:', error.message);
        return res.status(500).json({ message: 'Server error while registration' });
    }
}