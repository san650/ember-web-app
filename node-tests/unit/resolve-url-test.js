'use strict';

var assert = require('assert');
var resolveURL = require('../../lib/resolve-url');

describe('Unit: resolveURL()', function() {
  it('returns original URL when it\'s absolute', function() {
    assert.equal(resolveURL("/", "http://www.example.com/"), "http://www.example.com/");
    assert.equal(resolveURL("/", "https://www.example.com/"), "https://www.example.com/");
  });

  it('prepends original URL when it\'s relative', function() {
    assert.equal(resolveURL("/", "/foo"), "/foo");
    assert.equal(resolveURL("https://www.example.com/", "/bar"), "https://www.example.com/bar");
  });
});
