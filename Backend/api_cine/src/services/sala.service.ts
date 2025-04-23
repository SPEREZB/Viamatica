import { QueryResult } from 'pg';
import pool from '../config/database';
import { ISala } from '../interfaces/sala.interface';
import { IPelicula } from '../interfaces/movie.interface';

export const getSalas = async (): Promise<ISala[]> => {
  const query = 'SELECT * FROM sala_cine ORDER BY id_sala';
  const result: QueryResult<ISala> = await pool.query(query);
  return result.rows;
};

export const getSalaById = async (id: number): Promise<ISala | null> => {
  const query = 'SELECT * FROM sala_cine WHERE id_sala = $1';
  const result: QueryResult<ISala> = await pool.query(query, [id]);
  return result.rows[0] || null;
};

export const createSala = async (data: Omit<ISala, 'id_sala'>): Promise<ISala> => {
  const query = `
    INSERT INTO sala_cine (nombre, estado)
    VALUES ($1, $2)
    RETURNING *
  `;
  const values = [data.nombre, data.estado];
  const result: QueryResult<ISala> = await pool.query(query, values);
  return result.rows[0];
};

export const updateSala = async (
  id: number, 
  data: Partial<Omit<ISala, 'id_sala'>>
): Promise<ISala | null> => {
  const keys = Object.keys(data);
  if (keys.length === 0) return null;

  const setClause = keys.map((key, index) => `${key} = $${index + 1}`).join(', ');
  const values = Object.values(data);

  const query = `
    UPDATE sala_cine
    SET ${setClause}
    WHERE id_sala = $${keys.length + 1}
    RETURNING *;
  `;

  const result = await pool.query(query, [...values, id]);

  if (result.rows.length === 0) return null;
  return result.rows[0];
};

export const deleteSala = async (id: number): Promise<boolean> => {
  await pool.query('DELETE FROM pelicula_salacine WHERE id_sala_cine = $1', [id]);
  
  const query = 'DELETE FROM sala_cine WHERE id_sala = $1';
  const result = await pool.query(query, [id]);
  return result.rows[0];
};


export const getEstadoSalaByNombre = async (nombreSala: string): Promise<{
  sala: ISala;
  peliculas: IPelicula[];
  estado: string;
}> => {
  try {
    // 1. Obtener la sala
    const salaQuery = 'SELECT * FROM sala_cine WHERE nombre = $1';
    const salaResult: QueryResult<ISala> = await pool.query(salaQuery, [nombreSala]);
    
    if (salaResult.rows.length === 0) {
      throw new Error('Sala no encontrada');
    }

    const sala = salaResult.rows[0];

    // 2. Obtener películas asociadas a la sala
    const peliculasQuery = `
      SELECT p.* 
      FROM pelicula p
      JOIN pelicula_salacine ps ON p.id_pelicula = ps.id_pelicula
      WHERE ps.id_sala_cine = $1
    `;
    const peliculasResult: QueryResult<IPelicula> = await pool.query(peliculasQuery, [sala.id_sala]);
    const peliculas = peliculasResult.rows;
    const cantidadPeliculas = peliculas.length;

    // 3. Determinar el estado según la cantidad de películas
    let estado;
    if (cantidadPeliculas < 3) {
      estado = 'Sala disponible';
    } else if (cantidadPeliculas >= 3 && cantidadPeliculas <= 5) {
      estado = `Sala con ${cantidadPeliculas} películas asignadas`;
    } else {
      estado = 'Sala no disponible';
    }

    return {
      sala,
      peliculas,
      estado
    };
  } catch (error) {
    console.error('Error al obtener estado de la sala:', error);
    throw error;
  }
};