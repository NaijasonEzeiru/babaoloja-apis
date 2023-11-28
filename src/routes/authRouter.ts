import express from 'express';
// import cookieParser from 'cookie-parser';
const app = express();

import { loginUser, me, registerUser } from '../controllers/authController.js';

const router = express.Router();

// app.use(cookieParser());

router.post('/register', registerUser);

router.post('/login', loginUser);

router.post('/me', me);

export default router;
