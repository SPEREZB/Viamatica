import { Request, Response } from 'express';
import * as peliculaSalaService from '../services/peliculaSala.service';

export const buscarPeliculasSalas = async (req: Request, res: Response): Promise<void> => {
  try { 
    const peliculas = await peliculaSalaService.getAllPeliculasSalas();
    res.json(peliculas);
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : 'Error al buscar películas' });
  }
};

export const buscarPeliculaPorNombre = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nombre } = req.query;
    if (!nombre) {
      res.status(400).json({ message: 'El parámetro "nombre" es requerido' });
      return;
    }

    const peliculas = await peliculaSalaService.getPeliculasByNombre(nombre as string);
    res.json(peliculas);
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : 'Error al buscar películas' });
  }
};

export const buscarPeliculasPorFecha = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fecha } = req.query;
    if (!fecha) {
      res.status(400).json({ message: 'El parámetro "fecha" es requerido' });
      return;
    }

    const peliculas = await peliculaSalaService.getPeliculasByFechaPublicacion(fecha as string);
    res.json(peliculas);
  } catch (error) {
    res.status(500).json({ 
      message: error instanceof Error ? error.message : 'Error al buscar películas por fecha' 
    });
  }
};


export const crearRelacionPeliculaSala = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id_sala_cine, id_pelicula, fecha_publicacion, fecha_fin } = req.body;
    
    if (!id_sala_cine || !id_pelicula || !fecha_publicacion) {
      res.status(400).json({ 
        message: 'id_sala_cine, id_pelicula y fecha_publicacion son requeridos' 
      });
      return;
    }

    const nuevaRelacion = await peliculaSalaService.createPeliculaSala({
      id_sala_cine,
      id_pelicula,
      fecha_publicacion,
      fecha_fin
    });

    res.status(201).json(nuevaRelacion);
  } catch (error) {
    res.status(500).json({ 
      message: error instanceof Error ? error.message : 'Error al crear relación' 
    });
  }
};
export const updatePeliculaSala = async (req: Request, res: Response): Promise<void> => {
  try {
    const id_sala = parseInt(req.params.id_sala);
    const id_pelicula = parseInt(req.params.id_pelicula);
    const { nombre, estado, fecha_publicacion, fecha_fin } = req.body;

    // Validaciones básicas
    if (isNaN(id_sala)) {
      res.status(400).json({ message: 'ID de sala debe ser un número válido' });
      return;
    }

    if (isNaN(id_pelicula)) {
      res.status(400).json({ message: 'ID de película debe ser un número válido' });
      return;
    }

    // Validar fechas
    if (fecha_publicacion && isNaN(Date.parse(fecha_publicacion))) {
      res.status(400).json({ message: 'Formato de fecha_publicacion inválido (use YYYY-MM-DD)' });
      return;
    }

    if (fecha_fin && isNaN(Date.parse(fecha_fin))) {
      res.status(400).json({ message: 'Formato de fecha_fin inválido (use YYYY-MM-DD)' });
      return;
    }

    // Construir objeto de actualización
    const updateData = {
      ...(nombre && { nombre }),
      ...(estado && { estado }),
      peliculaId: id_pelicula,
      ...(fecha_publicacion && { fecha_publicacion: new Date(fecha_publicacion) }),
      ...(fecha_fin && { fecha_fin: new Date(fecha_fin) })
    };

    // Actualizar
    const result = await peliculaSalaService.updatePeliculaSala(id_sala, updateData);

    if (!result.sala) {
      res.status(404).json({ message: 'Relación no encontrada' });
      return;
    }

    res.status(200).json({
      message: 'Actualización exitosa',
      data: {
        sala: result.sala,
        relacion: result.relacionActualizada
      }
    });

  } catch (error) {
    console.error('Error en updatePeliculaSala:', error);
    res.status(500).json({ 
      message: 'Error interno al actualizar relación',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
};

export const eliminarRelacionPeliculaSala = async (req: Request, res: Response) => {
  try {
    const { id_sala, id_pelicula } = req.params;
    
    await peliculaSalaService.deletePeliculaSala(Number(id_sala), Number(id_pelicula));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : 'Error al eliminar relación' });
  }
};
