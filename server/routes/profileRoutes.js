import { Router } from "express";
import { middleware } from "../middleware/authMiddleware.js";
import { checkStudentProfile, studentProfile } from "../controllers/studentProfileController.js";

const profileRouter = Router();

profileRouter.get('/student/me', middleware, checkStudentProfile);
profileRouter.post('/student/profile-setup', middleware, studentProfile);

export default profileRouter;