import Router from 'express'
import db from '../dbconnection.js'
import bcrypt from 'bcrypt'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const solicitudes = await db('solicitud_registro').select('*')
    res.json(solicitudes)
  } catch (e) {
    res.status(500).json({ mensaje: 'ocurrió algo inesperado' })
  }
})

router.post('/request', async (req, res) => {
  try {
    const { nombre, ci, contraseña } = req.body
    const saltRounds = 10
    const hash = await bcrypt.hash(contraseña, saltRounds)
    const comprobarSolicitud = await db('solicitud_registro')
      .where({ ci })
      .first()
    if (!comprobarSolicitud) {
      await db('solicitud_registro').insert({
        nombre: nombre,
        ci: ci,
        contraseña: hash
      })

      req.io.emit('nueva_solicitud', {
        nombre: nombre,
        ci: ci
      })

      res.json({ mensaje: 'debe esperar a que su usuario se aprobado' })
    } else {
      throw new Error('Ya existe una solicitud con esta CI')
    }
  } catch (e) {
    console.log(e.message)
    if (e) res.status(400).json({ mensaje: e.message })
    else res.status(500).json({ mensaje: 'Ocurrió algo inesperado' })
  }
})

router.post('/register', async (req, res) => {
  const { cargo, ci } = req.body

  try {
    await db.transaction(async (trx) => {
      const comprobarUsuario = await trx('usuarios').where({ ci }).first()
      if (!comprobarUsuario) {
        const solicitud = await trx('solicitud_registro').where({ ci }).first()
        if (!solicitud) {
          throw new Error('La solicitud no existe')
        }

        await trx('usuarios').insert({
          ci: solicitud.ci,
          nombre: solicitud.nombre,
          cargo: cargo,
          contraseña: solicitud.contraseña
        })
        await trx('solicitud_registro').where({ id: solicitud.id }).del()
      } else {
        throw new Error('El usuario ya existe')
      }
    })

    res.json({ mensaje: 'Usuario aprobado y cuenta creada con éxito' })
  } catch (error) {
    res.status(500).json({ mensaje: error.message })
  }
})

export default router
