'use strict';

var assert = require('assert');
var pristineIndex = require('../../index');
var MockUI = require('console-ui/mock');
var stripAnsi = require('strip-ansi');

function createIndex() {
  return Object.assign({}, pristineIndex);
}

describe('Unit: index', function() {
  describe('contentFor()', function() {
    it('returns link tag when section is "head"', function() {
      var expected = '<link rel="manifest" href="/manifest.ember-web-app.json">';
      var index = createIndex();
      index.manifestConfiguration = {};

      assert.ok(index.contentFor('head', { rootURL: '/' }).includes(expected));
    });

    it('returns empty when section is other than "head"', function() {
      var index = createIndex();
      index.manifestConfiguration = {};
      assert.equal(index.contentFor('head-footer', { rootURL: '/' }), null);
    });

    it('uses rootURL config', function() {
      var expected = '<link rel="manifest" href="/foo/bar/manifest.ember-web-app.json">';
      var index = createIndex();
      index.manifestConfiguration = {};

      assert.ok(index.contentFor('head', { rootURL: '/foo/bar/' }).includes(expected));
    });

    it('returns apple meta tags', function() {
      var expected = '<meta name="apple-mobile-web-app-capable" content="yes">';
      var index = createIndex();
      index.manifestConfiguration = {};

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
