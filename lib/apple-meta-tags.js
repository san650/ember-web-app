'use strict';

module.exports = appleMetaTags;

function appleMetaTags(manifest, config) {
  var tags = [];

  if (['fullscreen', 'standalone'].indexOf(manifest.display) > -1) {
    tags.push('<meta name="apple-mobile-web-app-capable" content="yes">');
  }

  if (manifest.name) {
    tags.push('<meta name="apple-mobile-web-app-title" content="' + manifest.name + '">');
  }

  if (manifest.apple && manifest.apple.statusBarStyle) {
    tags.push('<meta name="apple-mobile-web-app-status-bar-style" content="' + manifest.apple.statusBarStyle + '">');
  } else {
    tags.push('<meta name="apple-mobile-web-app-status-bar-style" content="default">');
  }

  return tags;
}
