import express from "express"
import usuarioRoutes from "./routes/usuarios.js"
import authRoutes from "./routes/auth.js"

const app = express();
app.use(express.json());



app.use("/", usuarioRoutes)
app.use("/auth", authRoutes)

app.listen(4444, () => {
    console.log("server in http://localhost:4444")
    
})