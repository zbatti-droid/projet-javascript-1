import { Router } from "express";
import { createOrder, getOrder, listOrders, myOrders } from "../controllers/order.controller.js";
import { optionalAuth, requireAdmin, requireAuth } from "../middleware/auth.js";
import { validateBody } from "../middleware/validate.js";
import { createOrderSchema } from "../schemas/order.js";
import { asyncHandler } from "../utils/async-handler.js";

const router = Router();
router.post("/", optionalAuth, validateBody(createOrderSchema), asyncHandler(createOrder));
router.get("/my", requireAuth, asyncHandler(myOrders));
router.get("/", requireAuth, requireAdmin, asyncHandler(listOrders));
router.get("/:id", requireAuth, asyncHandler(getOrder));
export default router;
