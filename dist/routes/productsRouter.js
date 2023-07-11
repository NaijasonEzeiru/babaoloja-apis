import { Router } from 'express';
import multer from 'multer';
import storage from '../utils/multer.js';
import { getAllProducts, addNewProduct, getProduct } from '../controllers/productsController.js';
var router = Router();
var upload = multer({ storage: storage });
router.post('/add-new-product', upload.array('images[]'), addNewProduct);
router.route('/:id').get(getProduct);
router.route('/').get(getAllProducts);
export default router;
//# sourceMappingURL=productsRouter.js.map