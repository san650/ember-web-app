/* jshint node: true */
'use strict';

module.exports = appleLinkTags;

var hasTarget = require('./has-target');

function appleLinkTags(manifest, config) {
  var links = [];

  if (manifest.icons && manifest.icons.length) {
    for(var icon of manifest.icons) {
      if (!icon.targets || hasTarget(icon, 'apple')) {
        links.push(`<link rel="apple-touch-icon" href="${config.rootURL}${icon.src.replace(/^\//,'')}" sizes="${icon.sizes}">`);
      }
    }
  }

  return links;
}
