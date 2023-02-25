const http = require("node:http")

function main(req, res){
    console.log("Ahoj")
    res.end("Cau")
}
const server = http.createServer(main)
server.listen(8080)

