'use strict';

var assert = require('assert');
var safariPinnedTabTags = require('../../lib/safari-pinned-tab-tags');

describe('Unit: safariPinnedTabs()', function() {
  it('excludes icons that are not targeted for pinned tabs', function() {
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

    assert.deepEqual(safariPinnedTabTags(manifest, config), expected);
  });

  it('returns empty array when icons is not defined', function() {
    var config = {};
    var manifest = {};
    var expected = [];

    assert.deepEqual(safariPinnedTabTags(manifest, config), expected);
  });

  it('returns empty array when icons is empty', function() {
    var config = {};
    var manifest = {
      icons: []
    };
    var expected = [];

    assert.deepEqual(safariPinnedTabTags(manifest, config), expected);
  });

  it('renders color attribute', function() {
    var config = {
      rootURL: '/'
    };
    var manifest = {
      icons: [
        {
          src: '/foo/bar.svg',
          targets: ['safari-pinned-tab'],
          safariPinnedTabColor: '#abc'
        }
      ]
    };

    var expected = [
      '<link rel="mask-icon" href="/foo/bar.svg" color="#abc">',
    ];

    assert.deepEqual(safariPinnedTabTags(manifest, config), expected);
  });

  it('uses an empty string as rootURL if it is undefined', function() {
    var config = {}

    var manifest = {
      icons: [
        {
          src: 'bar.svg',
          targets: ['safari-pinned-tab']
        }
      ]
    };

    var expected = [
      '<link rel="mask-icon" href="bar.svg">',
    ];

    assert.deepEqual(safariPinnedTabTags(manifest, config), expected);
  });

  it('respects absolute urls', function() {
    var config = {
      rootURL: '/qux/'
    };
    var manifest = {
      icons: [
        {
          src: 'http://www.example.com/foo/bar.svg',
          targets: ['safari-pinned-tab']
        },
        {
          src: 'https://www.example.com/bar/baz.svg',
          targets: ['safari-pinned-tab']
        }
      ]
    };

    var expected = [
      '<link rel="mask-icon" href="http://www.example.com/foo/bar.svg">',
      '<link rel="mask-icon" href="https://www.example.com/bar/baz.svg">'
    ];

    assert.deepEqual(safariPinnedTabTags(manifest, config), expected);
  });
});
