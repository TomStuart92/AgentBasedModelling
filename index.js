var http = require('http');
var fs = require('fs');

this.server = http.createServer(function(req, res) {
  if (req.url === '/') {
    fs.readFile('./index.html', function (err, html) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(html);
      res.end();
    });
  }
  else if (req.url === '/data') {
    fs.readFile('./data/data.csv', function (err, txt) {
      res.writeHead(200, {'Content-Type': 'text'});
      res.write(txt);
      res.end();
    });
  }
  else if (req.url === '/lib/jquery-csv.js') {
    fs.readFile('./lib/jquery-csv.js', function (err, txt) {
      res.writeHead(200, {'Content-Type': 'application/javascript'});
      res.write(txt);
      res.end();
    });
  }
  else if (req.url === '/lib/agent.js') {
    fs.readFile('./lib/agent.js', function (err, txt) {
      res.writeHead(200, {'Content-Type': 'application/javascript'});
      res.write(txt);
      res.end();
    });
  }
  else if (req.url === '/lib/agentFactory.js') {
    fs.readFile('./lib/agentFactory.js', function (err, txt) {
      res.writeHead(200, {'Content-Type': 'application/javascript'});
      res.write(txt);
      res.end();
    });
  }
  else if (req.url === '/lib/agentManager.js') {
    fs.readFile('./lib/agentManager.js', function (err, txt) {
      res.writeHead(200, {'Content-Type': 'application/javascript'});
      res.write(txt);
      res.end();
    });
  }
  else {
    res.writeHead(404);
    res.end();
  }
});

exports.listen = function() {
  this.server.listen.apply(this.server, arguments);
};

exports.close = function(callback) {
  this.server.close(callback);
};
