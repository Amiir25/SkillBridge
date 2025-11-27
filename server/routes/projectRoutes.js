import { Router } from 'express';
import { middleware } from '../middleware/authMiddleware.js';
import { createProject, getAllProjects, projectDetail, updateProject } from '../controllers/projectController.js';

const projectRouter = Router();

// Public routes
projectRouter.get('/', getAllProjects);
projectRouter.get('/project-detail/:id', projectDetail);

// Protected routes
projectRouter.post('/create-project', middleware, createProject);
projectRouter.put('/update-project/:id', middleware, updateProject);

export default projectRouter;