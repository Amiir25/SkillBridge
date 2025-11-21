import { Router } from "express";
import { applyToProject, createProject, getAllProjects, getCompanyDashboardStats, getCompanyProjects, getStudentDashboard } from "../controllers/projectController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";


const projectRouter = Router();

// Public
projectRouter.get("/all", getAllProjects);

// Company only
projectRouter.post("/new", createProject);
projectRouter.get("/company", getCompanyProjects);

// Student applies
projectRouter.post("/apply/:id", applyToProject);

// Company dashboard
projectRouter.post("/company/dashboard", getCompanyDashboardStats);

// Student dashboard
projectRouter.post("/student/dashboard", getStudentDashboard);


export default projectRouter;