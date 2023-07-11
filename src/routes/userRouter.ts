const {
	verifyToken,
	verifyTokenAndAuth
} = require('../../controllers/verifyToken');
import { getUser, updateUser } from '../controllers/usersController.js';
// const { updateUser, getUser } = require('../../controllers/usersController');
import { Router } from 'express';

const router = Router();

router
	.route('/:id')
	.get(verifyTokenAndAuth, getUser)
	.put(verifyTokenAndAuth, updateUser);

export default router;
