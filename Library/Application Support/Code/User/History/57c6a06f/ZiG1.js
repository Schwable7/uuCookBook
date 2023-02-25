const http = require("node:http")

function main(){
    console.log("Ahoj")
}
const server = http.createServer(main)
server.listen(8080)
