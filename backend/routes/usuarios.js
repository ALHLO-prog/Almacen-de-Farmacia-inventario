import express from "express"
import db from "../module/dbconnection.js"

const router = express.Router()

router.get("/", async (req,res) => {
    try {
        const usuarios = await db('usuarios').select('*');
    res.json(usuarios);
    } catch(e) {
        res.status(500).json({ mensaje: "Error al obtener medicamentos" });
    }
})

export default router