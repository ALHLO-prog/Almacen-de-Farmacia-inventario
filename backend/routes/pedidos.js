import express from 'express'
import db from '../dbconnection.js'

const router = express.Router()

router.get('/por-fecha', async (req, res) => {
  // Recibimos la fecha por query string: /pedidos/por-fecha?dia=2026-03-26
  const { dia } = req.query

  try {
    const query = db('pedidos')
      // Unimos con medicamentos para obtener el nombre
      .join('medicamentos', 'pedidos.medicamento_id', '=', 'medicamentos.id')
      // Unimos con usuarios (usando la columna 'ci' que vimos en tu esquema)
      .join('usuarios', 'pedidos.usuario_id', '=', 'usuarios.ci')
      .select(
        'pedidos.*',
        'medicamentos.nombre as nombre_medicamento',
        'usuarios.nombre as nombre_usuario'
      )
      .orderBy('pedidos.fecha', 'desc')

    // Si el usuario envió un día específico, filtramos la consulta
    if (dia) {
      query.where('pedidos.fecha', dia)
    }

    const pedidos = await query

    if (pedidos.length === 0) {
      return res
        .status(404)
        .json({ mensaje: 'No se encontraron pedidos en esta fecha' })
    }

    res.json(pedidos)
  } catch (e) {
    console.error('Error al obtener pedidos por fecha:', e)
    res
      .status(500)
      .json({ error: 'Error interno del servidor', detalle: e.message })
  }
})

router.post('/add-bulk', async (req, res) => {
  // Se espera un array: { "items": [ {...}, {...} ] }
  const { items, usuario_id } = req.body

  if (!Array.isArray(items) || items.length === 0) {
    return res
      .status(400)
      .json({ error: 'Se requiere un array de items para el pedido' })
  }

  try {
    await db.transaction(async (trx) => {
      // Usamos .map para procesar la lista y Promise.all para la ejecución
      await Promise.all(
        items.map(async (item) => {
          // Buscamos el lote para obtener el código actual y asegurar que existe
          const loteActual = await trx('lotes')
            .where('id', item.lote_id)
            .first()

          if (!loteActual) {
            throw new Error(`El lote con ID ${item.lote_id} no es válido.`)
          }

          // Insertamos cada item en la tabla pedidos
          await trx('pedidos').insert({
            usuario_id: usuario_id,
            medicamento_id: item.medicamento_id,
            lote_id: item.lote_id,
            lote_codigo: loteActual.codigo,
            cantidad: item.cantidad,
            // Si el item trae fecha la usamos, si no, la del momento
            fecha: item.fecha ? new Date(item.fecha) : new Date(),
            estado: 'pendiente' // Estado inicial para aprobación posterior
          })
        })
      )
    })

    res
      .status(201)
      .json({ mensaje: 'Pedido creado exitosamente en estado pendiente' })
  } catch (e) {
    console.error('Error al crear pedido masivo:', e)
    res.status(500).json({
      error: 'No se pudo crear la lista de pedidos',
      detalle: e.message
    })
  }
})

export default router
