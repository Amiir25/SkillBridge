import { Router } from "express";
import { middleware } from "../middleware/authMiddleware.js";
import { studentProfile } from "../controllers/studentProfileController.js";

const profileRouter = Router();

profileRouter.post('/student/profile-setup', middleware, studentProfile);

export default profileRouter;