import { Router } from 'express';
import { middleware } from '../middleware/authMiddleware.js';
import { createProject, getAllProjects, projectDetail } from '../controllers/projectController.js';

const projectRouter = Router();

// Public routes
projectRouter.get('/', getAllProjects);
projectRouter.get('/project-detail/:id', projectDetail);

// Protected routes
projectRouter.post('/create-project', middleware, createProject);

export default projectRouter;