/* jshint node: true */
'use strict';

var assert = require('assert');
var index = require('../../index');

describe('Unit: index', function() {
  describe('contentFor()', function() {
    it('returns link tag when section is "head"', function() {
      var expected = '<link rel="manifest" href="/manifest.json">';
      index.manifest = {};

      assert.ok(index.contentFor('head', { rootURL: '/' }).includes(expected));
    });

    it('returns empty when section is other than "head"', function() {
      index.manifest = {};
      assert.equal(index.contentFor('head-footer', { rootURL: '/' }), null);
    });

    it('uses rootURL config', function() {
      var expected = '<link rel="manifest" href="/foo/bar/manifest.json">';
      index.manifest = {};

      assert.ok(index.contentFor('head', { rootURL: '/foo/bar/' }).includes(expected));
    });

    it('returns apple meta tags', function() {
      var expected = '<meta name="apple-mobile-web-app-capable" content="yes">';
      index.manifest = {};

      assert.ok(index.contentFor('head', { rootURL: '/' }).includes(expected));
    });

    it('returns apple link tags', function() {
      var expected = '<link rel="apple-touch-icon" href="/foo/bar.png" sizes="180x180">';
      index.manifest = {
        apple: {
          images: [
            {
              src: '/foo/bar.png',
              sizes: '180x180'
            }
          ]
        }
      };

      assert.ok(index.contentFor('head', { rootURL: '/' }).includes(expected));
    });
  });
});
