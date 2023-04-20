const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

http.createServer(function (req, res) {
  const q = url.parse(req.url, true);
  const filename = "." + (q.pathname === "/"?  "/index.html" : q.pathname )

  fs.readFile(filename, function(err, data) {
    if (err) {
      fs.readFile('404.html', function(err, data){
        if (err) {
          res.writeHead(404, {'Content-Type': 'text/plain'});
          res.write("404 Not Found");
          res.end(); // send the response here
        } else {
          res.writeHead(404, {'Content-Type': 'text/html'});
          res.write(data);
          res.end(); // send the response here
        }
      })
    } else {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end(); // send the response here
    }
  });
}).listen(8080);
