'use strict';

var assert = require('assert');
var androidLinkTags = require('../../lib/android-link-tags');

describe('Unit: androidLinkTags()', function() {
  it('returns `manifest` link', function() {
    var manifest = {};
    var config = {
      rootURL: '/foo/bar/'
    };
    var expected = [
      '<link rel="manifest" href="/foo/bar/manifest.ember-web-app.json">'
    ];

    assert.deepEqual(androidLinkTags(manifest, config), expected);
  });
});
