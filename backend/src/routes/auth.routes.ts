import { Router } from "express";
import rateLimit from "express-rate-limit";
import { login, logout, me, register } from "../controllers/auth.controller.js";
import { requireAuth } from "../middleware/auth.js";
import { validateBody } from "../middleware/validate.js";
import { loginSchema, registerSchema } from "../schemas/auth.js";
import { asyncHandler } from "../utils/async-handler.js";

const router = Router();
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { message: "محاولات كثيرة، حاول لاحقاً" },
});

router.post("/register", authLimiter, validateBody(registerSchema), asyncHandler(register));
router.post("/login", authLimiter, validateBody(loginSchema), asyncHandler(login));
router.get("/me", requireAuth, asyncHandler(me));
router.post("/logout", logout);

export default router;
