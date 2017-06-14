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

  it('does not render sizes attribute when is not defined', function() {
    var config = {
      rootURL: '/'
    };
    var manifest = {
      icons: [
        {
          src: '/foo/bar.png'
        }
      ]
    };

    var expected = [
      '<link rel="apple-touch-icon" href="/foo/bar.png">',
    ];

    assert.deepEqual(appleLinkTags(manifest, config), expected);
  });

  it('uses \'/\' as rootURL if it is undefined', function() {
    var config = {}

    var manifest = {
      icons: [
        {
          src: 'bar.png'
        }
      ]
    };

    var expected = [
      '<link rel="apple-touch-icon" href="/bar.png">',
    ];

    assert.deepEqual(appleLinkTags(manifest, config), expected);
  });

  it('generates icons with precomposed suffix', function() {
    var config = {
      rootURL: '/'
    };

    var manifest = {
      icons: [
        {
          src: '/foo/bar.png'
        }
      ],
      apple: {
        precomposed: true
      }
    };

    var expected = [
      '<link rel="apple-touch-icon-precomposed" href="/foo/bar.png">',
    ];

    assert.deepEqual(appleLinkTags(manifest, config), expected);
  });

  it('does not generate apple link tags when apple is false', function() {
    var config = {
      rootURL: '/'
    };

    var manifest = {
      icons: [
        {
          src: '/foo/bar.png'
        }
      ],
      apple: false
    };

    var expected = [];

    assert.deepEqual(appleLinkTags(manifest, config), expected);
  });

  it('respects absolute urls', function() {
    var config = {
      rootURL: '/qux/'
    };
    var manifest = {
      icons: [
        {
          src: 'http://www.example.com/foo/bar.png'
        },
        {
          src: 'https://www.example.com/bar/baz.png'
        }
      ]
    };

    var expected = [
      '<link rel="apple-touch-icon" href="http://www.example.com/foo/bar.png">',
      '<link rel="apple-touch-icon" href="https://www.example.com/bar/baz.png">'
    ];

    assert.deepEqual(appleLinkTags(manifest, config), expected);
  });
});
