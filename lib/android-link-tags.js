/* jshint node: true */
'use strict';

module.exports = androidLinkTags;

function androidLinkTags(manifest, config) {
  return [
    `<link rel="manifest" href="${config.rootURL}manifest.json">`
  ];
}
