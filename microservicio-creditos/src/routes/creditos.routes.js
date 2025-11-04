const express = require('express');
const router = express.Router();
const CreditosController = require('../controllers/creditos.controller');
const { body, param } = require('express-validator');

// Validar ID numérico en params
const validateId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('El ID debe ser un número entero positivo')
];

// Validar datos para crear crédito
const validateCreateCredito = [
  body('cliente_id')
    .notEmpty().withMessage('El ID del cliente es requerido')
    .isInt({ min: 1 }).withMessage('El ID del cliente debe ser un número válido'),

  body('monto_solicitado')
    .notEmpty().withMessage('El monto solicitado es requerido')
    .isNumeric().withMessage('El monto debe ser numérico')
    .isFloat({ min: 100000, max: 50000000 })
    .withMessage('El monto debe estar entre $100,000 y $50,000,000'),

  body('plazo_meses')
    .notEmpty().withMessage('El plazo es requerido')
    .isInt({ min: 6, max: 60 })
    .withMessage('El plazo debe estar entre 6 y 60 meses'),

  body('tasa_interes')
    .notEmpty().withMessage('La tasa de interés es requerida')
    .isFloat({ min: 0, max: 100 })
    .withMessage('La tasa debe estar entre 0% y 100%')
];

// Validar motivo de rechazo
const validateRechazo = [
  body('motivo')
    .notEmpty().withMessage('El motivo de rechazo es requerido')
    .isLength({ min: 10, max: 500 })
    .withMessage('El motivo debe tener entre 10 y 500 caracteres')
    .trim()
];

// GET /api/creditos - Obtener todos los créditos
router.get('/', CreditosController.getAllCreditos);

// GET /api/creditos/cliente/:clienteId - Créditos de un cliente
router.get('/cliente/:clienteId', validateId, CreditosController.getCreditosByCliente);

// GET /api/creditos/:id - Obtener un crédito
router.get('/:id', validateId, CreditosController.getCreditoById);

// POST /api/creditos - Crear solicitud de crédito
router.post('/', validateCreateCredito, CreditosController.createCredito);

// PUT /api/creditos/:id/aprobar - Aprobar crédito
router.put('/:id/aprobar', validateId, CreditosController.aprobarCredito);

// PUT /api/creditos/:id/rechazar - Rechazar crédito
router.put('/:id/rechazar', validateId, validateRechazo, CreditosController.rechazarCredito);

// DELETE /api/creditos/:id - Eliminar crédito
router.delete('/:id', validateId, CreditosController.deleteCredito);

module.exports = router;
