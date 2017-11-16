'use strict';

module.exports = resolveRootURL;

function resolveRootURL(config) {
  return config.rootURL || '';
}
