import { Router } from 'express';
import { middleware } from '../middleware/authMiddleware.js';
import {
    closeProject, createProject, deleteProject, getAllProjects, manageProjects,
    projectDetail, updateProject
} from '../controllers/projectController.js';

const projectRouter = Router();

// Public routes
projectRouter.get('/', getAllProjects);
projectRouter.get('/project-detail/:id', projectDetail);

// Protected routes
projectRouter.post('/create-project', middleware, createProject);
projectRouter.put('/close-project/:id', middleware, closeProject);
projectRouter.put('/update-project/:id', middleware, updateProject);
projectRouter.delete('/delete-project/:id', middleware, deleteProject);
projectRouter.get('/manage-projects', middleware, manageProjects);

export default projectRouter;