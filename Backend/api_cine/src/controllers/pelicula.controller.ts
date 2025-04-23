import { Request, Response } from 'express';
import * as PeliculaService from '../services/pelicula.service';

export const getPeliculas = async (req: Request, res: Response) => {
  try {
    const peliculas = await PeliculaService.getPeliculas();
    res.json(peliculas);
  } catch (error) {
    console.error('Error al obtener películas:', error);
    res.status(500).json({ message: 'Error al obtener películas' });
  }
};

export const buscarPeliculaPorNombre = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nombre } = req.query;
    if (!nombre) {
      res.status(400).json({ message: 'El parámetro "nombre" es requerido' });
      return;
    }

    const peliculas = await PeliculaService.getPeliculasByNombre(nombre as string);
    res.json(peliculas);
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : 'Error al buscar películas' });
  }
};

export const createPelicula = async (req: Request, res: Response): Promise<void>  => {
  try {
    const { nombre, duracion } = req.body;
 
    const nuevaPelicula = { nombre, duracion };
    const peliculaCreada = await PeliculaService.createPelicula(nuevaPelicula);

    res.status(201).json(peliculaCreada);
  } catch (error) {
    console.error('Error al crear película:', error);
    res.status(500).json({ message: 'Error al crear película' });
  }
};

export const updatePelicula = async (req: Request, res: Response): Promise<void>  => {
  try {
    const { id } = req.params;
    const { nombre, duracion } = req.body;
 
    const peliculaActualizada = await PeliculaService.updatePelicula(Number(id), { nombre, duracion });
 
    res.json(peliculaActualizada);
  } catch (error) {
    console.error('Error al actualizar película:', error);
    res.status(500).json({ message: 'Error al actualizar película' });
  }
};

export const deletePelicula = async (req: Request, res: Response): Promise<void>  => {
  try {
    const { id } = req.params;

    await PeliculaService.deletePelicula(Number(id));
 

    res.status(200).json({ message: 'Pelicula eliminada con éxito' });
  } catch (error) {
    console.error('Error al eliminar película:', error);
    res.status(500).json({ message: 'Error al eliminar película' });
  }
};
