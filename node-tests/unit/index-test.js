'use strict';

var assert = require('assert');
var pristineIndex = require('../../index');
var MockUI = require('console-ui/mock');
var stripAnsi = require('strip-ansi');

function createIndex() {
  return Object.assign(
    {},
    pristineIndex,
    {
      manifestConfiguration: {
        display: 'standalone'
      },
      _disabled: function() {
        return false
      }
    });
}

describe('Unit: index', function() {
  describe('contentFor()', function() {
    it('returns link tag when section is "head"', function() {
      var expected = '<link rel="manifest" href="/manifest.webmanifest">';
      var index = createIndex();

      assert.ok(index.contentFor('head', { rootURL: '/' }).includes(expected));
    });

    it('returns empty when section is other than "head"', function() {
      var index = createIndex();

      assert.equal(index.contentFor('head-footer', { rootURL: '/' }), null);
    });

    it('uses rootURL config', function() {
      var expected = '<link rel="manifest" href="/foo/bar/manifest.webmanifest">';
      var index = createIndex();

      assert.ok(index.contentFor('head', { rootURL: '/foo/bar/' }).includes(expected));
    });

    it('returns apple meta tags', function() {
      var expected = '<meta name="apple-mobile-web-app-capable" content="yes">';
      var index = createIndex();

      assert.ok(index.contentFor('head', { rootURL: '/' }).includes(expected));
    });

    it('returns apple link tags', function() {
      var expected = '<link rel="apple-touch-icon" href="/foo/bar.png" sizes="180x180">';
      var index = createIndex();

      index.manifestConfiguration = {
        icons: [
          {
            src: '/foo/bar.png',
            sizes: '180x180'
          }
        ]
      };

      assert.ok(index.contentFor('head', { rootURL: '/' }).includes(expected));
    });

    it('returns empty meta tags when disabled', function() {
      var index = createIndex();
      index._disabled = function() { return true; };

      assert.ok(!index.contentFor('head', { rootURL: '/' }), 'Doesn\'t include meta tags when disabled');
    });
  });

  describe('treeForPublic()', function() {
    it('writes manifest validation warnings to the console', function() {
      var expected = 'WARNING: MANIFEST VALIDATION: Invalid "name" value type "number". Expected a string or undefined.';
      var index = createIndex();

      index.ui = new MockUI();
      index.manifestConfiguration = {
        name: 123
      };

      index.treeForPublic();

      assert.equal(stripAnsi(index.ui.output).trim(), expected);
    });
  });
});
