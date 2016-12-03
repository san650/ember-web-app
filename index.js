/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-web-app',

  included: function(app) {
    this.app = app;
    app.options = app.options || {};

    this._configureFingerprint();

    this.manifestConfiguration = this._getManifestConfiguration();

    this._super.included(app);
  },

  treeForPublic: function() {
    var generateManifestFromConfiguration = require('./lib/generate-manifest-from-json');
    var GenerateManifest = require('./lib/broccoli/generate-manifest-json');

    return new GenerateManifest('.', generateManifestFromConfiguration(this.manifestConfiguration));
  },

  contentFor: function(section, config) {
    if (section === 'head') {
      var tags = [];

      tags = tags.concat(require('./lib/android-link-tags')(this.manifestConfiguration, config));
      tags = tags.concat(require('./lib/apple-link-tags')(this.manifestConfiguration, config));

      tags = tags.concat(require('./lib/android-meta-tags')(this.manifestConfiguration, config));
      tags = tags.concat(require('./lib/apple-meta-tags')(this.manifestConfiguration, config));

      return tags.join('\n');
    }
  },

  _configureFingerprint() {
    var configureFingerprint = require('./lib/configure-fingerprint');
    this.app.options.fingerprint = configureFingerprint(this.app.options.fingerprint);
  },

  _getManifestConfiguration() {
    try {
      var path = require('path');
      var env = this.app.env;
      var appConfig = this.app.project.config(env);

      return require(path.join(this.app.project.root, 'config/manifest.js'))(env, appConfig);
    } catch(e) {
      return {};
    }
  }
};
