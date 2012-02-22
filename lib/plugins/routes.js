var path = require('path'),
    director = require('director'),
    routes = {},
    router;

function getRoot() {
  this.res.writeHead(200, {'Content-Type': 'text/html'});
  this.res.end('some html');
}

exports.name = "routes";

exports.attach = function(options) {
  var app = this;

  app.router.get("/", getRoot);

};