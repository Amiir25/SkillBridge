import { Router } from "express";
import { middleware } from "../middleware/authMiddleware.js";
import { applyToProject, compnayDashboard } from "../controllers/applicationController.js";

const applicationRouter = Router();

applicationRouter.post('/apply/:projectId', middleware, applyToProject);
applicationRouter.get('/company/dashboard', middleware, compnayDashboard);

export default applicationRouter;