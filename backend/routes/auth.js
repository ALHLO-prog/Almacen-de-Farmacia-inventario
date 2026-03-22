import Router from "express"
import db from "../module/dbconnection.js";

const router = Router()

router.get('/', async (res) => {
  const solicitudes = await db('solicitud_registro').select('*')
  res.json(solicitudes)
})

router.get('/request/:name/:ci', async (req, res) => {   //pasar los parametros a body
  try {
    const { name, ci } = req.params;
  
    await db('solicitud_registro').insert({
      nombre : name,
      ci: ci
    })
    
    res.json({ mensaje: "debe esperar a que su su usuario se aprobado" });
  }
  catch(e) {
    res.status(500).json('Ocurrió algo inesperado');
  }

})

router.post('/register/:id', async (req, res) => {
  const { id } = req.params; 
  const { contraseña, cargo } = req.body; 

  try {
    await db.transaction(async (trx) => {
      const solicitud = await trx('solicitudes_registro').where({ id }).first();

      if (!solicitud) {
        throw new Error('La solicitud no existe');
      }

      await trx('usuarios').insert({
        ci: solicitud.ci,
        nombre: solicitud.nombre,
        contraseña: contraseña, // usar bcrypt después
        cargo: cargo
      });

      await trx('solicitudes_registro').where({ id }).del();
    });

    res.json({ mensaje: "Usuario aprobado y cuenta creada con éxito" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router