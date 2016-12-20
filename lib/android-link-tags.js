'use strict';

module.exports = androidLinkTags;

function androidLinkTags(config, manifestName) {
  var name = (config['ember-web-app'] && config['ember-web-app'].name) || manifestName;
  var rootURL = config.rootURL || '/';

  return [
    `<link rel="manifest" href="${rootURL}${name}">`
  ];
}
