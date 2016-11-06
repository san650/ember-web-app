/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-web-app',

  included: function(app) {
    this.app = app;
    app.options = app.options || {};

    this._configureFingerprint();

    this.manifest = this._getManifest();

    this._super.included(app);
  },

  treeForPublic: function() {
    var GenerateManifest = require('./lib/broccoli/generate-manifest-json');

    return new GenerateManifest('.', this.manifest);
  },

  contentFor: function(section, config) {
    if (section === 'head') {
      var tags = [];
      tags = tags.concat(require('./lib/android-link-tags')(this.manifest, config));
      tags = tags.concat(require('./lib/android-meta-tags')(this.manifest, config));
      tags = tags.concat(require('./lib/apple-meta-tags')(this.manifest, config));

      return tags.join('\n');
    }
  },

  _configureFingerprint() {
    var configureFingerprint = require('./lib/configure-fingerprint');
    this.app.options.fingerprint = configureFingerprint(this.app.options.fingerprint);
  },

  _getManifest() {
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
