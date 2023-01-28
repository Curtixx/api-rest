import { Router } from 'express';
import archivecontroller from '../controllers/ArchiveController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.post('/', loginRequired, archivecontroller.store);

export default router;
