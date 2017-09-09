'use strict';

module.exports = configureFingerprint;

function configureFingerprint(currentOptions, fileName) {
  if (currentOptions === false) {
    // if `false` just return `false`. Fingerprint is disabled
    return false;
  }

  var defaultOptions = require('broccoli-asset-rev/lib/default-options');
  var fingerprint = {};

  if (currentOptions != null) {
    for (var option in currentOptions) {
      fingerprint[option] = currentOptions[option];
    }
  }

  var replaceExtensions = fingerprint.replaceExtensions || defaultOptions.replaceExtensions;
  fingerprint.replaceExtensions = replaceExtensions.concat([fileName.match(/\.(.*$)/)[1]]);

  return fingerprint;
}
