import { createServer } from "node:http"


const server = createServer((req, res) => {
    console.log("jij")
    res.end("hi")
})

server.listen(4444, () => {
    console.log("server in http://localhost:4444")

})