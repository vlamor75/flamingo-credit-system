 const { body, param, validationResult } =
  require('express-validator');

  /**
   * Middleware de Validación
   * Usa express-validator para validar y sanitizar
   inputs
   */

  /**
   * Maneja los errores de validación
   */
  const handleValidationErrors = (req, res, next)=> {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Errores de validación',
        details: errors.array()
      });
    }

    next();
  };

  /**
   * Validaciones para crear cliente (POST)
   */
  const validateCreateCliente = [
    body('cedula')
      .trim()
      .notEmpty().withMessage('La cédula es requerida')
      .isLength({ min: 6, max: 15
  }).withMessage('La cédula debe tener entre 6 y 15 caracteres')
      .isNumeric().withMessage('La cédula solo debe contener números'),

    body('nombre')
      .trim()
      .notEmpty().withMessage('El nombre es requerido')
      .isLength({ min: 2, max: 50
  }).withMessage('El nombre debe tener entre 2 y 50 caracteres')
      .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/).withMessage('El nombre solo puede contener letras'),

    body('apellido')
      .trim()
      .notEmpty().withMessage('El apellido es requerido')
      .isLength({ min: 2, max: 50
  }).withMessage('El apellido debe tener entre 2 y 50 caracteres')
      .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/).withMessage('El apellido solo puede contener letras'),

    body('email')
      .trim()
      .notEmpty().withMessage('El email es requerido')
      .isEmail().withMessage('Debe ser un email válido')
      .normalizeEmail(),

    body('telefono')
      .optional()
      .trim()
      .isLength({ min: 7, max: 15}).withMessage('El teléfono debe tener entre 7 y 15 caracteres')
      .isNumeric().withMessage('El teléfono solo debe contener números'),

    body('direccion')
      .optional()
      .trim()
      .isLength({ max: 200 }).withMessage('La dirección no puede exceder 200 caracteres'),

    handleValidationErrors
  ];

  /**
   * Validaciones para actualizar cliente (PUT)
   */
  const validateUpdateCliente = [
    body('nombre')
      .optional()
      .trim()
      .isLength({ min: 2, max: 50
  }).withMessage('El nombre debe tener entre 2 y 50 caracteres')
      .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/).withMessage('El nombre solo puede contener letras'),

    body('apellido')
      .optional()
      .trim()
      .isLength({ min: 2, max: 50
  }).withMessage('El apellido debe tener entre 2 y 50 caracteres')
      .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/).withMessage('El apellido solo puede contener letras'),

    body('email')
      .optional()
      .trim()
      .isEmail().withMessage('Debe ser un email válido')
      .normalizeEmail(),

    body('telefono')
      .optional()
      .trim()
      .isLength({ min: 7, max: 15
  }).withMessage('El teléfono debe tener entre 7 y 15 caracteres')
      .isNumeric().withMessage('El teléfono solo debe contener números'),

    body('direccion')
      .optional()
      .trim()
      .isLength({ max: 200 }).withMessage('La dirección no puede exceder 200 caracteres'),

    handleValidationErrors
  ];

  /**
   * Validación para parámetros ID
   */
  const validateId = [
    param('id')
      .isInt({ min: 1 }).withMessage('El ID debe ser un número entero positivo'),

    handleValidationErrors
  ];

  module.exports = {
    validateCreateCliente,
    validateUpdateCliente,
    validateId
  };