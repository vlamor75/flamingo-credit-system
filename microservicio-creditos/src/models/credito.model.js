const pool =
  require('../config/database');

  /**
   * Modelo de Crédito
   * Maneja operaciones de base de datos
   para créditos
   */
  const CreditoModel = {
    /**
     * Obtener todos los créditos
     */
    async findAll() {
      try {
        const query = `
          SELECT c.*,
                 cl.nombre || ' ' ||
  cl.apellido as nombre_cliente,
                 cl.cedula
          FROM creditos c
          LEFT JOIN clientes cl ON
  c.cliente_id = cl.id
          ORDER BY c.created_at DESC
        `;
        const result = await
  pool.query(query);
        return result.rows;
      } catch (error) {
        throw error;
      }
    },

    /**
     * Buscar crédito por ID
     */
    async findById(id) {
      try {
        const query = `
          SELECT c.*,
                 cl.nombre || ' ' ||
  cl.apellido as nombre_cliente,
                 cl.cedula
          FROM creditos c
          LEFT JOIN clientes cl ON
  c.cliente_id = cl.id
          WHERE c.id = $1
        `;
        const result = await
  pool.query(query, [id]);
        return result.rows[0] || null;
      } catch (error) {
        throw error;
      }
    },

    /**
     * Buscar créditos por cliente
     */
    async findByCliente(clienteId) {
      try {
        const query = `
          SELECT * FROM creditos
          WHERE cliente_id = $1
          ORDER BY created_at DESC
        `;
        const result = await
  pool.query(query, [clienteId]);
        return result.rows;
      } catch (error) {
        throw error;
      }
    },

    /**
     * Crear nueva solicitud de crédito
     */
    async create(creditoData) {
      try {
        const {
          cliente_id,
          monto_solicitado,
          plazo_meses,
          tasa_interes
        } = creditoData;

        const query = `
          INSERT INTO creditos (
            cliente_id,
            monto_solicitado,
            plazo_meses,
            tasa_interes,
            estado
          )
          VALUES ($1, $2, $3, $4,
  'pendiente')
          RETURNING *
        `;

        const values = [cliente_id,
  monto_solicitado, plazo_meses,
  tasa_interes];
        const result = await
  pool.query(query, values);

        return result.rows[0];
      } catch (error) {
        throw error;
      }
    },

    /**
     * Actualizar estado del crédito
  (aprobar/rechazar)
     */
    async updateEstado(id, estado,
  motivoRechazo = null) {
      try {
        const query = `
          UPDATE creditos
          SET estado = $1,
              motivo_rechazo = $2,
              updated_at =
  CURRENT_TIMESTAMP
          WHERE id = $3
          RETURNING *
        `;

        const values = [estado,
  motivoRechazo, id];
        const result = await
  pool.query(query, values);

        return result.rows[0];
      } catch (error) {
        throw error;
      }
    },

    /**
     * Eliminar crédito
     */
    async remove(id) {
      try {
        const query = 'DELETE FROM creditos WHERE id = $1 RETURNING *';
        const result = await
  pool.query(query, [id]);
        return result.rows[0];
      } catch (error) {
        throw error;
      }
    }
  };

  module.exports = CreditoModel;