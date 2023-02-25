const http = require("node:http")
const url = require("node:url")
let counter = 0


function main(req, res){
    const pathname = url.parse(req.url).pathname;
    console.log(pathname);
    let s = "";
    s += "<html>";
    s += "<head>";
    s += "<body>";
    s += "<p>Ahoj</p>";
    s += "</body>";
    s += "</html>";

    if(pathname==="/"){
        res.setHeader('Countent-Type','text/plain')
        res.end(s);
    }
       else if(pathname==="/counter") {
        counter += 1;
        res.end(counter.toString())
        else if(pathname==="/favicon.ico") {
            counter += 1;
            res.end(counter.toString())
       } else {
        res.end("404")
    }

}
const server = http.createServer(main);
server.listen(8080)

