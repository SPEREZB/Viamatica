import { IPeliculaSala } from "../interfaces/peliculaSala.interface";
import { IPelicula } from "../interfaces/movie.interface"; 
import pool from '../config/database';
import { QueryResult } from "pg";
import { ISala } from "../interfaces/sala.interface";

 
export const getAllPeliculasSalas = async (): Promise<IPeliculaSala[]> => {
  try {
    const query = `
    SELECT 
      ps.id_sala_cine,
      ps.fecha_publicacion,
      ps.fecha_fin,
      ps.photourl,
      ps.id_pelicula,
      p.id_pelicula AS pelicula_id,
      p.nombre AS pelicula_nombre,
      p.duracion AS pelicula_duracion,
      s.id_sala AS sala_id,
      s.nombre AS sala_nombre,
      s.estado AS sala_estado
    FROM 
      pelicula_salacine ps
    INNER JOIN 
      pelicula p ON ps.id_pelicula = p.id_pelicula
    INNER JOIN
      sala_cine s ON ps.id_sala_cine = s.id_sala
  `;
  
  const result = await pool.query(query);
  
  return result.rows.map(row => ({
    id_sala_cine: row.id_sala_cine,
    id_pelicula: row.id_pelicula,
    fecha_publicacion: row.fecha_publicacion,
    fecha_fin: row.fecha_fin,
    photourl: row.photourl,
    pelicula: {
      id_pelicula: row.id_pelicula,
      nombre: row.pelicula_nombre,
      duracion: row.pelicula_duracion,
    }, 
    sala: {
      id_sala: row.sala_id,
      nombre: row.sala_nombre,
      estado: row.sala_estado,
    }
  }));
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

export const getPeliculasByFechaPublicacion = async (fecha: string): Promise<IPeliculaSala[]> => {
  try {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
      throw new Error('Formato de fecha inválido. Use YYYY-MM-DD');
    }

    const query = `
      SELECT ps.*, p.nombre as nombre_pelicula, s.nombre as nombre_sala
      FROM pelicula_salacine ps
      JOIN pelicula p ON ps.id_pelicula = p.id_pelicula
      JOIN sala_cine s ON ps.id_sala_cine = s.id_sala
      WHERE ps.fecha_publicacion = $1
    `;
    const result: QueryResult<IPeliculaSala> = await pool.query(query, [fecha]);
    return result.rows;
  } catch (error) {
    console.error('Error al buscar películas por fecha de publicación:', error);
    throw error;
  }
};

export const createPeliculaSala = async (data: {
  id_sala_cine: number;
  id_pelicula: number;
  fecha_publicacion: string;
  fecha_fin?: string;
}): Promise<IPeliculaSala> => {
  try {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(data.fecha_publicacion)) {
      throw new Error('Formato de fecha_publicacion inválido. Use YYYY-MM-DD');
    }

    const query = `
      INSERT INTO pelicula_salacine 
      (id_sala_cine, id_pelicula, fecha_publicacion, fecha_fin)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const values = [
      data.id_sala_cine,
      data.id_pelicula,
      data.fecha_publicacion,
      data.fecha_fin || null
    ];
    
    const result: QueryResult<IPeliculaSala> = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Error al crear relación película-sala:', error);
    throw error;
  }
};

export const deletePeliculaSala = async (id_sala: number, id_pelicula: number): Promise<void> => {
  try {
    const query = `
      DELETE FROM pelicula_salacine
      WHERE id_sala_cine = $1 AND id_pelicula = $2
    `;
    await pool.query(query, [id_sala, id_pelicula]);
  } catch (error) {
    console.error('Error al eliminar relación película-sala:', error);
    throw error;
  }
};

export const getPeliculasBySala = async (id_sala: number): Promise<IPelicula[]> => {
  try {
    const query = `
      SELECT p.*
      FROM pelicula p
      JOIN pelicula_salacine ps ON p.id_pelicula = ps.id_pelicula
      WHERE ps.id_sala_cine = $1
    `;
    const result: QueryResult<IPelicula> = await pool.query(query, [id_sala]);
    return result.rows;
  } catch (error) {
    console.error('Error al obtener películas por sala:', error);
    throw error;
  }
};


export const updatePeliculaSala = async (
  id: number,
  data: {
    nombre?: string;
    estado?: string;
    peliculaId?: number;
    fecha_publicacion?: Date;
    fecha_fin?: Date;
  }
): Promise<{ sala: ISala | null; relacionActualizada: boolean }> => {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');

    let salaActualizada: ISala | null = null;
    
    if (data.nombre || data.estado) {
      const updateQuery = `
        UPDATE sala_cine 
        SET 
          nombre = COALESCE($1, nombre),
          estado = COALESCE($2, estado)
        WHERE id_sala = $3
        RETURNING *`;
      
      const result = await client.query(updateQuery, [
        data.nombre,
        data.estado,
        id
      ]);
      
      salaActualizada = result.rows[0] || null;
    } else {
      const result = await client.query(
        'SELECT * FROM sala_cine WHERE id_sala = $1',
        [id]
      );
      salaActualizada = result.rows[0] || null;
    }

    let relacionActualizada = false;
    
    if (data.peliculaId && salaActualizada) {
      const peliculaCheck = await client.query(
        'SELECT 1 FROM pelicula WHERE id_pelicula = $1',
        [data.peliculaId]
      );
      
      if (peliculaCheck.rows.length > 0) {
        await client.query(
          'DELETE FROM pelicula_salacine WHERE id_sala_cine = $1',
          [id]
        );
        
        await client.query(
          `INSERT INTO pelicula_salacine 
           (id_sala_cine, id_pelicula, fecha_publicacion, fecha_fin)
           VALUES ($1, $2, $3, $4)`,
          [
            id,
            data.peliculaId,
            data.fecha_publicacion || new Date(),
            data.fecha_fin || new Date()
          ]
        );
        
        relacionActualizada = true;
      }
    }

    await client.query('COMMIT');
    return { sala: salaActualizada, relacionActualizada };
    
  } catch (error) {
    await client.query('ROLLBACK'); 
    console.error(`Error al actualizar sala y relación con ID ${id}:`, error);
    throw new Error('Error en la operación de actualización');
  } finally {
    client.release();
  }
};
