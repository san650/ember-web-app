/* jshint node: true */
'use strict';

var Plugin = require('broccoli-plugin');

module.exports = GenerateManifest;

GenerateManifest.prototype = Object.create(Plugin.prototype);
GenerateManifest.prototype.constructor = GenerateManifest;
function GenerateManifest(inputNode, manifest) {
  Plugin.call(this, [inputNode]);

  this.manifest = manifest;
}

GenerateManifest.prototype.build = function() {
  var writeFileSync = require('fs').writeFileSync;
  var join = require('path').join;

  writeFileSync(
    join(this.outputPath, 'manifest.json'),
    JSON.stringify(this.manifest) + '\n');
};
