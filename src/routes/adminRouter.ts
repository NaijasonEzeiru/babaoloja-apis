import { Router } from 'express';
import { addNewCategory } from '../controllers/adminController.js';
// import { verifyAdmin, verifyTokenAndAuth } from '../middlewares/verifyJWT.js';

const router = Router();

router.post('/add-new-category', addNewCategory);

export default router;
