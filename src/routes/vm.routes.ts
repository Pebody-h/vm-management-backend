import { Router } from 'express';
import { getVMs, createVM, updateVM, deleteVM } from '../controllers/vm.controller.js';
import { authenticateToken, requireRole } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(authenticateToken);

router.get('/', getVMs);
router.post('/', requireRole(['Administrador']), createVM);
router.put('/:id', requireRole(['Administrador']), updateVM);
router.delete('/:id', requireRole(['Administrador']), deleteVM);

export default router;