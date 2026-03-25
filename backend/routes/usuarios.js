import express from "express"
import db from "../dbconnection.js"

const router = express.Router()

router.get("/:ci", async (req,res) => {
    try {
        const { ci } = req.params;
        const usuarios = await db('usuarios').where({ ci }).first();
    res.json(usuarios);
    } catch(e) {
        res.status(500).json({ mensaje: "Error al obtener usuario" });
    }
})

router.delete("/del/:ci", async (req,res) => {
    try {
        const { ci } = req.params;
        const usuarios = await db('usuarios').where({ ci }).del();
    res.json({ mensaje: 'Usuario eliminado exitosamente' });
    } catch(e) {
        res.status(500).json({ mensaje: "Error al eliminar usuario" });
    }
})

export default router