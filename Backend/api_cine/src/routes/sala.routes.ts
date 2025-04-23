import { Router } from 'express';
import * as SalaController from '../controllers/sala.controller';

const router = Router();

router.get('', SalaController.getAllSalas);
router.get('/estado', SalaController.obtenerEstadoSala);
router.post('', SalaController.createSala);
router.put('/:id', SalaController.updateSala);
router.delete('/:id', SalaController.deleteSala);



export default router;
