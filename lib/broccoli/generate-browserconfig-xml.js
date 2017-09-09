'use strict';

const CachingWriter = require('broccoli-caching-writer');
const fs = require('fs');
const path = require('path');
const generateBrowserconfigFromConfiguration = require('../generate-browserconfig-from-configuration');
const getManifestConfiguration = require('../get-manifest-configuration');

class GenerateBrowserconfig extends CachingWriter {
  constructor(inputNode, options) {
    super([inputNode], {
      annotation: 'generate browserconfig.xml'
    });

    this.options = options;
  }

  build() {
    let outputFilePath = path.join(this.outputPath, this.options.browserconfigName);
    fs.writeFileSync(
      outputFilePath,
      this.generateBrowserconfig()
    );
  }

  generateBrowserconfig() {
    return generateBrowserconfigFromConfiguration(
      getManifestConfiguration(this.options.project, this.options.env),
      this.options.ui
    );
  }
}

module.exports = GenerateBrowserconfig;
