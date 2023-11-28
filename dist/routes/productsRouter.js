import { Router } from 'express';
import multer from 'multer';
import storage from '../utils/multer.js';
import { getAllProducts, addNewProduct, deleteProduct, getProduct } from '../controllers/productsController.js';
// import { verifyAdmin, verifyTokenAndAuth } from '../middlewares/verifyJWT.js';
const router = Router();
const upload = multer({ storage: storage });
router.post('/add-new-product', upload.array('images[]'), addNewProduct);
router.get('/', getAllProducts);
router.post('/del', deleteProduct);
router.get('/:id', getProduct);
export default router;
//# sourceMappingURL=productsRouter.js.map