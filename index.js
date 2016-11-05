/* jshint node: true */
'use strict';

var Filter = require('broccoli-filter');

ProcessManifest.prototype = Object.create(Filter.prototype);
ProcessManifest.prototype.constructor = ProcessManifest;

function ProcessManifest(inputNode, name, description) {
  Filter.call(this, inputNode);

  this.name = name;
  this.description = description;
}

ProcessManifest.prototype.processString = function processString(contents, relativePath) {
  return contents
    .replace(/{{\s*name\s*}}/gi, this.name)
    .replace(/{{\s*description\s*}}/gi, this.description);
};

ProcessManifest.prototype.getDestFilePath = function getDestFilePath(relativePath) {
  // Only process config/manifest.json and rename it to just manifest.json
  if (relativePath.includes('manifest.json')) {
    return 'manifest.json';
  }
};

module.exports = {
  name: 'ember-web-app',

  treeForPublic: function() {
    return new ProcessManifest('config', 'project name', 'project description');
  }
};
