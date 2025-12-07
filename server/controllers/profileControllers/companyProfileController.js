import Application from "../../models/applicationModel.js";
import CompanyProfile from "../../models/companyProfileModel.js";
import Project from "../../models/projectModel.js";
import User from "../../models/userModel.js";

// Check if company profile exists
export const checkCompanyProfile = async (req, res) => {
    try {
        // Get company Id
        const companyId = req.user._id;

        // Check company profile
        const profile = await CompanyProfile.findOne({ companyId });
        if (!profile) {
            return res.status(200).json({ exists: false });
        }

        return res.status(200).json({ exists: true });

    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
}

// Create company profile
export const createCompanyProfile = async (req, res) => {
    try {

        const { companyName, description, location, industry, companySize, website } = req.body;

        // Verify requried fields
        if (!companyName || !description || !location) {
            return res.status(400).json({ message: 'Fill all the required fileds' });
        }

        // Get company Id
        const companyId = req.user._id;

        // Create profile
        const companyProfile = await CompanyProfile.create({
            companyId, companyName, description, location,
            industry, companySize, website
        })

        return res.status(201).json({ message: 'Profile saved successfully', companyProfile });
    } catch (error) {
        // Handle duplicate Mongo error
        if (error.code === 11000) {
            return res.status(409).json({ message: 'Profile already exists' });
        }

        console.error('Error saving company profile:', error.message);
        return res.status(500).json({ message: 'Server error' });
    }
}

// Update company profile
export const updateCompanyProfile = async (req, res) => {
    try {
        // Get company Id
        const companyId = req.user._id;

        const { companyName, description, location, companySize, industry, website } = req.body;

        // Validate fields
        if (!companyName || !description || !location || !industry) {
            return res.status(400).json({ message: 'Fill all the required fields' });
        }

        const updatedProfile = await CompanyProfile.findOneAndUpdate(
            { companyId: companyId },
            { ...req.body },
            { new: true, runValidators: true },
        )

        return res.status(200).json({
            message: 'Profile updated successfully',
            updatedProfile
        })

    } catch (error) {
        console.error('Error while updating company profile:', error.message);
        return res.status(500).json({ message: 'Server error' });
    }
}

// Delete company profile / account
export const deleteCompanyProfile = async (req, res) => {
    try {
        const companyId = req.user._id;

        // Delete company data
        await User.findOneAndDelete({ _id: companyId });

        // Delete company profile
        await CompanyProfile.findOneAndDelete({ companyId: companyId });

        // Delete company projects
        await Project.findOneAndDelete({ companyId: companyId });

        // Delete projects from application model
        await Application.findOneAndDelete({ companyId: companyId });

        return res.status(200).json({ message: 'Account deleted' });

    } catch (error) {
        console.error('Error deleting user account:', error);
        return res.status(500).json({ message: 'Server error' });
    }
}