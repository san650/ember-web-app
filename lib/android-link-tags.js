'use strict';

module.exports = androidLinkTags;

function androidLinkTags(manifest, config) {
  var name = require('./constants').TEMP_MANIFEST;

  return [
    `<link rel="manifest" href="${config.rootURL}${name}">`
  ];
}
