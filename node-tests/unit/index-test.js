/* jshint node: true */
'use strict';

var assert = require('assert');
var index = require('../../index');

describe('Unit: index', function() {
  describe('contentFor()', function() {
    it('returns link tag when section is "head"', function() {
      assert.equal(index.contentFor('head', { rootURL: '/' }), '<link rel="manifest" href="/manifest.json">');
    });

    it('returns empty when section is other than "head"', function() {
      assert.equal(index.contentFor('head-footer', { rootURL: '/' }), null);
    });

    it('uses rootURL config', function() {
      assert.equal(index.contentFor('head', { rootURL: '/foo/bar/' }), '<link rel="manifest" href="/foo/bar/manifest.json">');
    });
  });
});
