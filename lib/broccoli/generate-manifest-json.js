'use strict';

var Plugin = require('broccoli-plugin');

module.exports = GenerateManifest;

GenerateManifest.prototype = Object.create(Plugin.prototype);
GenerateManifest.prototype.constructor = GenerateManifest;
function GenerateManifest(manifest) {
  // We don't need any input node
  Plugin.call(this, [], {
    annotation: 'generate manifest.json'
  });

  this.manifest = manifest;
}

GenerateManifest.prototype.build = function() {
  var writeFileSync = require('fs').writeFileSync;
  var join = require('path').join;

  writeFileSync(
    join(this.outputPath, require('../constants').TEMP_MANIFEST),
    JSON.stringify(this.manifest) + '\n');
};
