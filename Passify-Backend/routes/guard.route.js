// guard.route.js
import express from "express";
import { verifyGuardToken } from "../middlewares/authMiddleware_Guard.js";
import { getGuard } from "../controllers/guard.controller.js";
import { getInvalidOutpassesForGuard } from "../controllers/outpass.controller.js";

const router = express.Router();

router.get("/profile", verifyGuardToken, getGuard);
router.get("/outpass", verifyGuardToken, getInvalidOutpassesForGuard);

export default router;
