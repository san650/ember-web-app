/* jshint node: true */
'use strict';

module.exports = configureFingerprint;

function configureFingerprint(currentOptions) {
  if (currentOptions === false) {
    // if `false` just return `false`. Fingerprint is disabled
    return false;
  }

  var defaultOptions = require('broccoli-asset-rev/lib/default-options');
  var fingerprint;

  if (currentOptions == null) {
    fingerprint = {
      exclude: defaultOptions.exclude.concat(['manifest.json']),
      replaceExtensions: defaultOptions.replaceExtensions.concat(['json'])
    };
  } else {
    // fingerprint is configured, update the configuration
    fingerprint = {};

    for(var option in currentOptions) {
      fingerprint[option] = currentOptions[option];
    }

    if (fingerprint.exclude) {
      fingerprint.exclude = fingerprint.exclude.concat(['manifest.json']);
    } else {
      fingerprint.exclude = defaultOptions.exclude.concat(['manifest.json']);
    }

    if (fingerprint.replaceExtensions) {
      fingerprint.replaceExtensions = fingerprint.replaceExtensions.concat(['json']);
    } else {
      fingerprint.replaceExtensions = defaultOptions.replaceExtensions.concat(['json']);
    }
  }

  return fingerprint;
}
