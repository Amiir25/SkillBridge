import StudentProfile from "../models/studentProfileModel.js";

export const studentProfile = async (req, res) => {
    try {
        
        const {
            firstName, lastName, address, university, major, year,
            skills, bio, portfolioLink, resumeLink
        } = req.body;

        // Verify required fields
        if (!firstName || !lastName || !address || !university || !major || !year) {
            return res.status(400).json({ message: 'Please fill all the required fields' });
        }

        // Get student id
        const studentId = req.user._id;

        // Check if the student already set their profile up
        const profileExists = await StudentProfile.findOne({ studentId });
        if (profileExists) {
            return res.status(409).json({ message: 'Your profile is already created' });
        }

        // Save profile
        const studentProfile = await StudentProfile.create({
            studentId, firstName, lastName, address, university, major, year,
            skills, bio, portfolioLink, resumeLink
        })

        return res.status(201).json({ message: 'Profile Saved successfully', studentProfile });

    } catch (error) {
        
        // Handle duplicate Mongo error
        if (error.code === 11000) {
            return res.status(409).json({ message: 'Profile already exists' });
        }

        console.error('Error saving student profile:', error.message);
        return res.status(500).json({ message: 'Server error' });
    }
}