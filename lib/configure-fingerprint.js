/* jshint node: true */
'use strict';

module.exports = configureFingerprint;

function configureFingerprint(currentOptions) {
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

  var manifest = require('./constants').TEMP_MANIFEST;

  var exclude = fingerprint.exclude || defaultOptions.exclude;
  fingerprint.exclude = exclude.concat([manifest]);

  var replaceExtensions = fingerprint.replaceExtensions || defaultOptions.replaceExtensions;
  fingerprint.replaceExtensions = replaceExtensions.concat([manifest.match(/\.(.*$)/)[1]]);

  return fingerprint;
}
