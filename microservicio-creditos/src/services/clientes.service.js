const axios = require('axios');

/**
 * Service de Clientes
 * Maneja la comunicación con el Microservicio de Clientes
 */
const ClientesService = {
  /**
   * URL base del microservicio de clientes
   */
  baseURL: process.env.MS_CLIENTES_URL || 'http://localhost:3001',

  /**
   * Verificar si un cliente existe
   * @param {number} clienteId - ID del cliente
   * @returns {Promise<Object|null>} Cliente si existe, null si no
   */
  async verificarCliente(clienteId) {
    try {
      const url = `${this.baseURL}/api/clientes/${clienteId}`;

      console.log(`📡 Consultando MS-Clientes: ${url}`);

      const response = await axios.get(url, {
        timeout: 5000,
      });

      if (response.data.success && response.data.data) {
        console.log(`✅ Cliente encontrado: ${response.data.data.nombre}`);
        return response.data.data;
      }

      return null;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log(`❌ Cliente ${clienteId} no encontrado`);
        return null;
      }

      if (error.code === 'ECONNREFUSED') {
        console.error('❌ No se pudo conectar al Microservicio de Clientes');
        throw new Error('Microservicio de Clientes no disponible');
      }

      console.error('❌ Error al consultar MS-Clientes:', error.message);
      throw error;
    }
  },

  /**
   * Obtener información completa del cliente
   * @param {number} clienteId - ID del cliente
   * @returns {Promise<Object>} Información del cliente
   */
  async obtenerCliente(clienteId) {
    const cliente = await this.verificarCliente(clienteId);

    if (!cliente) {
      throw new Error(`Cliente con ID ${clienteId} no existe`);
    }

    return cliente;
  }
};

module.exports = ClientesService;
