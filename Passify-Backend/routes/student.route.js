// student.route.js
import express from 'express';
import { getStudent } from '../controllers/student.controller.js';
import { verifyToken } from '../middlewares/authMiddleware_Student.js';

const router = express.Router();

router.get('/profile', verifyToken, getStudent);

export default router;
