'use strict';

module.exports = resolveURL;

function resolveURL(baseURL, url) {
  if (/^https?:\/\//i.test(url)) {
    return url;
  }

  return `${baseURL}${url.replace(/^\//,'')}`;
}
