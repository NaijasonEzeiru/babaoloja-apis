import { Router } from 'express';
import { addNewCategory } from '../controllers/adminController.js';
var router = Router();
router.post('/add-new-category', addNewCategory);
export default router;
//# sourceMappingURL=adminRouter.js.map