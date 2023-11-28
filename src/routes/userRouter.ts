import multer from 'multer';
import {
  getUser,
  updateUser,
  updatePassword
} from '../controllers/usersController.js';

import { Router } from 'express';
import storage from '../utils/multer.js';

const upload = multer({ storage: storage, limits: { fileSize: 5000000 } });
const router = Router();

router
  .route('/:id')
  .get(getUser)
  .put(upload.single('image'), updateUser)
  .patch(updatePassword);

export default router;
