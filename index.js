/* eslint-env node */
'use strict';

var MANIFEST_NAME = "manifest.webmanifest";

module.exports = {
  name: 'ember-web-app',

  shouldIncludeChildAddon: function(childAddon) {
    if (childAddon.name === 'broccoli-asset-rev') {
      return false;
    }

    return this._super.shouldIncludeChildAddon.apply(this, arguments);
  },

  included: function(app) {
    this.app = app;
    app.options = app.options || {};

    this.addonBuildConfig = this.app.options['ember-web-app'] || {};

    if (!this._disabled()) {
      this._configureFingerprint();
      this.manifestConfiguration = this._getManifestConfiguration();
    }

    this._super.included.apply(this, arguments);
  },

  treeFor: function() {
    if (this._disabled()) {
      return;
    }

    return this._super.treeFor.apply(this, arguments);
  },

  treeForPublic: function() {
    var generateManifestFromConfiguration = require('./lib/generate-manifest-from-configuration');
    var validate = require('web-app-manifest-validator');
    var manifest = generateManifestFromConfiguration(this.manifestConfiguration);
    var ui = this.ui;

    validate(manifest).forEach(function(error) {
      ui.writeWarnLine('MANIFEST VALIDATION: ' + error);
    });

    var GenerateManifest = require('./lib/broccoli/generate-manifest-json');

    return new GenerateManifest(generateManifestFromConfiguration(this.manifestConfiguration), MANIFEST_NAME);
  },

  contentFor: function(section, config) {
    if (this._disabled()) {
      return;
    }

    if (section === 'head') {
      var tags = [];

      tags = tags.concat(require('./lib/android-link-tags')(config, MANIFEST_NAME));
      tags = tags.concat(require('./lib/apple-link-tags')(this.manifestConfiguration, config));
      tags = tags.concat(require('./lib/favicon-link-tags')(this.manifestConfiguration, config));

      tags = tags.concat(require('./lib/android-meta-tags')(this.manifestConfiguration, config));
      tags = tags.concat(require('./lib/apple-meta-tags')(this.manifestConfiguration, config));

      return tags.join('\n');
    }
  },

  _configureFingerprint: function() {
    var configureFingerprint = require('./lib/configure-fingerprint');
    this.app.options.fingerprint = configureFingerprint(this.app.options.fingerprint, MANIFEST_NAME);
  },

  _getManifestConfiguration: function() {
    try {
      var path = require('path');
      var env = this.app.env;
      var appConfig = this.app.project.config(env);

      return require(path.join(this.app.project.root, 'config/manifest.js'))(env, appConfig);
    } catch(e) {
      return {};
    }
  },

  _disabled: function() {
    return this.addonBuildConfig.enabled === false;
  }
};
