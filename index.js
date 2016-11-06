/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-web-app',

  treeForPublic: function() {
    var ProcessManifest = require('./lib/process-manifest');

    return new ProcessManifest('config', 'project name', 'project description');
  },

  included: function(app) {
    var configureFingerprint = require('./lib/configure-fingerprint');

    this.app = app;
    app.options = app.options || {};

    this.app.options.fingerprint = configureFingerprint(this.app.options.fingerprint);

    this._super.included(app);
  },

  contentFor: function(section) {
    if (section === 'head') {
      // FIXME: Add support for {{rootURL}}
      return '<link rel="manifest" href="/manifest.json">';
    }
  }
};
