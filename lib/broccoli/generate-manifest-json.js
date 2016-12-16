'use strict';

var Plugin = require('broccoli-plugin');

module.exports = GenerateManifest;

GenerateManifest.prototype = Object.create(Plugin.prototype);
GenerateManifest.prototype.constructor = GenerateManifest;
function GenerateManifest(manifest, manifestName) {
  // We don't need any input node
  Plugin.call(this, [], {
    annotation: 'generate manifest.json'
  });

  this.manifest = manifest;
  this.manifestName = manifestName;
}

GenerateManifest.prototype.build = function() {
  var writeFileSync = require('fs').writeFileSync;
  var join = require('path').join;

  writeFileSync(
    join(this.outputPath, this.manifestName),
    JSON.stringify(this.manifest) + '\n');
};
