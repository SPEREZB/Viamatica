import sequelize from './config/database';
import express from 'express';
import cors from 'cors'; // Importación correcta
import loginRoutes from './routes/login.routes';
import peliculaRoutes from './routes/pelicula.routes';
import salaRoutes from './routes/sala.routes';
import peliculaSalaRoutes from './routes/peliculaSala.routes';
import pool from './config/database';

const app = express();

// Middlewares
app.use(cors()); // Ahora usa el paquete instalado
app.use(express.json());

// Rutas
app.use('/api/login', loginRoutes);
app.use('/api/peliculas', peliculaRoutes);
app.use('/api/salas', salaRoutes);
app.use('/api/pelicula_salacine', peliculaSalaRoutes);

const PORT = 3000;

pool.query('SELECT NOW()')
  .then(() => {
    console.log('Conexión a PostgreSQL establecida correctamente.');
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('No se pudo conectar a la base de datos:', error);
    process.exit(1); // Finaliza el proceso si no hay conexión
  });