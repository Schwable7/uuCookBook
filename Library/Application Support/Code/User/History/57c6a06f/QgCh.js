const http = require("node:http")
const counter = 0

function main(req, res){
    console.log("Ahoj")
    res.end(counter)
}
const server = http.createServer(main)
server.listen(8080)

