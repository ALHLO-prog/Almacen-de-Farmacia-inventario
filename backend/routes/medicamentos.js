import express from 'express'
import db from '../dbconnection.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const medicamentos = await db('medicamentos').select('*')
    res.json(medicamentos)
  } catch (e) {
    res.status(500).json({ mensaje: 'Error al obtener medicamentos' })
  }
})

router.get('/search', async (req, res) => {
  try {
    const { nombre, tipo } = req.query
    let query = db('medicamentos')

    if (nombre) {
      query = query.where('nombre', 'like', `%${nombre}%`)
    }

    if (tipo) {
      query = query.where({ tipo })
    }

    const resultados = await query.select('*')
    res.json(resultados)
  } catch (e) {
    res.status(500).json({ mensaje: 'Error en la búsqueda' })
  }
})

router.post('/add', async (req, res) => {
  try {
    const { nombre, tipo, alt_nombre } = req.body 

    const [idGenerado] = await db('medicamentos').insert({
      nombre,
      tipo,
      alt_nombre
    })

    const objetoParaSocket = {
      id: idGenerado,
      nombre: nombre,
      tipo: tipo,
      alt_nombre: alt_nombre
    } 
    req.io.emit('nuevo_medicamento_añadido', objetoParaSocket) 

    res.status(201).json({
      mensaje: 'Medicamento registrado con éxito',
      data: objetoParaSocket
    }) 
  } catch (e) {
    console.error(e) 
    res.status(500).json({ mensaje: 'Error al guardar medicamento' })
  }
})

export default router
