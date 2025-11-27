import Application from "../models/applicationModel.js";
import Project from "../models/projectModel.js";

// appy to project
export const applyToProject = async (req, res) => {
    try {
        const { projectId } = req.params;

        // Ensure only students can appy
        if (req.user.role !== 'Student') {
            return res.status(403).json({ message: 'Only students can apply to projects' });
        }

        // Check if project exists
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Prevent applying to closed projects
        if (project.status === 'Closed') {
            return res.status(400).json({ message: 'This project is closed and no longer accepting applications' });
        }

        // Prevent company from applying to their projects
        if (project.companyId.toString() === req.user._id.toString()) {
            return res.status(403).json({ message: 'You can not apply to your own projects' });
        }

        // Check duplicate application
        const alreadyApplied = await Application.findOne({
            studentId: req.user._id,
            projectId: projectId,
        });

        if (alreadyApplied) {
            return res.status(400).json({ message: 'You already applied for this job' });
        }

        // Create application
        const application = await Application.create({
            studentId: req.user._id,
            projectId,
        });

        return res.status(201).json({ message: 'Application submitted successfully', application });

    } catch (error) {
        console.error('Error while submiting application:', error.message);
        return res.status(500).json({ message: 'Server error' });
    }
}