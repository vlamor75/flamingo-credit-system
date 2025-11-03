  const { Pool } = require('pg');
  require('dotenv').config();

  // Pool de conexiones a PostgreSQL
  const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'flamingo',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    max: 20, // Máximo de conexiones en el pool
    idleTimeoutMillis: 30000, // Cerrar conexiones inactivas
    //  después de 30s connectionTimeoutMillis: 2000, 
    // Timeout para obtener conexión
  });

  // Evento cuando se conecta
  pool.on('connect', () => {
    console.log('✅ Conectado a PostgreSQL');
  });

  // Evento de error
  pool.on('error', (err) => {
    console.error('❌ Error inesperado en PostgreSQL:', err);
    process.exit(-1);
  });

  // Exportar el pool para usarlo en otros archivos
  module.exports = pool;