import mongoose from "mongoose";

const companyProfileSchema = new mongoose.Schema({
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    companyName: { type: String, required: true, trim: true, },
    description: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },

    // Optional fileds
    industry: { type: String, trim: true },
    companySize: {
        type: String,
        enum: ['Small', 'Medium', 'Large'],
        default: '',
    },
    website: { type: String, trim: true }
})

const CompanyProfile = mongoose.model('CompanyProfile', companyProfileSchema);
export default CompanyProfile;