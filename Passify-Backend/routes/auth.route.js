import express from "express";
import {
  loginAsStudent,
  loginAsAdmin,
  signUpAsAdmin,
} from "../controllers/auth.controller.js";
import { verifyAdminToken } from "../middlewares/authMiddleware_Admin.js";

const router = express.Router();

router.post("/student/login", loginAsStudent);
router.post("/admin/signup", signUpAsAdmin);
router.post("/admin/login", loginAsAdmin);

export default router;
