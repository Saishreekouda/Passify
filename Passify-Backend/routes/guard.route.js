// guard.route.js
import express from "express";
import { verifyGuardToken } from "../middlewares/authMiddleware_Guard.js";
import { getGuard } from "../controllers/guard.controller.js";
import { getInvalidOutpassesForGuard, invalidateOutpass } from "../controllers/outpass.controller.js";

const router = express.Router();

router.get("/profile", verifyGuardToken, getGuard);
router.get("/outpass", verifyGuardToken, getInvalidOutpassesForGuard);
router.patch("/outpass/:id", verifyGuardToken, invalidateOutpass);

export default router;
