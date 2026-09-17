import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  listProducts,
  updateProduct,
} from "../controllers/product.controller.js";
import { requireAdmin, requireAuth } from "../middleware/auth.js";
import { validateBody } from "../middleware/validate.js";
import { productSchema, updateProductSchema } from "../schemas/product.js";
import { asyncHandler } from "../utils/async-handler.js";

const router = Router();
router.get("/", asyncHandler(listProducts));
router.get("/:id", asyncHandler(getProduct));
router.post("/", requireAuth, requireAdmin, validateBody(productSchema), asyncHandler(createProduct));
router.put("/:id", requireAuth, requireAdmin, validateBody(updateProductSchema), asyncHandler(updateProduct));
router.delete("/:id", requireAuth, requireAdmin, asyncHandler(deleteProduct));
export default router;
