/* eslint-env node */
'use strict';

const path = require('path');
const getManifestConfiguration = require('./lib/get-manifest-configuration');

const MANIFEST_NAME = 'manifest.webmanifest';

module.exports = {
  name: 'ember-web-app',

  shouldIncludeChildAddon(childAddon) {
    if (childAddon.name === 'broccoli-asset-rev') {
      return false;
    }

    return this._super.shouldIncludeChildAddon.apply(this, arguments);
  },

  included(app) {
    this.app = app;
    app.options = app.options || {};

    this.addonBuildConfig = this.app.options['ember-web-app'] || {};

    if (!this._disabled()) {
      this._configureFingerprint();
      this.manifestConfiguration = getManifestConfiguration(this.app.project, this.app.env);
    }

    this._super.included.apply(this, arguments);
  },

  treeFor() {
    if (this._disabled()) {
      return;
    }

    return this._super.treeFor.apply(this, arguments);
  },

  treeForPublic() {
    const GenerateManifest = require('./lib/broccoli/generate-manifest-json');

    return new GenerateManifest(path.join(this.app.project.root, 'config'), {
      manifestName: MANIFEST_NAME,
      project: this.app.project,
      env: this.app.env,
      ui: this.ui
    });
  },

  contentFor(section, config) {
    if (this._disabled()) {
      return;
    }

    if (section === 'head') {
      let tags = [];

      tags = tags.concat(require('./lib/android-link-tags')(config, MANIFEST_NAME));
      tags = tags.concat(require('./lib/apple-link-tags')(this.manifestConfiguration, config));
      tags = tags.concat(require('./lib/favicon-link-tags')(this.manifestConfiguration, config));

      tags = tags.concat(require('./lib/android-meta-tags')(this.manifestConfiguration, config));
      tags = tags.concat(require('./lib/apple-meta-tags')(this.manifestConfiguration, config));

      return tags.join('\n');
    }
  },

  _configureFingerprint() {
    let configureFingerprint = require('./lib/configure-fingerprint');
    this.app.options.fingerprint = configureFingerprint(this.app.options.fingerprint, MANIFEST_NAME);
  },

  _disabled() {
    return this.addonBuildConfig.enabled === false;
  }
};
