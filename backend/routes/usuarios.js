import express from 'express'
import db from '../dbconnection.js'
import bcrypt from 'bcrypt'

const router = express.Router()

router.get('/:ci', async (req, res) => {
  try {
    const { ci } = req.params
    const usuarios = await db('usuarios').where({ ci }).first()
    res.json(usuarios)
  } catch (e) {
    res.status(500).json({ mensaje: 'Error al obtener usuario' })
  }
})

router.post('/login', async (req, res) => {
  const { ci, contraseña } = req.body

  try {
    const usuario = await db('usuarios').where({ ci }).first()
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' })
    }

    const passwordCorrecto = await bcrypt.compare(
      contraseña,
      usuario.contraseña
    )
    if (passwordCorrecto) {
      const { contraseña: _, ...datosUsuario } = usuario
      res.json({
        usuario: datosUsuario
      })
    } else {
      res.status(401).json({ mensaje: 'Contraseña incorrecta' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ mensaje: 'Error interno del servidor' })
  }
})

router.delete('/del/:ci', async (req, res) => {
  try {
    const { ci } = req.params
    const usuarios = await db('usuarios').where({ ci }).del()
    res.json({ mensaje: 'Usuario eliminado exitosamente' })
  } catch (e) {
    res.status(500).json({ mensaje: 'Error al eliminar usuario' })
  }
})

export default router
