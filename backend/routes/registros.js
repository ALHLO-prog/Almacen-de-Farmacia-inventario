import express from 'express'
import db from '../dbconnection.js'

const router = express.Router()

router.post('/aceptar-pedido', async (req, res) => {
  const { movimientos } = req.body

  try {
    await db.transaction(async (trx) => {
      // 1. Verificamos que el pedido exista y esté pendiente
      await Promise.all(
        movimientos.map(async (mov) => {
          const pedido = await trx('pedidos').where('id', mov.id).first()
          if (!pedido) throw new Error('Pedido no encontrado.')
          if (pedido.estado === 'completado')
            throw new Error('Este pedido ya fue procesado.')
        })
      )

      // 2. Procesamos todos los movimientos en paralelo
      await Promise.all(
        movimientos.map(async (mov) => {
          const diferencia = (mov.entrada || 0) - (mov.salida || 0)
          // Buscamos el lote para obtener el código actual
          const loteActual = await trx('lotes').where('id', mov.lote_id).first()
          const medicamentoActual = await trx('medicamentos')
            .where('id', mov.medicamento_id)
            .first()
          if (!loteActual) throw new Error(`Lote ${mov.lote_id} no existe.`)
          if (loteActual.cantidad + diferencia < 0)
            throw new Error(
              `No hay suficiente stock de ${medicamentoActual.nombre} en el lote ${loteActual.codigo} para procesar este movimiento.`
            )

          // Insertamos registro histórico
          await trx('registros').insert({
            medicamento_id: mov.medicamento_id,
            usuario_id: mov.usuario_id,
            lote_id: mov.lote_id,
            lote_codigo: loteActual.codigo,
            fecha: mov.fecha ? new Date(mov.fecha) : new Date(),
            entrada: mov.entrada || 0,
            salida: mov.salida || 0,
            nota: mov.nota || ''
          })

          // Actualizamos stock del lote
          if (diferencia !== 0) {
            await trx('lotes')
              .where('id', mov.lote_id)
              .increment('cantidad', diferencia)
          }
        })
      )
      // 3. Marcamos el pedido como completado para "bloquearlo"
      await Promise.all(
        movimientos.map(async (mov) => {
          await trx('pedidos')
            .where('id', mov.id)
            .update({ estado: 'completado' })
        })
      )
    })

    res
      .status(200)
      .json({ mensaje: 'Pedido procesado y stock actualizado correctamente.' })
  } catch (e) {
    console.error(e)
    res.status(400).json({ error: e.message })
  }
})

router.post('/movimiento-directo', async (req, res) => {
  const { medicamento_id, usuario_id, lote_id, entrada, salida, nota } =
    req.body

  const diferencia = (entrada || 0) - (salida || 0)

  try {
    await db.transaction(async (trx) => {
      // 1. Obtener información del lote para el código y validar existencia
      const loteActual = await trx('lotes').where('id', lote_id).first()
      if (!loteActual) throw new Error('El lote especificado no existe.')
      if (loteActual.cantidad + diferencia < 0)
        throw new Error('No hay suficiente stock para realizar esta salida.')

      // 3. Insertar el registro histórico
      await trx('registros').insert({
        medicamento_id,
        usuario_id,
        lote_id,
        lote_codigo: loteActual.codigo,
        fecha: new Date(),
        entrada: entrada,
        salida: salida,
        nota: nota || `Ajuste manual de ${tipo}`
      })

      // 4. Actualizar el stock en la tabla 'lotes'
      if (diferencia !== 0) {
        await trx('lotes')
          .where('id', lote_id)
          .increment('cantidad', diferencia)
      }
    })

    res
      .status(201)
      .json({ mensaje: 'Movimiento registrado y stock actualizado con éxito' })
  } catch (e) {
    console.error('Error en movimiento directo:', e)
    res
      .status(500)
      .json({ error: 'No se pudo procesar el movimiento', detalle: e.message })
  }
})

router.get('/', async (req, res) => {
  try {
    const registros = await db('registros')
      .join('medicamentos', 'registros.medicamento_id', '=', 'medicamentos.id') // 2da imagen
      .join('lotes', 'registros.lote_id', '=', 'lotes.id')
      .join('usuarios', 'registros.usuario_id', '=', 'usuarios.ci')
      .select(
        'registros.id',
        'registros.fecha',
        'registros.entrada',
        'registros.salida',
        'registros.nota',
        'medicamentos.nombre as medicamento_nombre', // Tomas el nombre del medicamento
        'medicamentos.tipo',
        'lotes.codigo as codigo_lote',
        'usuarios.nombre as nombre_usuario' // Tomas el nombre del usuario
      )
      .orderBy('registros.fecha', 'desc')
    res.status(200).json(registros)
  } catch (e) {
    console.error('Error al obtener registros:', e)
    res
      .status(500)
      .json({
        error: 'No se pudieron obtener los registros',
        detalle: e.message
      })
  }
})

export default router
