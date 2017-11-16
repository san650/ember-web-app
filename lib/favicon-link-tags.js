'use strict';

module.exports = faviconLinkTags;

const hasTarget = require('./has-target');
const resolveURL = require('./resolve-url');
const resolveRootURL = require('./resolve-root-url');

function faviconLinkTags(manifest, config) {
  const links = [];
  const rootURL = resolveRootURL(config);

  if (manifest.icons && manifest.icons.length) {
    for (let icon of manifest.icons) {
      if (hasTarget(icon, 'favicon')) {
        let sizes = '';
        if (icon.sizes) {
          sizes = ` sizes="${icon.sizes}"`
        }

        let type = '';
        if (icon.type) {
          type = ` type="${icon.type}"`
        }

        const url = resolveURL(rootURL, icon.src);

        links.push(`<link rel="icon" href="${url}"${sizes}${type}>`);
      }
    }
  }

  return links;
}
