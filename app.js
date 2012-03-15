/**
 *
 * Copyright(c) 2012 meltmedia <notconf@meltmedia.com>
 * MIT LICENSE
 *
 */

var flatiron = require('flatiron'),
    path = require('path'),
    routes = require('./lib/plugins/routes'),
    handlebarsPlugin = require('./lib/plugins/handlebars'),
    connect = require('connect'),
    expressUglify = require('express-uglify'),
    pkg = require('./package.json'),
    app = flatiron.app;

app.config.file({ file: path.join(__dirname, 'config', 'config.json') });

var port = app.config.get('port');

app.use(flatiron.plugins.http, {

  /*
   * Middleware
   */
  before: [
    expressUglify.middleware({
      src: __dirname + '/public',
      logLevel: 'info',
      loggerL: app.log
    }),
    connect.static(__dirname + '/public', {maxAge: 86400000}),
    connect.staticCache()
  ],

  after: [
    // Add post-response middleware here
  ],

  onError: function(err) {
    if(err) {
      this.res.writeHead(404, { "Content-Type": "text/html" });
      this.res.end(app.render('404'));
    }
  }

});

app.use(handlebarsPlugin, {
          templates: __dirname + "/templates",
          defaultLayout: 'layout',
          blockHelpers: require('./lib/blockHelpers'),
          cacheTemplates: true
        });
app.use(routes);

app.start(port,
  function(err) {
    if(err) throw err;
    app.log.info("      name :", pkg.name);
    app.log.info("   version :", pkg.version);
    app.log.info("started at :", Date());
    app.log.info("   on port :", port);
    app.log.info("   in mode :", app.env);
  });
