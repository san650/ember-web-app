'use strict';

module.exports = appleLinkTags;

var hasTarget = require('./has-target');
var resolveURL = require('./resolve-url');

function appleLinkTags(manifest, config) {
  if (manifest.apple === false) {
    return [];
  }

  var links = [];
  var sizes;
  var rootURL = config.rootURL || '/';

  var precomposed;

  if(manifest.apple && manifest.apple.precomposed) {
    precomposed = '-precomposed';
  } else {
    precomposed = '';
  }

  if (manifest.icons && manifest.icons.length) {
    for(var icon of manifest.icons) {
      if (!icon.targets || hasTarget(icon, 'apple')) {
        if (icon.sizes) {
          sizes = ` sizes="${icon.sizes}"`
        } else {
          sizes = '';
        }

        const url = resolveURL(rootURL, icon.src);

        links.push(`<link rel="apple-touch-icon${precomposed}" href="${url}"${sizes}>`);
      }
    }
  }

  return links;
}
