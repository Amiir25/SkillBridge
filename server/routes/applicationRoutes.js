import { Router } from "express";
import { middleware } from "../middleware/authMiddleware.js";
import { applyToProject, companyDashboard, studentDashboard } from "../controllers/applicationController.js";

const applicationRouter = Router();

applicationRouter.post('/apply/:projectId', middleware, applyToProject);
applicationRouter.get('/company/dashboard', middleware, companyDashboard);
applicationRouter.get('/student/dashboard', middleware, studentDashboard);

export default applicationRouter;