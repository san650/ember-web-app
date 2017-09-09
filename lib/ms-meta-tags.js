'use strict';

module.exports = msMetaTags;

function msMetaTags(config, browserconfigName) {
  var resolveURL = require('./resolve-url');
  var rootURL = config.rootURL || '/';
  var url = resolveURL(rootURL, browserconfigName);

  return [
    `<meta name="msapplication-config" content="${url}">`
  ];
}
