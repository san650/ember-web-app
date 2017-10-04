'use strict';

const CachingWriter = require('broccoli-caching-writer');
const fs = require('fs');
const path = require('path');
const generateBrowserconfigFromConfiguration = require('../generate-browserconfig-from-configuration');
const getManifestConfiguration = require('../get-manifest-configuration');
const fuzzyPurgeRequireEntry = require('../fuzzy-purge-require-entry');

class GenerateBrowserconfig extends CachingWriter {
  constructor(inputNode, options) {
    super([inputNode], {
      annotation: 'generate browserconfig.xml'
    });

    this.options = options;
  }

  clearConfigGeneratorCache() {
    fuzzyPurgeRequireEntry(
      path.join(this.options.project.root, 'config', 'manifest.js')
    );
  }

  build() {
    this.clearConfigGeneratorCache();

    const options = this.options;

    const manifest = getManifestConfiguration(options.project, options.env);

    if (manifest.ms) {
      const outputFilePath = path.join(
        this.outputPath, options.browserconfigName
      );
      const browserconfig = generateBrowserconfigFromConfiguration(
        manifest, options.ui
      );

      fs.writeFileSync(outputFilePath, browserConfig);
    }
  }
}

module.exports = GenerateBrowserconfig;
