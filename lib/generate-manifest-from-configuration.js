'use strict';

module.exports = generateManifestFromConfiguration;

var hasTarget = require('./has-target');
var objectAssign = require('object-assign');

function generateManifestFromConfiguration(configuration) {
  var manifest = {};

  for(var attribute in configuration) {
    if (attribute !== 'apple' && attribute !== 'ms') {
      if (attribute === 'icons') {
        manifest[attribute] = copyIcons(configuration[attribute]);
      } else {
        manifest[attribute] = configuration[attribute];
      }
    }
  }

  return manifest;
}

function copyIcons(iconsDefinition) {
  var icons, copy;

  if ('lenght' in iconsDefinition) {
    // not an array value?
    return iconsDefinition;
  }

  icons = [];

  for(var icon of iconsDefinition) {
    if (!icon.targets || hasTarget(icon, 'manifest')) {
      copy = objectAssign({}, icon);
      delete copy.targets;

      icons.push(copy);
    }
  }

  return icons;
}
