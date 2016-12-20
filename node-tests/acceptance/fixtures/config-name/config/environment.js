/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'dummy',
    environment: environment,
    rootURL: '/'
  };

  ENV['ember-web-app'] = {
    name: 'my-awesome-manifest.json'
  };

  return ENV;
};
