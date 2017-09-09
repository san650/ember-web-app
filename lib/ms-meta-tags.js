'use strict';

module.exports = msMetaTags;

function msMetaTags(config, browserconfigName) {
  const resolveURL = require('./resolve-url');
  const rootURL = config.rootURL || '/';
  const url = resolveURL(rootURL, browserconfigName);

  return [
    `<meta name="msapplication-config" content="${url}">`
  ];
}
