import { Router } from 'express';
import usercontroller from '../controllers/UserController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/', usercontroller.index);
router.get('/:id', usercontroller.show);
router.post('/', loginRequired, usercontroller.store);
router.put('/:id', loginRequired, usercontroller.update);
router.delete('/:id', loginRequired, usercontroller.delete);
export default router;
