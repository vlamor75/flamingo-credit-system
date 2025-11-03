  const express = require('express');
  const helmet = require('helmet');
  const cors = require('cors');
  require('dotenv').config();

  // Importar configuración de base de datos
  const pool = require('./config/database');

  // Importar rutas
  const clientesRoutes =
  require('./routes/clientes.routes');

  // Crear aplicación Express
  const app = express();
  const PORT = process.env.PORT || 3001;

  // ========================================
  // MIDDLEWARE DE SEGURIDAD
  // ========================================

  /**
   * Helmet - Protege headers HTTP
   * Previene: Clickjacking, XSS, MIME sniffing
   */
  app.use(helmet());

  /**
   * CORS - Cross-Origin Resource Sharing
   * Permite peticiones desde otros dominios
   */
  app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type',
  'Authorization']
  }));

  /**
   * Parser de JSON
   * Convierte el body de las peticiones a JSON
   */
  app.use(express.json());

  /**
   * Parser de URL-encoded
   * Para formularios HTML
   */
  app.use(express.urlencoded({ extended: true }));

  // ========================================
  // RUTAS
  // ========================================

  /**
   * Ruta de health check
   * Para verificar que el servicio está activo
   */
  app.get('/health', (req, res) => {
    res.status(200).json({
      success: true,
      message: 'Microservicio de Clientes - OK',
      timestamp: new Date().toISOString()
    });
  });

  /**
   * Rutas de API
   */
  app.use('/api/clientes', clientesRoutes);

  /**
   * Ruta 404 - Not Found
   * Se ejecuta si ninguna ruta coincide
   */
  app.use((req, res) => {
    res.status(404).json({
      success: false,
      error: 'Endpoint no encontrado'
    });
  });

  // ========================================
  // MANEJO DE ERRORES GLOBAL
  // ========================================

  /**
   * Error handler global
   * Captura errores no manejados
   */
  app.use((err, req, res, next) => {
    console.error('Error no manejado:', err);

    res.status(err.status || 500).json({
      success: false,
      error: err.message || 'Error interno del servidor',
      ...(process.env.NODE_ENV === 'development' &&
   { stack: err.stack })
    });
  });

  // ========================================
  // INICIAR SERVIDOR
  // ========================================

  /**
   * Verificar conexión a BD antes de iniciar
   */
  const startServer = async () => {
    try {
      // Test de conexión a PostgreSQL
      await pool.query('SELECT NOW()');
      console.log('✅ Conexión a PostgreSQL exitosa');

      // Iniciar servidor
      app.listen(PORT, () => {
        console.log('========================================');
        console.log(`🚀 Microservicio de
  Clientes`);
        console.log(`📡 Puerto: ${PORT}`);
        console.log(`🌍 Entorno:
  ${process.env.NODE_ENV || 'development'}`);
        console.log(`⏰ Iniciado: ${new
  Date().toLocaleString()}`);
        console.log('========================================');
      });
    } catch (error) {
      console.error('❌ Error al conectar a PostgreSQL:', error);
      console.error('Verifica que PostgreSQL esté corriendo y las credenciales sean correctas');
      process.exit(1);
    }
  };

  // Iniciar el servidor
  startServer();

  // ========================================
  // MANEJO DE SEÑALES DEL SISTEMA
  // ========================================

  /**
   * Graceful shutdown
   * Cierra conexiones correctamente al detener el
  servidor
   */
  process.on('SIGINT', async () => {
    console.log('\n🛑 Cerrando servidor...');

    try {
      await pool.end();
      console.log('✅ Conexiones cerradas correctamente');
      process.exit(0);
    } catch (error) {
      console.error('❌ Error al cerrar conexiones:', error);
      process.exit(1);
    }
  });