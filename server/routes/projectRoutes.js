import { Router } from 'express';
import { middleware } from '../middleware/authMiddleware.js';
import { createProject } from '../controllers/projectController.js';

const projectRouter = Router();

projectRouter.post('/create-project', middleware, createProject);

export default projectRouter;