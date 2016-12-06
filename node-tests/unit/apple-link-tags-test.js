/* jshint node: true */
'use strict';

var assert = require('assert');
var appleLinkTags = require('../../lib/apple-link-tags');

describe('Unit: appleLinkTags()', function() {
  it('generates `apple-touch-icon` links from icons with no targets set', function() {
    var config = {
      rootURL: '/qux/'
    };
    var manifest = {
      icons: [
        {
          src: '/foo/bar.png',
          sizes: '180x180'
        },
        {
          src: '/bar/baz.png',
          sizes: '280x280'
        }
      ]
    };

    var expected = [
      '<link rel="apple-touch-icon" href="/qux/foo/bar.png" sizes="180x180">',
      '<link rel="apple-touch-icon" href="/qux/bar/baz.png" sizes="280x280">'
    ];

    assert.deepEqual(appleLinkTags(manifest, config), expected);
  });

  it('excludes icons that are not targeted for apple', function() {
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

    var expected = [
      '<link rel="apple-touch-icon" href="/qux/bar/baz.png" sizes="280x280">'
    ];

    assert.deepEqual(appleLinkTags(manifest, config), expected);
  });

  it('returns empty array when icons is not defined', function() {
    var config = {};
    var manifest = {};
    var expected = [];

    assert.deepEqual(appleLinkTags(manifest, config), expected);
  });

  it('returns empty array when icons is empty', function() {
    var config = {};
    var manifest = {
      icons: []
    };
    var expected = [];

    assert.deepEqual(appleLinkTags(manifest, config), expected);
  });
});
