const http = require("node:http")
const path = require('node:path');
const fs = require('node:fs');
const url = require('node:url');
const simpleText = require("./module");
const custLog = require("./customLog");
const person = require("./person");
const common = require("./common");
const employee = require("./employees");
const operation = require("./operation");
const task04 = require("./tasks/task04");
const task05 = require("./tasks/task05");
const task06 = require("./tasks/task06");

let counter = 0;
let employees = {};

function main(req, res) {
    const pathname = url.parse(req.url).pathname;

    if (req.method === 'GET' && pathname === '/favicon.ico') {
        
        res.setHeader('Content-Type', 'image/x-icon');
        var FAVICON = path.join(__dirname, 'public', 'favicon.ico');
        fs.createReadStream(FAVICON).pipe(res);
    
    } else if (req.method === 'GET' && pathname === '/') {
    
        res.writeHead(200, {
            "Content-type":"text/html"
          })
        let s = simpleText
        custLog.info("Muj prvni log")
        res.end(s)
    
    } else if (req.method === 'GET' && pathname === '/counter') {
    
        custLog.info("Muj prvni log")  
        res.writeHead(200, {
          "Content-type":"text/html"
        })
        res.end(counter.toString)
    
    } else if (req.method === 'GET' && pathname === '/getEmployees') {
      
        res.writeHead(200, {
          "Content-type":"text/html; charset=utf-8",
        })
        employees =  employee.getEmployees(common.dtoIn, common.people)
        let s = JSON.stringify(employees)      
        res.end(s)

    } else if (req.method === 'GET' && pathname === '/getAverage') {
        
        res.writeHead(200, {
          "Content-type":"text/html; charset=utf-8"
        })
        let s = operation.getAverage(employees);       
        res.end(s)

    } else if (req.method === 'GET' && pathname === '/') {
        res.writeHead(200, {
            "Content-type":"text/html"
          })
        let s = simpleText
        custLog.info("Muj prvni log")
        res.end(s)
    
      } else {
        
        res.end("404")
    
      }

    
    
}

const server = http.createServer(main)
server.listen(8080)