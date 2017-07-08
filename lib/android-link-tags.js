'use strict';

module.exports = androidLinkTags;

function androidLinkTags(config, manifestName) {
  var resolveURL = require('./resolve-url');
  var rootURL = config.rootURL || '/';
  var url = resolveURL(rootURL, manifestName);

  return [
    `<link rel="manifest" href="${url}">`
  ];
}
