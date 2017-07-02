'use strict';

module.exports = faviconLinkTags;

var hasTarget = require('./has-target');
var resolveURL = require('./resolve-url');

function faviconLinkTags(manifest, config) {
  var links = [];
  var sizes;
  var rootURL = config.rootURL || '/';

  if (manifest.icons && manifest.icons.length) {
    for (var icon of manifest.icons) {
      if (hasTarget(icon, 'favicon')) {
        if (icon.sizes) {
          sizes = ` sizes="${icon.sizes}"`
        } else {
          sizes = '';
        }

        const url = resolveURL(rootURL, icon.src);

        links.push(`<link rel="icon" href="${url}"${sizes}>`);
      }
    }
  }

  return links;
}
