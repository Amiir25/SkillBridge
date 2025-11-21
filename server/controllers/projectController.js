import mongoose from "mongoose";
import Project from "../models/projectModel.js";

// Create new project
export const createProject = async (req, res) => {
    try {
        const { company, title, description, skillsRequired, reward, status } = req.body;

        if (!company || !title || !description) {
            return res.status(400).json({ success: false, message: "company, title, description required" });
        }

        const newProject = new Project({
            company,
            title,
            description,
            skillsRequired,
            reward,
            status,
        });

        await newProject.save();

        return res.status(201).json({
            success: true,
            message: "Project created successfully",
            project: newProject,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Server error while creating project" });
    }
};


// Get all projects
export const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find()
            .populate("company", "name email");

        return res.status(200).json({
            success: true,
            projects,
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

// Get company projects - Company dashboard
export const getCompanyProjects = async (req, res) => {
    try {
        const { companyId } = req.body;

        if (!companyId) {
            return res.status(400).json({ success: false, message: "companyId is required" });
        }

        const projects = await Project.find({ company: companyId });

        return res.status(200).json({
            success: true,
            projects,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};


// Apply to project
export const applyToProject = async (req, res) => {
    try {
        const projectId = req.params.id;
        const { studentId } = req.body;

        if (!studentId) {
            return res.status(400).json({ success: false, message: "studentId is required" });
        }

        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({ success: false, message: "Project not found" });
        }

        // Check duplicate
        if (project.applicants.includes(studentId)) {
            return res.status(400).json({ success: false, message: "Already applied" });
        }

        project.applicants.push(studentId);
        await project.save();

        return res.status(200).json({
            success: true,
            message: "Application submitted",
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};


// Company dashboard
export const getCompanyDashboardStats = async (req, res) => {
    try {
        const { companyId } = req.body;

        if (!companyId) {
            return res.status(400).json({ success: false, message: "companyId is required" });
        }

        const projects = await Project.find({ company: companyId });

        const activePosts = projects.length;

        let totalApplications = 0;
        projects.forEach(p => totalApplications += p.applicants.length);

        // You do not have profile views stored yet → return 0
        const profileViews = 0;

        return res.status(200).json({
            success: true,
            data: {
                activePosts,
                totalApplications,
                profileViews
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

// Student dashboard
export const getStudentDashboard = async (req, res) => {
    try {
        const { studentId } = req.body;

        if (!studentId) {
            return res.status(400).json({ success: false, message: "studentId is required" });
        }

        const projects = await Project.find({
            applicants: studentId
        });

        return res.status(200).json({
            success: true,
            appliedCount: projects.length,
            appliedProjects: projects
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

