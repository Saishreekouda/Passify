// student.route.js
import express from "express";
import { getStudent } from "../controllers/student.controller.js";
import { verifyStudentToken } from "../middlewares/authMiddleware_Student.js";

const router = express.Router();

router.get("/profile", verifyStudentToken, getStudent);

export default router;
