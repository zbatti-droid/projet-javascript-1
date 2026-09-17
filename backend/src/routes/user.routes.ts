import { Router } from "express";
import { updateMe } from "../controllers/user.controller.js";
import { requireAuth } from "../middleware/auth.js";
import { validateBody } from "../middleware/validate.js";
import { updateProfileSchema } from "../schemas/auth.js";
import { asyncHandler } from "../utils/async-handler.js";

const router = Router();
router.put("/me", requireAuth, validateBody(updateProfileSchema), asyncHandler(updateMe));
export default router;
