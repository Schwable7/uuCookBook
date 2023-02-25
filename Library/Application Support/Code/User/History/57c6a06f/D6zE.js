const http = require("node:http")
const counter = 0

function main(req, res){
    console.log("Ahoj")
    counter += 1 
    res.end(counter.toString())
}
const server = http.createServer(main)
server.listen(8080)

