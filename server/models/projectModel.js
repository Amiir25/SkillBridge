import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    requiredSkills: {
        type: [String],
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: String,
        enum: ['Open', 'Closed'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);
export default Project;