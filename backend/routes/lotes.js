import express from 'express'
import db from '../dbconnection.js'

const router = express.Router()

router.get('/med/:id', async (req, res) => {
  try {
    const { id } = req.params

    if (!id || isNaN(id)) {
      return res.status(400).json({ error: 'ID de medicamento no válido' })
    }

    const lotes = await db('lotes')
      .where('medicamento_id', id)
      .orderBy('vencimiento', 'asc')
    // Los que vencen pronto primero
    res.json(lotes)
  } catch (e) {
    res
      .status(500)
      .json({ error: 'Error al obtener lotes para el medicamento' })
  }

  router.post('/add', async (req, res) => {
    try {
      const { medicamento_id, codigo, concentracion, cantidad } = req.body
      let vencimiento = req.body.vencimiento

      if (vencimiento && vencimiento.length === 7) vencimiento += '-01'

      const [id] = await db('lotes').insert({
        medicamento_id,
        concentracion,
        codigo,
        cantidad,
        vencimiento
      })

      res.status(201).json({
        mensaje: 'Lote registrado con éxito',
        data: {
          id,
          medicamento_id,
          codigo,
          concentracion,
          cantidad,
          vencimiento
        }
      })
    } catch (e) {
      res.status(500).json({ error: 'Error al registrar el lote' })
    }

    router.put('/update-stock/:loteId', async (req, res) => {
      try {
        const { loteId } = req.params
        const { cambio } = req.body // Ejemplo: 10 para sumar, -5 para restar

        // Usamos .increment de Knex que es más seguro para concurrencia
        await db('lotes').where('id', loteId).increment('cantidad', cambio)

        const loteActualizado = await db('lotes').where('id', loteId).first()

        res.json({
          mensaje: 'Stock actualizado',
          nuevo_stock: loteActualizado.cantidad
        })
      } catch (e) {
        res.status(500).json({ error: e.message })
      }
    })
  })
})

export default router
