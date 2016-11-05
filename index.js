/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-web-app',

  treeForPublic: function() {
    var ProcessManifest = require('./lib/process-manifest');

    return new ProcessManifest('config', 'project name', 'project description');
  }
};
