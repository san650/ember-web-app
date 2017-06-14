'use strict';

module.exports = appleLinkTags;

var hasTarget = require('./has-target');

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

        if (/^https?:\/\//i.test(icon.src)) {
          rootURL = '';
        }

        links.push(`<link rel="apple-touch-icon${precomposed}" href="${rootURL}${icon.src.replace(/^\//,'')}"${sizes}>`);
      }
    }
  }

  return links;
}
