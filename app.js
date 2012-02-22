var flatiron = require('flatiron'),
    path = require('path'),
    routes = require('./lib/plugins/routes'),
    connect = require('connect'),
    app = flatiron.app;

var port = 3000;

app.config.file({ file: path.join(__dirname, 'config', 'config.json') });

app.use(flatiron.plugins.http, {

  /*
   * Middleware
   */
  before: [
    connect.static(__dirname + '/public')
  ],

  after: [
    // Add post-response middleware here
  ]

});

app.use(routes);

app.start(port,
  function(err) {
    if(err) throw err;
    app.log.info("NotConf Website Version 0.0.1");
    app.log.info("started at :", Date());
    app.log.info("   on port :", port);
    app.log.info("   in mode :", app.env);
  });
