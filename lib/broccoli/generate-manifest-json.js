'use strict';

const Plugin = require('broccoli-plugin');
const fs = require('fs');
const path = require('path');

module.exports = GenerateManifest;

GenerateManifest.prototype = Object.create(Plugin.prototype);
GenerateManifest.prototype.constructor = GenerateManifest;
function GenerateManifest(manifest, manifestName) {
  // We don't need any input node
  Plugin.call(this, [], {
    annotation: 'generate manifest.webmanifest',
    persistentOutput: true
  });

  this.manifest = manifest;
  this.manifestName = manifestName;
}

GenerateManifest.prototype.build = function() {
  let outputFilePath = path.join(this.outputPath, this.manifestName);

  if (fs.existsSync(outputFilePath)) {
    return;
  }

  fs.writeFileSync(
    outputFilePath,
    JSON.stringify(this.manifest) + '\n');
};
