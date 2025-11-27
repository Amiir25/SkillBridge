import { Router } from "express";
import { middleware } from "../middleware/authMiddleware.js";
import { applyToProject } from "../controllers/applicationController.js";

const applicationRouter = Router();

applicationRouter.post('/apply/:projectId', middleware, applyToProject);

export default applicationRouter;