import express from "express";
import { getOutpass } from "../controllers/outpass.controller.js";

const router = express.Router();

router.get("/outpass/:id", getOutpass);

export default router;
