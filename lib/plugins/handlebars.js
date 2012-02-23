var handlebars = require("handlebars"),
    path = require('path'),
    yaml = require('js-yaml'),
    fs = require('fs'),
    _ = require('underscore'),

    templatePath, defaultLayoutPath, app;

exports.name = "handlebarsPlugin";

exports.attach = function(options) {
  app = this;
  app.handlebars = handlebars;
  app.render = renderTemplate;

  if(!options.hasOwnProperty('templates')) {
    throw new Error("Handlebars Plugin is missing a path to the template directory.");
    process.exit(1);
  }

  templatePath = options.templates;
  defaultLayoutPath = options.defaultLayout;

  // Register the helpers
  for(var key in options.blockHelpers) {
    handlebars.registerHelper(key, options.blockHelpers[key]);
  }

};

exports.init = function(done) {
  return done();
};

function getTemplate(filePath) {

  var filePath = path.join(templatePath, filePath+".hbs"),
      exists = path.existsSync(filePath);
  if(exists) {
    return fs.readFileSync(filePath, 'utf8');
  }

  return "";
}

function renderTemplate(bodyPath, layoutPath, context) {

  var layoutSrc = getTemplate((layoutPath || defaultLayoutPath)),
      layout    = handlebars.compile(layoutSrc),
      bodySrc   = getTemplate(bodyPath),
      body;

  context = context || {};

  var match = /^\s*([\-\#][\-\#][\-\#]+) ?(\w*)\s*/.exec(bodySrc);
  if(match) {

    var seperator = match[1],
        a = match[0].length,
        b = bodySrc.indexOf("\n"+seperator,a)+1,
        c = b+3,
        head = bodySrc.substring(a, b),
        bd = bodySrc.substring(c);

    context = _.extend(context, yaml.load(head));
    bodySrc = bd;

  }

  body = handlebars.compile(bodySrc);
  context.body = body(context);

  return layout(context);

}