'use strict';

module.exports = appleMetaTags;

function appleMetaTags(manifest, config) {
  if (manifest.apple === false) {
    return [];
  }

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

  if (manifest.apple && manifest.apple.formatDetection) {
    var detection = manifest.apple.formatDetection;
    var content = '';

    if (detection.telephone === false) {
      content += 'telephone=no';
    }

    if (content) {
      tags.push('<meta name="format-detection" content="' + content + '">');
    }
  }

  return tags;
}
