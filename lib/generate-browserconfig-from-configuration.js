'use strict';

module.exports = generateBrowserconfigFromConfiguration;

const xmlbuilder = require('xmlbuilder');
const hasTarget = require('./has-target');

const ALLOWED_ICON_ELEMENTS = [
  'square70x70logo',
  'square150x150logo',
  'wide310x150logo',
  'square310x310logo'
];

function generateBrowserconfigFromConfiguration(configuration, ui) {
  // This is the minimal required content in browserconfig.xml
  const object = {
    browserconfig: {
      msapplication: {}
    }
  };

  const msIcons = getMSIcons(configuration);

  if (msIcons.length > 0) {
    if (!configuration.ms || !configuration.ms.tileColor) {
      throw new Error(`Property 'ms.tileColor' missing to generate browserconfig.xml`);
    }

    object.browserconfig.msapplication.tile = constructTile(
      msIcons, configuration.ms.tileColor
    );
  }

  const xml = xmlbuilder.create(object);

  return `${xml}\n`;
}

function constructTile(icons, color) {
  const tile = {};

  icons.forEach(function(icon) {
    if (!ALLOWED_ICON_ELEMENTS.includes(icon.element)) {
      throw new Error(`The 'element' property of the icon for browserconfig.xml must be one of ${ALLOWED_ICON_ELEMENTS.join(', ')}`);
    }

    tile[icon.element] = {
      '@src': icon.src
    }
  });

  tile.TileColor = {
    '#text': color
  };

  return tile;
}

function getMSIcons(configuration) {
  let msIcons = [];

  for (const attribute in configuration) {
    if (attribute === 'icons') {
      const iconsDefinition = configuration[attribute];

      msIcons = msIcons.concat(
        iconsDefinition.filter(function(icon) {
          return hasTarget(icon, 'ms');
        })
      );
    }
  }

  return msIcons;
}
