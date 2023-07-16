import { getUser, updateUser } from '../controllers/usersController.js';
// const { updateUser, getUser } = require('../../controllers/usersController');
import { Router } from 'express';

const router = Router();

router.route('/:id').get(getUser).put(updateUser);

export default router;
