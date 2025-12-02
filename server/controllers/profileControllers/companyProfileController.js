import CompanyProfile from "../../models/companyProfileModel";

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