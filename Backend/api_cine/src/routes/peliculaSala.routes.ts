import * as peliculaSalaController from '../controllers/peliculaSala.controller';
import { Router } from 'express';

const router = Router();

router.get('', peliculaSalaController.buscarPeliculasSalas);
router.get('/peliculas/fecha', peliculaSalaController.buscarPeliculasPorFecha);

router.post('', peliculaSalaController.crearRelacionPeliculaSala);
router.put('/update/:id_sala/:id_pelicula', peliculaSalaController.updatePeliculaSala);
router.delete('/:id_sala/:id_pelicula', peliculaSalaController.eliminarRelacionPeliculaSala);

export default router;