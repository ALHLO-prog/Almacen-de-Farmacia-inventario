import mysql from "mysql2/promise";

config = {
    host : "",
    port: "3306",
    user : "root",
    password: "",
    database: "inventario_farmacia_hlo"
}

const connection = await mysql.createConnection(config)

return connection