var path = require('path'),
    director = require('director'),
    routes = {},
    router, app;

function getRoot() {
  this.res.writeHead(200, {"Content-Type": "text/html"});
  this.res.end(app.render('index'));
}

exports.name = "routes";

exports.attach = function(options) {
  app = this;

  app.router.get("/", getRoot);

};