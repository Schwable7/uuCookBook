const http = require("node:http")
const url = require("node:url")
const path = require('node:path')
const fs = require('node:fs')
let counter = 0


function main(req, res)
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
            res.setHeader('Content-Type', 'image/x-icon');
        var FAVICON = path.join(__dirname, '', 'favicon.ico');
        fs.createReadStream(FAVICON).pipe(res);
       } else {
        res.end("404")
    }

}
const server = http.createServer(main);
server.listen(8080)

