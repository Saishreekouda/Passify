import express from "express";
const router = express.Router();

import { getStudent } from "../controllers/student.controller.js";

router.get("/profile", getStudent);

export default router;
