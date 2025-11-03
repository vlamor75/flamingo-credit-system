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