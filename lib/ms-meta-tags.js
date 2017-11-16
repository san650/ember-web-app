'use strict';

const GenerateBrowserconfig = require('./broccoli/generate-browserconfig-xml');

module.exports = msMetaTags;

function msMetaTags(manifest, config, browserconfigName) {
  if (GenerateBrowserconfig.shouldGenerateBrowserconfig(manifest)) {
    const resolveURL = require('./resolve-url');
    const resolveRootURL = require('./resolve-root-url');

    const rootURL = resolveRootURL(config);
    const url = resolveURL(rootURL, browserconfigName);

    return [
      `<meta name="msapplication-config" content="${url}">`
    ];
  } else {
    return [];
  }
}
