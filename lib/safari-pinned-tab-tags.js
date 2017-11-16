'use strict';

module.exports = safariPinnedTabTags;

const hasTarget = require('./has-target');
const resolveURL = require('./resolve-url');
const resolveRootURL = require('./resolve-root-url');

function safariPinnedTabTags(manifest, config) {
  const links = [];
  const rootURL = resolveRootURL(config);

  if (manifest.icons && manifest.icons.length) {
    for (let icon of manifest.icons) {
      if (hasTarget(icon, 'safari-pinned-tab')) {

        let color = '';
        if (icon.safariPinnedTabColor) {
          color = ` color="${icon.safariPinnedTabColor}"`
        }

        const url = resolveURL(rootURL, icon.src);

        links.push(`<link rel="mask-icon" href="${url}"${color}>`);
      }
    }
  }

  return links;
}
