import express from "express";
import { getOutpass } from "../controllers/outpass.controller.js";

const router = express.Router();

router.get("/outpass/:id", getOutpass);
router.get("/test", (req, res) => {
  res.status(200).json({ data: "Hello World" });
});

export default router;
