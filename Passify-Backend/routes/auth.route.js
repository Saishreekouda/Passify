import express from "express";
const router = express.Router();
import {
  loginAsStudent,
  loginAsAdmin,
  signUpAsAdmin,
} from "../controllers/auth.controller.js";

router.post("/student/login", loginAsStudent);
router.post("/admin/signup", signUpAsAdmin);
router.post("/admin/login", loginAsAdmin);

export default router;
