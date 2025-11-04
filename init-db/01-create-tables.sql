-- ========================================
  -- SISTEMA DE CRÉDITO FLAMINGO
  -- Script de Inicialización de Base de Datos
  -- ========================================

  -- Crear extensiones útiles
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

  -- ========================================
  -- TABLA: clientes
  -- ========================================
  CREATE TABLE IF NOT EXISTS clientes (
      id SERIAL PRIMARY KEY,
      cedula VARCHAR(15) NOT NULL UNIQUE,
      nombre VARCHAR(50) NOT NULL,
      apellido VARCHAR(50) NOT NULL,
      email VARCHAR(100) NOT NULL,
      telefono VARCHAR(15),
      direccion VARCHAR(200),
      created_at TIMESTAMP DEFAULT
  CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT
  CURRENT_TIMESTAMP
  );

  -- Índices para mejorar performance
  CREATE INDEX idx_clientes_cedula ON
  clientes(cedula);
  CREATE INDEX idx_clientes_email ON
  clientes(email);

  -- ========================================
  -- DATOS DE PRUEBA
  -- ========================================
  INSERT INTO clientes (cedula, nombre, apellido,
  email, telefono, direccion) VALUES
  ('1234567890', 'Juan', 'Pérez',
  'juan.perez@example.com', '3001234567', 'Calle
  123 #45-67, Bogotá'),
  ('9876543210', 'María', 'González',
  'maria.gonzalez@example.com', '3109876543',
  'Carrera 45 #12-34, Medellín'),
  ('5555555555', 'Carlos', 'Rodríguez',
  'carlos.rodriguez@example.com', '3205555555',
  'Avenida 68 #25-30, Cali');

  -- Mensaje de confirmación
  SELECT 'Base de datos inicializada correctamente'
   AS status;

   -- ========================================
  -- TABLA: creditos
  -- ========================================
  CREATE TABLE IF NOT EXISTS creditos (
      id SERIAL PRIMARY KEY,
      cliente_id INTEGER NOT NULL,
      monto_solicitado DECIMAL(15,2) NOT NULL,
      plazo_meses INTEGER NOT NULL,
      tasa_interes DECIMAL(5,2) NOT NULL,
      estado VARCHAR(20) DEFAULT 'pendiente',
      motivo_rechazo TEXT,
      created_at TIMESTAMP DEFAULT
  CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT
  CURRENT_TIMESTAMP,

      -- FOREIGN KEY: Relación con clientes
      CONSTRAINT fk_cliente
          FOREIGN KEY (cliente_id)
          REFERENCES clientes(id)
          ON DELETE CASCADE
  );

  -- Índices para mejorar performance
  CREATE INDEX idx_creditos_cliente ON
  creditos(cliente_id);
  CREATE INDEX idx_creditos_estado ON
  creditos(estado);

  -- ========================================
  -- DATOS DE PRUEBA: Créditos
  -- ========================================
  INSERT INTO creditos (cliente_id,
  monto_solicitado, plazo_meses, tasa_interes,
  estado) VALUES
  (1, 5000000, 24, 12.5, 'aprobado'),
  (2, 3000000, 12, 10.0, 'pendiente'),
  (3, 10000000, 48, 15.0, 'rechazado');

  -- Mensaje de confirmación final
  SELECT 'Tablas de clientes y créditos creadas
  correctamente' AS status;