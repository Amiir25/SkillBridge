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

// Company dashboard
export const companyDashboard = async (req, res) => {
    try {
        // Ensure only companies can access this dashboard
        if (req.user.role !== 'Company') {
            return res.status(403).json({ message: 'Only companies can access this dashbaord' });
        }

        const companyId = req.user._id;

        // Find all projects created by the company
        const projects = await Project.find({companyId}).sort({ createdAt: -1 });

        // If company has no projects
        if (projects.length === 0) {
            return res.status(200).json({ message: 'No projects yet', projects: [] });
        }

        // Fetch applications for all projects
        const dashboardData = await Promise.all(
            projects.map(async (project) => {
                const applications = await Application.find({ projectId: project._id })
                    .populate('studentId', 'name email university major year')
                    .sort({ createdAt: -1 });

                return {
                    project,
                    applicants: applications
                }
            })
        )

        return res.status(200).json({ message: 'Dashbaord data loaded', data: dashboardData });

    } catch(error) {
        console.error('Error loading company dashboard:', error.message);
        return res.status(500).json({ message: 'Server error' });
    }
}

// Student dashboard
export const studentDashboard = async (req, res) => {
    try {
        // Ensure only students can access this dashbaord
        if (req.user.role !== 'Student') {
            return res.status(403).json({ message: 'Only students can access this dashboard' });
        }

        const studentId = req.user._id;

        // Find all projects applied by the student
        const appliedProjects = await Application.find({ studentId })
            .populate({
                path: "projectId",
                select: "title companyId description price duration skills status createdAt",
                populate: {
                    path: "companyId",
                    select: "name email"
                }
            })
            .sort({ createdAt: -1 });

        // If student has no projects
        if (appliedProjects === 0) {
            return res.status(200).json({ message: 'No projects yet', appliedProjects: [] });
        }

        return res.status(200).json({ message: 'Dashboard data loaded', data: appliedProjects });

    } catch (error) {
        console.error('Error loading student dashbaord:', error.message);
        return res.status(500).json({ message: 'Server error' });
    }
}