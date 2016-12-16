'use strict';

module.exports = androidLinkTags;

function androidLinkTags(config, manifestName) {
  return [
    `<link rel="manifest" href="${config.rootURL}${manifestName}">`
  ];
}
