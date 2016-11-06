/* jshint node: true */
'use strict';

module.exports = appleLinkTags;

function appleLinkTags(manifest, config) {
  var links = [];

  if (manifest.apple && manifest.apple.images) {
    for(var image of manifest.apple.images) {
      links.push(`<link rel="apple-touch-icon" href="${config.rootURL}${image.src.replace(/^\//,'')}" sizes="${image.sizes}">`);
    }
  }

  return links;
}
