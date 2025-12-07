import { Router } from "express";
import { middleware } from "../middleware/authMiddleware.js";
import { checkStudentProfile, createStudentProfile } from "../controllers/profileControllers/studentProfileController.js";
import { checkCompanyProfile, createCompanyProfile, deleteCompanyProfile, updateCompanyProfile } from "../controllers/profileControllers/companyProfileController.js";


const profileRouter = Router();

// Student
profileRouter.get('/student/me', middleware, checkStudentProfile);
profileRouter.post('/student/profile-setup', middleware, createStudentProfile);

// Company
profileRouter.get('/company/me', middleware, checkCompanyProfile);
profileRouter.post('/company/profile-setup', middleware, createCompanyProfile);
profileRouter.post('/company/profile-update', middleware, updateCompanyProfile);
profileRouter.get('/company/profile-delete', middleware, deleteCompanyProfile);

export default profileRouter;