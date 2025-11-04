const { Pool } = require('pg');
  require('dotenv').config();

  // Pool de conexiones a PostgreSQL
  const pool = new Pool({
    host: process.env.DB_HOST ||
  'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME ||
  'flamingo',
    user: process.env.DB_USER ||
  'postgres',
    password: process.env.DB_PASSWORD ||
   'postgres',
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
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

  // Exportar el pool
  module.exports = pool;