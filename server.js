"use strict";

const http = require("http");
const pdf2pic = require("pdf2pic");

const port = 3000;
const outputPath = "./image.jpeg";

const server = http.createServer((req, res) => {

  let body = "<h1>Hello World</h1>";
  
  req.on("data", (chunk) => {
    body += chunk;
  })
  .on("end", () => {
    res.on("error", err => console.error(err));
    
    res.statusCode = 200;
    res.setHeader("Content-Type", "Image/Base64");
    
    const { headers, method, url } = req;

    const output = pdf2pic.fromBase64(body).bulk(1, true);

    res.end(output);
  });
}).listen(port);