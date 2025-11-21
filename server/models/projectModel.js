import mongoose from 'mongoose';

const projectSchema = mongoose.Schema({
    company: {
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
    skillsRequired: {
        type: [String],
        default: [],
    },
    reward: {
        type: String,
        default: "Experience / Certificate",
    },
    status: {
        type: String,
        enum: ['open', 'in progress', 'completed'],
        default: 'open',
    },
    applicants: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    ],

}, { timestamps: true });

const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);
export default Project;