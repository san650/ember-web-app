/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-web-app',

  included: function(app) {
    this.app = app;
    app.options = app.options || {};

    this._configureFingerprint();

    this.manifest = this._getManifest();

    this._super.included.apply(this, arguments);
  },

  treeForPublic: function() {
    var GenerateManifest = require('./lib/broccoli/generate-manifest');

    return new GenerateManifest('.', this.manifest);
  },

  contentFor: function(section, config) {
    if (section === 'head') {
      return `<link rel="manifest" href="${config.rootURL}manifest.json">`;
    }
  },

  _configureFingerprint() {
    var configureFingerprint = require('./lib/configure-fingerprint');
    this.app.options.fingerprint = configureFingerprint(this.app.options.fingerprint);
  },

  _getManifest() {
    var path = require('path');
    var env = this.app.env;
    var appConfig = this.app.project.config(env);

    return require(path.join(this.app.project.root, 'config/manifest.js'))(env, appConfig);
  }
};
