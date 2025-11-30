import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type:String,
        required: true,
        unique: true,
        lowecase: true,
        trim: true,
    },
    password: {
        type:String,
        required: true,
    },
    role: {
        type: String,
        enum: ['Student', 'Company'],
        default: 'Student',
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;