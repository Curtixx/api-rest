import { Router } from 'express';
import alunoscontroller from '../controllers/AlunoController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/', alunoscontroller.index);
router.post('/', loginRequired, alunoscontroller.store);
router.put('/:id', loginRequired, alunoscontroller.update);
router.get('/:id', alunoscontroller.show);
router.delete('/:id', loginRequired, alunoscontroller.delete);

export default router;
