import pool from '../config/database';
import { QueryResult } from 'pg';
import { IPelicula } from '../interfaces/movie.interface';

export const getPeliculas = async () => {
  try {
    const query = `SELECT * FROM pelicula`; 
  const result: QueryResult<IPelicula> = await pool.query(query);
  return result.rows;
  } catch (error) {
    console.error('Error al buscar películas por nombre:', error);
    throw error;
  }
};


export const getPeliculasByNombre = async (nombre: string): Promise<IPelicula[]> => {
  try {
    const query = `SELECT * FROM pelicula WHERE nombre = '${nombre}'`; 
  const result: QueryResult<IPelicula> = await pool.query(query);
  return result.rows;
  } catch (error) {
    console.error('Error al buscar películas por nombre:', error);
    throw error;
  }
};

export const createPelicula = async (pelicula: IPelicula): Promise<IPelicula> => {
  try {
    const query = `
      INSERT INTO pelicula (nombre, duracion) 
      VALUES ($1, $2) 
      RETURNING *;
    `;
    const values = [
      pelicula.nombre,
      pelicula.duracion
    ];

    const result: QueryResult<IPelicula> = await pool.query(query, values);
    return result.rows[0];  
  } catch (error) {
    console.error('Error al crear película:', error);
    throw error;
  }
};


export const updatePelicula = async (id: number, pelicula: IPelicula): Promise<IPelicula> => {
  try {
    const query = `
      UPDATE pelicula 
      SET nombre = $1, duracion = $2
      WHERE id_pelicula = $3 
      RETURNING *;
    `;
    const values = [
      pelicula.nombre,
      pelicula.duracion,
      id
    ];

    const result: QueryResult<IPelicula> = await pool.query(query, values);
    return result.rows[0]; 
  } catch (error) {
    console.error('Error al actualizar película:', error);
    throw error;
  }
};

export const deletePelicula = async (id: number): Promise<boolean> => {
  try {
    const query = `
      DELETE FROM pelicula 
      WHERE id_pelicula = $1;
    `;
    const values = [id];

    const result: QueryResult = await pool.query(query, values);
    
    if (result.rowCount === 0) {
      return false;  
    }
    return true;  
  } catch (error) {
    console.error('Error al eliminar película:', error);
    throw error;
  }
};
