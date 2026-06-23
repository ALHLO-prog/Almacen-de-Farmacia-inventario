import express from 'express'
import usuarioRoutes from './routes/usuarios.js'
import authRoutes from './routes/auth.js'
import medsRoutes from './routes/medicamentos.js'
import lotesRoutes from './routes/lotes.js'
import pedidosRoutes from './routes/pedidos.js'
import registrosRoutes from './routes/registros.js'
import { createServer } from 'http'
import { Server } from 'socket.io'
import cors from 'cors'

const app = express()
const httpServer = createServer(app)

const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:5173', //colocar la URL del front en produccion
    methods: ['GET', 'POST']
  }
})

app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())
app.use((req, res, next) => {
  req.io = io
  next()
})
app.use('/usuario', usuarioRoutes)
app.use('/auth', authRoutes)
app.use('/med', medsRoutes)
app.use('/lote', lotesRoutes)
app.use('/pedido', pedidosRoutes)
app.use('/registro', registrosRoutes)

io.on('connection', (socket) => {
  console.log('Un usuario se conecto', socket.id)
  socket.on('disconnect', () => {
    console.log('Usuario desconectado')
  })
})

httpServer.listen(process.env.API_PORT || 3000, () => {
  console.log('server in http://127.0.0.1:' + (process.env.API_PORT || 3000))
})
