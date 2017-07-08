'use strict';

module.exports = configureFingerprint;

function configureFingerprint(currentOptions, manifestName) {
  if (currentOptions === false) {
    // if `false` just return `false`. Fingerprint is disabled
    return false;
  }

  var defaultOptions = require('broccoli-asset-rev/lib/default-options');
  var fingerprint = {};

  if (currentOptions != null) {
    for(var option in currentOptions) {
      fingerprint[option] = currentOptions[option];
    }
  }

  var replaceExtensions = fingerprint.replaceExtensions || defaultOptions.replaceExtensions;
  fingerprint.replaceExtensions = replaceExtensions.concat([manifestName.match(/\.(.*$)/)[1]]);

  return fingerprint;
}
