'use strict';

var assert = require('assert');
var androidMetaTags = require('../../lib/android-meta-tags');

describe('Unit: androidMetaTags()', function() {
  it('returns `theme-color` meta tag when it is defined', function() {
    var manifest = {
      theme_color: '#ff0000'
    };
    var expected = [
      '<meta name="theme-color" content="#ff0000">'
    ];

    assert.deepEqual(androidMetaTags(manifest), expected);
  });

  it('resturns empty array when `theme-color` is not defined', function() {
    var manifest = {};
    var expected = [];

    assert.deepEqual(androidMetaTags(manifest), expected);
  });
});
