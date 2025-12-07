import mongoose from "mongoose";

const studentProfileSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    firstName: { type: String, required: true,trim: true, },
    lastName: { type: String, required: true,trim: true, },
    address: { type: String, required: true,trim: true, },
    university: { type: String, required: true,trim: true, },
    major: { type: String, required: true,trim: true, },
    year: { 
        type: String,
        enum: ['1st year', '2nd year', '3rd year', '4th year', '5th year'],
        default: 'Not mentioned',
    },
    appliedProjects:{ type: Number, required: true, default: 0 },

    // Optional fields
    skills: { type: [String], },
    bio: { type: String, },
    portfolioLink: { type: String,},
    resumeLink: { type: String, },

}, { timestamps: true });

const StudentProfile = mongoose.model('StudentProfile', studentProfileSchema);
export default StudentProfile;