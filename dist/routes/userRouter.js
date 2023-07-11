var _a = require('../../controllers/verifyToken'), verifyToken = _a.verifyToken, verifyTokenAndAuth = _a.verifyTokenAndAuth;
import { getUser, updateUser } from '../controllers/usersController.js';
// const { updateUser, getUser } = require('../../controllers/usersController');
import { Router } from 'express';
var router = Router();
router
    .route('/:id')
    .get(verifyTokenAndAuth, getUser)
    .put(verifyTokenAndAuth, updateUser);
export default router;
//# sourceMappingURL=userRouter.js.map