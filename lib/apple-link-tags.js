'use strict';

module.exports = appleLinkTags;

var hasTarget = require('./has-target');

function appleLinkTags(manifest, config) {
  var links = [];
  var sizes;

  if (manifest.icons && manifest.icons.length) {
    for(var icon of manifest.icons) {
      if (!icon.targets || hasTarget(icon, 'apple')) {
        if (icon.sizes) {
          sizes = ` sizes="${icon.sizes}"`
        } else {
          sizes = '';
        }

        links.push(`<link rel="apple-touch-icon" href="${config.rootURL}${icon.src.replace(/^\//,'')}"${sizes}>`);
      }
    }
  }

  return links;
}
