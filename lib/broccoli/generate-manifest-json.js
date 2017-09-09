'use strict';

const CachingWriter = require('broccoli-caching-writer');
const fs = require('fs');
const path = require('path');
const generateManifestFromConfiguration = require('../generate-manifest-from-configuration');
const getManifestConfiguration = require('../get-manifest-configuration');
const validate = require('web-app-manifest-validator');

class GenerateManifest extends CachingWriter {
  constructor(inputNode, options) {
    super([inputNode], {
      annotation: 'generate manifest.webmanifest'
    });

    this.options = options;
  }

  clearConfigGeneratorCache() {
    fuzzyPurgeRequireEntry(path.join(this.options.project.root, 'config', 'manifest.js'));
  }

  build() {
    this.clearConfigGeneratorCache();
    let outputFilePath = path.join(this.outputPath, this.options.manifestName);
    fs.writeFileSync(
      outputFilePath,
      JSON.stringify(this.generateManifest()) + '\n'
    );
  }

  generateManifest() {
    let manifest = generateManifestFromConfiguration(
      getManifestConfiguration(this.options.project, this.options.env)
    );
    let ui = this.options.ui;

    validate(manifest).forEach(function(error) {
      ui.writeWarnLine('MANIFEST VALIDATION: ' + error);
    });

    return manifest;
  }

}

// taken from https://github.com/ember-cli/broccoli-config-loader
function fuzzyPurgeRequireEntry(entry) {
  return Object.keys(require.cache).filter(function(path) {
    return path.indexOf(entry) > -1;
  }).forEach(function(entry) {
    delete require.cache[entry];
  });
}

module.exports = GenerateManifest;
