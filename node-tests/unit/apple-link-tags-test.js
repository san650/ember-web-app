/* jshint node: true */
'use strict';

var assert = require('assert');
var appleLinkTags = require('../../lib/apple-link-tags');

describe('Unit: appleLinkTags()', function() {
  it('returns `apple-touch-icon` links', function() {
    var config = {
      rootURL: '/qux/'
    };
    var manifest = {
      apple: {
        images: [
          {
            src: '/foo/bar.png',
            sizes: '180x180'
          },
          {
            src: '/bar/baz.png',
            sizes: '280x280'
          },
        ]
      }
    };

    var expected = [
      '<link rel="apple-touch-icon" href="/qux/foo/bar.png" sizes="180x180">',
      '<link rel="apple-touch-icon" href="/qux/bar/baz.png" sizes="280x280">'
    ];

    assert.deepEqual(appleLinkTags(manifest, config), expected);
  });

  it('returns empty array when apple is not defined', function() {
    var config = {};
    var manifest = {};
    var expected = [];

    assert.deepEqual(appleLinkTags(manifest, config), expected);
  });

  it('returns empty array when images is not defined', function() {
    var config = {};
    var manifest = {
      apple: {}
    };
    var expected = [];

    assert.deepEqual(appleLinkTags(manifest, config), expected);
  });
});
