'use strict';

var assert = require('assert');
var faviconLinkTags = require('../../lib/favicon-link-tags');

describe('Unit: faviconLinkTags()', function() {
  it('excludes icons that are not targeted for favicon', function() {
    var config = {
      rootURL: '/qux/'
    };
    var manifest = {
      icons: [
        {
          src: '/foo/bar.png',
          sizes: '180x180',
          targets: ['manifest']
        },
        {
          src: '/bar/baz.png',
          sizes: '280x280'
        }
      ]
    };

    var expected = [];

    assert.deepEqual(faviconLinkTags(manifest, config), expected);
  });

  it('returns empty array when icons is not defined', function() {
    var config = {};
    var manifest = {};
    var expected = [];

    assert.deepEqual(faviconLinkTags(manifest, config), expected);
  });

  it('returns empty array when icons is empty', function() {
    var config = {};
    var manifest = {
      icons: []
    };
    var expected = [];

    assert.deepEqual(faviconLinkTags(manifest, config), expected);
  });

  it('does not render sizes attribute when is not defined', function() {
    var config = {
      rootURL: '/'
    };
    var manifest = {
      icons: [
        {
          src: '/foo/bar.png',
          targets: ['favicon']
        }
      ]
    };

    var expected = [
      '<link rel="icon" href="/foo/bar.png">',
    ];

    assert.deepEqual(faviconLinkTags(manifest, config), expected);
  });

  it('uses \'/\' as rootURL if it is undefined', function() {
    var config = {}

    var manifest = {
      icons: [
        {
          src: 'bar.png',
          targets: ['favicon']
        }
      ]
    };

    var expected = [
      '<link rel="icon" href="/bar.png">',
    ];

    assert.deepEqual(faviconLinkTags(manifest, config), expected);
  });

  it('respects absolute urls', function() {
    var config = {
      rootURL: '/qux/'
    };
    var manifest = {
      icons: [
        {
          src: 'http://www.example.com/foo/bar.png',
          targets: ['favicon']
        },
        {
          src: 'https://www.example.com/bar/baz.png',
          targets: ['favicon']
        }
      ]
    };

    var expected = [
      '<link rel="icon" href="http://www.example.com/foo/bar.png">',
      '<link rel="icon" href="https://www.example.com/bar/baz.png">'
    ];

    assert.deepEqual(faviconLinkTags(manifest, config), expected);
  });
});
