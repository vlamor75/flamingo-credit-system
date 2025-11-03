const ClienteModel =
  require('../models/cliente.model');

  /**
   * Controlador de Clientes
   * Maneja la lógica de negocio y respuestas HTTP
   */
  const ClientesController = {
    /**
     * GET /api/clientes
     * Obtener todos los clientes
     */
    async getAllClientes(req, res) {
      try {
        const clientes = await
  ClienteModel.findAll();

        res.status(200).json({
          success: true,
          count: clientes.length,
          data: clientes
        });
      } catch (error) {
        console.error('Error al obtener clientes:',
   error);
        res.status(500).json({
          success: false,
          error: 'Error al obtener clientes'
        });
      }
    },

    /**
     * GET /api/clientes/:id
     * Obtener un cliente por ID
     */
    async getClienteById(req, res) {
      try {
        const { id } = req.params;
        const cliente = await
  ClienteModel.findById(id);

        if (!cliente) {
          return res.status(404).json({
            success: false,
            error: 'Cliente no encontrado'
          });
        }

        res.status(200).json({
          success: true,
          data: cliente
        });
      } catch (error) {
        console.error('Error al obtener cliente:',
  error);
        res.status(500).json({
          success: false,
          error: 'Error al obtener cliente'
        });
      }
    },

    /**
     * POST /api/clientes
     * Crear nuevo cliente
     */
    async createCliente(req, res) {
      try {
        const { cedula, nombre, apellido, email,
  telefono, direccion } = req.body;

        // Verificar si ya existe un cliente con esa cédula
        const clienteExistente = await
  ClienteModel.findByCedula(cedula);

        if (clienteExistente) {
          return res.status(400).json({success: false, error: 'Ya existe un cliente con esa  cédula'
          });
        }

        // Crear el cliente
        const nuevoCliente = await
  ClienteModel.create({
          cedula,
          nombre,
          apellido,
          email,
          telefono,
          direccion
        });

        res.status(201).json({
          success: true,
          message: 'Cliente creado exitosamente',
          data: nuevoCliente
        });
      } catch (error) {
        console.error('Error al crear cliente:',
  error);
        res.status(500).json({
          success: false,
          error: 'Error al crear cliente'
        });
      }
    },

    /**
     * PUT /api/clientes/:id
     * Actualizar cliente existente
     */
    async updateCliente(req, res) {
      try {
        const { id } = req.params;
        const { nombre, apellido, email, telefono,
  direccion } = req.body;

        // Verificar si el cliente existe
        const clienteExistente = await
  ClienteModel.findById(id);

        if (!clienteExistente) {
          return res.status(404).json({
            success: false,
            error: 'Cliente no encontrado'
          });
        }

        // Actualizar el cliente
        const clienteActualizado = await
  ClienteModel.update(id, {
          nombre,
          apellido,
          email,
          telefono,
          direccion
        });

        res.status(200).json({
          success: true,
          message: 'Cliente actualizado exitosamente',
          data: clienteActualizado
        });
      } catch (error) {
        console.error('Error al actualizar cliente:', error);
        res.status(500).json({
          success: false,
          error: 'Error al actualizar cliente'
        });
      }
    },

    /**
     * DELETE /api/clientes/:id
     * Eliminar cliente
     */
    async deleteCliente(req, res) {
      try {
        const { id } = req.params;

        // Verificar si el cliente existe
        const clienteExistente = await
  ClienteModel.findById(id);

        if (!clienteExistente) {
          return res.status(404).json({
            success: false,
            error: 'Cliente no encontrado'
          });
        }

        // Eliminar el cliente
        await ClienteModel.remove(id);

        res.status(200).json({
          success: true,
          message: 'Cliente eliminado exitosamente'
        });
      } catch (error) {
        console.error('Error al eliminar cliente:',
   error);
        res.status(500).json({
          success: false,
          error: 'Error al eliminar cliente'
        });
      }
    }
  };

  module.exports = ClientesController;