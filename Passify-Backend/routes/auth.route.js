import express from "express";
const router = express.Router();
import { loginAsStudent } from "../controllers/auth.controller.js";

router.post("/student/login", loginAsStudent);

export default router;
