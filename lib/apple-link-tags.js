/* jshint node: true */
'use strict';

module.exports = appleLinkTags;

function appleLinkTags(manifest, config) {
  var links = [];

  if (manifest.apple && manifest.apple.icons) {
    for(var icon of manifest.apple.icons) {
      links.push(`<link rel="apple-touch-icon" href="${config.rootURL}${icon.src.replace(/^\//,'')}" sizes="${icon.sizes}">`);
    }
  }

  return links;
}
