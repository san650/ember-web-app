/* jshint node: true */
'use strict';

module.exports = generateManifestFromConfiguration;

function generateManifestFromConfiguration(configuration) {
  var manifest = {};

  for(var attribute in configuration) {
    if (attribute !== 'apple' && attribute !== 'ms') {
      manifest[attribute] = configuration[attribute];
    }
  }

  return manifest;
}
