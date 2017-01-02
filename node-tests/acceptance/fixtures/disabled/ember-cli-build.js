/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var options = {
    'ember-web-app': {
      enabled: false
    }
  };

  var app = new EmberApp(defaults, options);

  return app.toTree();
};
