import { Request, Response } from 'express';
import * as salaService from '../services/sala.service';
import { ISala } from '../interfaces/sala.interface';

export const getAllSalas = async (req: Request, res: Response): Promise<void> => {
  try {
    const salas = await salaService.getSalas();
    res.json(salas);
  } catch (error) {
    console.error('Error en getAllSalas:', error);
    res.status(500).json({ message: 'Error al obtener salas' });
  }
};

export const getSala = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ message: 'ID debe ser un número' });
      return;
    }

    const sala = await salaService.getSalaById(id);
    if (!sala) {
      res.status(404).json({ message: 'Sala no encontrada' });
      return;
    }

    res.json(sala);
  } catch (error) {
    console.error('Error en getSala:', error);
    res.status(500).json({ message: 'Error al obtener sala' });
  }
};

export const createSala = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nombre, estado } = req.body;
    
    if (!nombre || !estado) {
      res.status(400).json({ message: 'Nombre y estado son requeridos' });
      return;
    }

    const nuevaSala = await salaService.createSala({ nombre, estado });
    res.status(201).json(nuevaSala);
  } catch (error) {
    console.error('Error en createSala:', error);
    res.status(500).json({ message: 'Error al crear sala' });
  }
};

export const updateSala = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ message: 'ID debe ser un número' });
      return;
    }

    const { nombre, estado } = req.body;
    const dataToUpdate: Partial<Omit<ISala, 'id_sala'>> = {};

    if (nombre !== undefined) dataToUpdate.nombre = nombre;
    if (estado !== undefined) dataToUpdate.estado = estado;

    if (Object.keys(dataToUpdate).length === 0) {
      res.status(400).json({ message: 'No hay datos para actualizar' });
      return;
    }

    const salaActualizada = await salaService.updateSala(id, dataToUpdate);
    if (!salaActualizada) {
      res.status(404).json({ message: 'Sala no encontrada' });
      return;
    }

    res.json(salaActualizada);
  } catch (error) {
    console.error('Error en updateSala:', error);
    res.status(500).json({ message: 'Error al actualizar sala' });
  }
};

export const deleteSala = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ message: 'ID debe ser un número' });
      return;
    }

    const eliminada = await salaService.deleteSala(id);
    if (!eliminada) {
      res.status(404).json({ message: 'Sala no encontrada' });
      return;
    }

    res.status(204).send();
  } catch (error) {
    console.error('Error en deleteSala:', error);
    res.status(500).json({ message: 'Error al eliminar sala' });
  }
};

export const obtenerEstadoSala = async (req: Request, res: Response): Promise<void> => {
  try {
    const { sala } = req.query;
    if (!sala) {
      res.status(400).json({ message: 'El parámetro "sala" es requerido' });
      return;
    }

    const resultado = await salaService.getEstadoSalaByNombre(sala as string);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ 
      message: error instanceof Error ? error.message : 'Error al obtener estado de la sala' 
    });
  }
};