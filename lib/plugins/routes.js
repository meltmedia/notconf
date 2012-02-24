/**
 *
 * Routes
 *
 * Copyright(c) 2012 meltmedia <notconf@meltmedia.com>
 * MIT LICENSE
 *
 */

var path = require('path'),
    director = require('director'),
    routes = {},
    router, app;

function getRoot() {
  this.res.writeHead(200, {"Content-Type": "text/html"});
  this.res.end(app.render('index'));
}

function getDetails() {
  this.res.writeHead(200, {"Content-Type": "text/html"});
  this.res.end(app.render('details'));
}

function getSchedule() {
  this.res.writeHead(200, {"Content-Type": "text/html"});
  this.res.end(app.render('schedule'));
}

function getRegister() {
  this.res.writeHead(200, {"Content-Type": "text/html"});
  this.res.end(app.render('register'));
}

function getRegisterSponsor() {
  this.res.writeHead(200, {"Content-Type": "text/html"});
  this.res.end(app.render('register/sponsor'));
}

function getRegisterVolunteer() {
  this.res.writeHead(200, {"Content-Type": "text/html"});
  this.res.end(app.render('register/volunteer'));
}

function getRegisterSpeaker() {
  this.res.writeHead(200, {"Content-Type": "text/html"});
  this.res.end(app.render('register/speaker'));
}

exports.name = "routes";

exports.attach = function(options) {
  app = this;

  app.router.get('/', getRoot);

  app.router.get('/details', getDetails);
  app.router.get('/schedule', getSchedule);
  app.router.get('/register', getRegister);
  app.router.get('/register/sponsor', getRegisterSponsor);
  app.router.get('/register/volunteer', getRegisterVolunteer);
  app.router.get('/register/speaker', getRegisterSpeaker);

};