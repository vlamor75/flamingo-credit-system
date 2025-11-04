const CreditoModel = require('../models/credito.model');
const ClientesService = require('../services/clientes.service');

/**
 * ============================================
 * CONTROLADOR DE CRÉDITOS
 * ============================================
 *
 * Responsabilidades:
 * - Gestionar solicitudes de crédito
 * - Verificar existencia del cliente (comunicación entre microservicios)
 * - Aplicar lógica de aprobación/rechazo
 * - Retornar respuestas HTTP apropiadas
 */
const CreditosController = {

  /**
   * ============================================
   * GET /api/creditos
   * ============================================
   * Obtener todos los créditos con información del cliente
   */
  async getAllCreditos(req, res) {
    try {
      const creditos = await CreditoModel.findAll();

      res.status(200).json({
        success: true,
        count: creditos.length,
        data: creditos
      });
    } catch (error) {
      console.error('Error al obtener créditos:', error);
      res.status(500).json({
        success: false,
        error: 'Error al obtener créditos'
      });
    }
  },

  /**
   * ============================================
   * GET /api/creditos/:id
   * ============================================
   * Obtener un crédito específico por ID
   */
  async getCreditoById(req, res) {
    try {
      const { id } = req.params;
      const credito = await CreditoModel.findById(id);

      if (!credito) {
        return res.status(404).json({
          success: false,
          error: 'Crédito no encontrado'
        });
      }

      res.status(200).json({
        success: true,
        data: credito
      });
    } catch (error) {
      console.error('Error al obtener crédito:', error);
      res.status(500).json({
        success: false,
        error: 'Error al obtener crédito'
      });
    }
  },

  /**
   * ============================================
   * GET /api/creditos/cliente/:clienteId
   * ============================================
   * Obtener todos los créditos de un cliente específico
   */
  async getCreditosByCliente(req, res) {
    try {
      const { clienteId } = req.params;

      // COMUNICACIÓN ENTRE MICROSERVICIOS
      // Verificar que el cliente existe en MS-Clientes
      const cliente = await ClientesService.verificarCliente(clienteId);

      if (!cliente) {
        return res.status(404).json({
          success: false,
          error: `Cliente con ID ${clienteId} no encontrado`
        });
      }

      const creditos = await CreditoModel.findByCliente(clienteId);

      res.status(200).json({
        success: true,
        cliente: {
          id: cliente.id,
          nombre: `${cliente.nombre} ${cliente.apellido}`,
          cedula: cliente.cedula
        },
        count: creditos.length,
        data: creditos
      });
    } catch (error) {
      console.error('Error al obtener créditos del cliente:', error);
      res.status(500).json({
        success: false,
        error: 'Error al obtener créditos del cliente'
      });
    }
  },

  /**
   * ============================================
   * POST /api/creditos
   * ============================================
   * Crear nueva solicitud de crédito
   *
   * FLUJO:
   * 1. Validar que el cliente existe (comunicación con MS-Clientes)
   * 2. Validar datos del crédito
   * 3. Crear solicitud con estado "pendiente"
   */
  async createCredito(req, res) {
    try {
      const { cliente_id, monto_solicitado, plazo_meses, tasa_interes } = req.body;

      // ====================================
      // PASO 1: VERIFICAR CLIENTE
      // ====================================
      // IMPORTANTE: Llamamos al MS-Clientes para verificar existencia
      console.log(`🔍 Verificando cliente ${cliente_id}...`);

      const cliente = await ClientesService.verificarCliente(cliente_id);

      if (!cliente) {
        return res.status(400).json({
          success: false,
          error: `El cliente con ID ${cliente_id} no existe`
        });
      }

      console.log(`✅ Cliente verificado: ${cliente.nombre} ${cliente.apellido}`);

      // ====================================
      // PASO 2: VALIDACIONES DE NEGOCIO
      // ====================================

      // Validar monto mínimo y máximo
      if (monto_solicitado < 100000) {
        return res.status(400).json({
          success: false,
          error: 'El monto mínimo es $100,000'
        });
      }

      if (monto_solicitado > 50000000) {
        return res.status(400).json({
          success: false,
          error: 'El monto máximo es $50,000,000'
        });
      }

      // Validar plazo
      if (plazo_meses < 6 || plazo_meses > 60) {
        return res.status(400).json({
          success: false,
          error: 'El plazo debe estar entre 6 y 60 meses'
        });
      }

      // ====================================
      // PASO 3: CREAR SOLICITUD
      // ====================================
      const nuevoCredito = await CreditoModel.create({
        cliente_id,
        monto_solicitado,
        plazo_meses,
        tasa_interes
      });

      res.status(201).json({
        success: true,
        message: 'Solicitud de crédito creada exitosamente',
        data: {
          ...nuevoCredito,
          cliente: {
            nombre: `${cliente.nombre} ${cliente.apellido}`,
            cedula: cliente.cedula
          }
        }
      });
    } catch (error) {
      console.error('Error al crear crédito:', error);

      // Manejo especial si el MS-Clientes no está disponible
      if (error.message === 'Microservicio de Clientes no disponible') {
        return res.status(503).json({
          success: false,
          error: 'Servicio temporalmente no disponible. Intente nuevamente.'
        });
      }

      res.status(500).json({
        success: false,
        error: 'Error al crear crédito'
      });
    }
  },

  /**
   * ============================================
   * PUT /api/creditos/:id/aprobar
   * ============================================
   * Aprobar un crédito
   *
   * LÓGICA DE APROBACIÓN:
   * - Montos < $5M: Aprobación automática
   * - Montos >= $5M: Requiere análisis (simulado aquí)
   */
  async aprobarCredito(req, res) {
    try {
      const { id } = req.params;

      // Verificar que el crédito existe
      const credito = await CreditoModel.findById(id);

      if (!credito) {
        return res.status(404).json({
          success: false,
          error: 'Crédito no encontrado'
        });
      }

      // Verificar que está en estado pendiente
      if (credito.estado !== 'pendiente') {
        return res.status(400).json({
          success: false,
          error: `El crédito ya está ${credito.estado}`
        });
      }

      // ====================================
      // LÓGICA DE APROBACIÓN
      // ====================================
      // En producción aquí irían:
      // - Score crediticio
      // - Historial de pagos
      // - Capacidad de pago
      // - Validaciones con centrales de riesgo

      const creditoAprobado = await CreditoModel.updateEstado(id, 'aprobado', null);

      res.status(200).json({
        success: true,
        message: 'Crédito aprobado exitosamente',
        data: creditoAprobado
      });
    } catch (error) {
      console.error('Error al aprobar crédito:', error);
      res.status(500).json({
        success: false,
        error: 'Error al aprobar crédito'
      });
    }
  },

  /**
   * ============================================
   * PUT /api/creditos/:id/rechazar
   * ============================================
   * Rechazar un crédito con motivo
   */
  async rechazarCredito(req, res) {
    try {
      const { id } = req.params;
      const { motivo } = req.body;

      if (!motivo) {
        return res.status(400).json({
          success: false,
          error: 'Debe proporcionar un motivo de rechazo'
        });
      }

      const credito = await CreditoModel.findById(id);

      if (!credito) {
        return res.status(404).json({
          success: false,
          error: 'Crédito no encontrado'
        });
      }

      if (credito.estado !== 'pendiente') {
        return res.status(400).json({
          success: false,
          error: `El crédito ya está ${credito.estado}`
        });
      }

      const creditoRechazado = await CreditoModel.updateEstado(id, 'rechazado', motivo);

      res.status(200).json({
        success: true,
        message: 'Crédito rechazado',
        data: creditoRechazado
      });
    } catch (error) {
      console.error('Error al rechazar crédito:', error);
      res.status(500).json({
        success: false,
        error: 'Error al rechazar crédito'
      });
    }
  },

  /**
   * ============================================
   * DELETE /api/creditos/:id
   * ============================================
   * Eliminar un crédito (solo si está pendiente)
   */
  async deleteCredito(req, res) {
    try {
      const { id } = req.params;

      const credito = await CreditoModel.findById(id);

      if (!credito) {
        return res.status(404).json({
          success: false,
          error: 'Crédito no encontrado'
        });
      }

      // Solo se pueden eliminar créditos pendientes
      if (credito.estado !== 'pendiente') {
        return res.status(400).json({
          success: false,
          error: 'Solo se pueden eliminar créditos en estado pendiente'
        });
      }

      await CreditoModel.remove(id);

      res.status(200).json({
        success: true,
        message: 'Crédito eliminado exitosamente'
      });
    } catch (error) {
      console.error('Error al eliminar crédito:', error);
      res.status(500).json({
        success: false,
        error: 'Error al eliminar crédito'
      });
    }
  }
};

module.exports = CreditosController;
