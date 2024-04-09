import express from "express";
import {
  loginAsStudent,
  loginAsAdmin,
  signUpAsAdmin,
  loginAsGuard,
  signUpAsGuard,
} from "../controllers/auth.controller.js";
import { verifyAdminToken } from "../middlewares/authMiddleware_Admin.js";
import { verifyGuardToken } from "../middlewares/authMiddleware_Guard.js";

const router = express.Router();

router.post("/student/login", loginAsStudent);
router.post("/admin/signup", signUpAsAdmin);
router.post("/admin/login", loginAsAdmin);
router.post("/guard/signup", signUpAsGuard);
router.post("/guard/login", loginAsGuard);

export default router;
