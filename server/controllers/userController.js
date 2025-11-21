import mongoose from "mongoose";
import validator from 'validator';
import User from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register
export const register = async (req, res) => {

    try {
        const {name, email, password, role} = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: 'Fill all required fields' });
        }

        // Validate Email
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: 'Enter a valid email address' });
        }

        // Check if the user exists
        const isUserExist = await User.findOne({ email }).lean();
        if (isUserExist) {
            return res.status(409).json({ success: false, message: 'User already exist' });
        }

        // Register a new user
        const newId = new mongoose.Types.ObjectId();
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            _id: newId,
            name,
            email,
            password: hashedPassword,
            role,
        });
        await user.save();

        // Check for JWT_SECRET
        if (!process.env.JWT_SECRET) throw new Error('Missing JWT_SECRET environment variable');
        const token = jwt.sign(
            { id: newId.toString() },
            process.env.JWT_SECRET,
            { expiresIn: process.env.TOKEN_EXPIRES_IN },
        )

        return res.status(201).json({
            success: true,
            message: 'Account created successfully',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        })

    } catch (error) {
        console.error(`Registration Error: ${ error.message }`);
        return res.status(500).json({ success: false, message: 'Server error while registration' });
    }
}

// Login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'All fields are required!' });
        }

        // Check user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: 'User not found' });
        }

        // Check password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ success: false, message: 'Incorrect password' });
        }

        // Log the user in
        const token = jwt.sign(
            { id: user._id.toString() },
            process.env.JWT_SECRET,
            { expiresIn: process.env.TOKEN_EXPIRES_IN },
        )

        return res.status(200).json({
            success: true,
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
         console.error(`Login Error: ${ error.message }`);
        return res.status(500).json({ success: false, message: 'Server error while login' });
    }
}