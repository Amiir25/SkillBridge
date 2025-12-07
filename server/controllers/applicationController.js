import Application from "../models/applicationModel.js";
import CompanyProfile from "../models/companyProfileModel.js";
import Project from "../models/projectModel.js";
import StudentProfile from "../models/studentProfileModel.js";
import User from "../models/userModel.js";

// appy to project
export const applyToProject = async (req, res) => {
    try {
        const { projectId } = req.params;
        const { studentId } = req.user._id;

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
        if (project.companyId.toString() === studentId.toString()) {
            return res.status(403).json({ message: 'You can not apply to your own projects' });
        }

        // Check duplicate application
        const alreadyApplied = await Application.findOne({
            studentId: studentId,
            projectId: projectId,
        });
        if (alreadyApplied) {
            return res.status(400).json({ message: 'You already applied for this job' });
        }

        // Create application
        const application = await Application.create({
            studentId: studentId,
            projectId,
        });

        // Add number of applicants by 1 for project
        await Project.findByIdAndUpdate(projectId, { $inc: { applicants: 1 } }, { new: true });

        // Add number of applied proejcts by 1 for student
        await StudentProfile.findByIdAndUpdate(studentId, { $inc: { appliedProjects: 1 } }, { new: true });

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

        // Get comany data from users collection
        const companyData = await User.findById(companyId).select('-password');

        // Get company profile from companyProfile collection
        const companyProfile = await CompanyProfile.findOne({ companyId });

        // Find all projects created by the company
        const projects = await Project.find({companyId}).sort({ createdAt: -1 });

        return res.status(200).json({
            message: 'Dashbaord data loaded',
            userData: companyData,
            userProfile: companyProfile,
            projects: projects
        });

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

        // Get student data from User collection
        const studentData = await User.findById(studentId).select('-password');

        // Get student profile from studentProfile collection
        const studentProfile = await StudentProfile.findOne({ studentId });

        // Get all projects the student applied for
        const projects = await Application.findOne({ studentId });

        return res.status(200).json({
            message: 'Dashboard data loaded',
            userData: studentData,
            userProfile: studentProfile,
            projects: projects,
        });

    } catch (error) {
        console.error('Error loading student dashbaord:', error.message);
        return res.status(500).json({ message: 'Server error' });
    }
}