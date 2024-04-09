// admin.route.js
import express from "express";
import { verifyAdminToken } from "../middlewares/authMiddleware_Admin.js";
import { getAdmin } from "../controllers/admin.controller.js";
import {
  getAllOutpassesForAdmin,
  updateStatus,
} from "../controllers/outpass.controller.js";

const router = express.Router();

router.get("/profile", verifyAdminToken, getAdmin);
router.get("/outpass", verifyAdminToken, getAllOutpassesForAdmin);
router.patch("/outpass/:id", verifyAdminToken, updateStatus);

export default router;
