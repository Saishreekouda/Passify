import express from 'express';
import {
  loginAsStudent,
  loginAsAdmin,
  signUpAsAdmin,
} from '../controllers/auth.controller.js';
import { verifyToken } from '../middlewares/authMiddleware_Admin.js';

const router = express.Router();

router.post('/student/login', loginAsStudent);
router.post('/admin/signup',verifyToken, signUpAsAdmin);
router.post('/admin/login',verifyToken, loginAsAdmin);

// router.get('/admin/profile', verifyToken, (req, res) => {
//   res.status(200).json({ message: 'Admin Profile' });
// });




export default router;
