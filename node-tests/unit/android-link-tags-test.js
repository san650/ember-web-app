'use strict';

var assert = require('assert');
var androidLinkTags = require('../../lib/android-link-tags');

describe('Unit: androidLinkTags()', function() {
  it('returns `manifest` link', function() {
    var manifest = {};
    var config = {};
    var expected = [
      '<link rel="manifest" href="/manifest.json">'
    ];

    assert.deepEqual(androidLinkTags(config, 'manifest.json'), expected);
  });

  it('uses rootURL if defined', function() {
    var manifest = {};
    var config = {
      rootURL: '/foo/bar/'
    };
    var expected = [
      '<link rel="manifest" href="/foo/bar/manifest.json">'
    ];

    assert.deepEqual(androidLinkTags(config, 'manifest.json'), expected);
  });

  it('uses name from configuration', function() {
    var manifest = {};
    var config = {
      rootURL: '/foo/bar/',
      'ember-web-app': {
        name: 'other-name.foo'
      }
    };
    var expected = [
      '<link rel="manifest" href="/foo/bar/other-name.foo">'
    ];

    assert.deepEqual(androidLinkTags(config, 'manifest.json'), expected);
  });
});
