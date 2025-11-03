 const express = require('express');
  const router = express.Router();
  const ClientesController =
  require('../controllers/clientes.controller');
  const {
    validateCreateCliente,
    validateUpdateCliente,
    validateId
  } =
  require('../middleware/validator.middleware');

  /**
   * Rutas de Clientes
   * Base: /api/clientes
   */

  /**
   * @route   GET /api/clientes
   * @desc    Obtener todos los clientes
   * @access  Public (luego será Private con JWT)
   */
  router.get('/',
  ClientesController.getAllClientes);

  /**
   * @route   GET /api/clientes/:id
   * @desc    Obtener cliente por ID
   * @access  Public
   */
  router.get('/:id', validateId,
  ClientesController.getClienteById);

  /**
   * @route   POST /api/clientes
   * @desc    Crear nuevo cliente
   * @access  Public
   */
  router.post('/', validateCreateCliente,
  ClientesController.createCliente);

  /**
   * @route   PUT /api/clientes/:id
   * @desc    Actualizar cliente
   * @access  Public
   */
  router.put('/:id', validateId,
  validateUpdateCliente,
  ClientesController.updateCliente);

  /**
   * @route   DELETE /api/clientes/:id
   * @desc    Eliminar cliente
   * @access  Public
   */
  router.delete('/:id', validateId,
  ClientesController.deleteCliente);

  module.exports = router;