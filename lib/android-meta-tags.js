'use strict';

module.exports = androidMetaTags;

function androidMetaTags(manifest) {
  if (manifest.theme_color) {
    return [
      '<meta name="theme-color" content="' + manifest.theme_color + '">'
    ];
  } else {
    return [];
  }
}
