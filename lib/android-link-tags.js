'use strict';

module.exports = androidLinkTags;

function androidLinkTags(config, manifestName) {
  var resolveURL = require('./resolve-url');
  var resolveRootURL = require('./resolve-root-url');

  var rootURL = resolveRootURL(config);
  var url = resolveURL(rootURL, manifestName);

  return [
    `<link rel="manifest" href="${url}">`
  ];
}
