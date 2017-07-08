/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var options = {
    fingerprint: {
      extensions: ['png', 'webmanifest'],
      prepend: 'https://www.example.com/'
    }
  };

  var app = new EmberApp(defaults, options);

  return app.toTree();
};
