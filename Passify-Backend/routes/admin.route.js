// admin.route.js
import express from "express";
import { verifyAdminToken } from "../middlewares/authMiddleware_Admin.js";
import { getAdmin } from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/profile", verifyAdminToken, getAdmin);

export default router;
