// student.route.js
import express from "express";
import { getStudent } from "../controllers/student.controller.js";
import { verifyStudentToken } from "../middlewares/authMiddleware_Student.js";
import {
  createOutpass,
  getAllOutpassesForStudent,
} from "../controllers/outpass.controller.js";

const router = express.Router();

router.get("/profile", verifyStudentToken, getStudent);
router.post("/outpass", verifyStudentToken, createOutpass);
router.get("/outpass", verifyStudentToken, getAllOutpassesForStudent);

export default router;
