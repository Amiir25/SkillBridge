import mongoose from "mongoose";
import Project from "../models/projectModel.js";

export const createProject = async (req, res) => {
    try {
        const { title, description, skillsRequired, reward, status} = req.body;

        // Validate
        if (!title || !description) {
            return res.status(400).json({ success: false, message: 'Fill all required fields' });
        }

        // Add a new project
        const projectId = new mongoose.Types.ObjectId;
        const newProject = Project({
            company: req.user._id,
            title,
            description,
            skillsRequired,
            reward,
            status,
            // applicants,
        })
        await newProject.save();

        return res.status(201).json({
            success: true,
            message: 'Projet created successfully',
            project: newProject,
        })

    } catch (error) {
        console.error(`Error while creating new project ${ error }`);
        return res.status(500).json({ success: false, message: 'Server error while creating new project' });
    }
}