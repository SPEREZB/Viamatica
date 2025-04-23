import { Router } from 'express';
import * as PeliculaController from '../controllers/pelicula.controller';

const router = Router();

router.get('', PeliculaController.getPeliculas);
router.get('/buscar', PeliculaController.buscarPeliculaPorNombre);
router.post('', PeliculaController.createPelicula);
router.put('/update/:id', PeliculaController.updatePelicula);
router.delete('/delete/:id', PeliculaController.deletePelicula);


export default router;
