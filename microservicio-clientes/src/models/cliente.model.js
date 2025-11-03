 const pool = require('../config/database');

  /**
   * Modelo de Cliente
   * Maneja todas las operaciones de base de datos
  para clientes
   */
  const ClienteModel = {
    /**
     * Obtener todos los clientes
     * @returns {Promise} Array de clientes
     */
    async findAll() {
      try {
        const query = 'SELECT * FROM clientes ORDER BY id DESC';
        const result = await pool.query(query);
        return result.rows;
      } catch (error) {
        throw error;
      }
    },

    /**Buscar cliente por ID
     * @param {number} id - ID del cliente
     * @returns {Promise} Cliente encontrado o null
     */
    async findById(id) {
      try {
        const query = 'SELECT * FROM clientes WHERE id = $1';
        const result = await pool.query(query,
  [id]);
        return result.rows[0] || null;
      } catch (error) {
        throw error;
      }
    },

    /**
     * Buscar cliente por cédula
     * @param {string} cedula - Cédula del cliente
     * @returns {Promise} Cliente encontrado o null
     */
    async findByCedula(cedula) {
      try {
        const query = 'SELECT * FROM clientes WHERE cedula = $1';
        const result = await pool.query(query,
  [cedula]);
        return result.rows[0] || null;
      } catch (error) {
        throw error;
      }
    },

    /**
     * Crear nuevo cliente
     * @param {Object} clienteData - Datos del
  cliente
     * @returns {Promise} Cliente creado
     */
    async create(clienteData) {
      try {
        const { cedula, nombre, apellido, email,
  telefono, direccion } = clienteData;

        const query = `
          INSERT INTO clientes (cedula, nombre,
  apellido, email, telefono, direccion)
          VALUES ($1, $2, $3, $4, $5, $6)
          RETURNING *
        `;

        const values = [cedula, nombre, apellido,
  email, telefono, direccion];
        const result = await pool.query(query,
  values);

        return result.rows[0];
      } catch (error) {
        throw error;
      }
    },

    /**
     * Actualizar cliente
     * @param {number} id - ID del cliente
     * @param {Object} clienteData - Datos a
  actualizar
     * @returns {Promise} Cliente actualizado
     */
    async update(id, clienteData) {
      try {
        const { nombre, apellido, email, telefono,
  direccion } = clienteData;

        const query = `
          UPDATE clientesSET 
              nombre = $1,
              apellido = $2,
              email = $3,
              telefono = $4,
              direccion = $5,
              updated_at = CURRENT_TIMESTAMP
          WHERE id = $6
          RETURNING *
        `;

        const values = [nombre, apellido, email,
  telefono, direccion, id];
        const result = await pool.query(query,
  values);

        return result.rows[0];
      } catch (error) {
        throw error;
      }
    },

    /**
     * Eliminar cliente
     * @param {number} id - ID del cliente
     * @returns {Promise} Cliente eliminado
     */
    async remove(id) {
      try {
        const query = 'DELETE FROM clientes WHERE id = $1 RETURNING *';
        const result = await pool.query(query,
  [id]);
        return result.rows[0];
      } catch (error) {
        throw error;
      }
    }
  };

  module.exports = ClienteModel;