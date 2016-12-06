/* jshint node: true */
'use strict';

var assert = require('assert');
var generateManifestFromConfiguration = require('../../lib/generate-manifest-from-configuration');

describe('Unit: generateManifestFromConfiguration()', function() {
  it('filters custom "apple" property', function() {
    var manifest = {
      apple: 'apple'
    };

    assert.deepEqual(generateManifestFromConfiguration(manifest), {});
  });

  it('filters custom "ms" property', function() {
    var manifest = {
      ms: 'ms'
    };

    assert.deepEqual(generateManifestFromConfiguration(manifest), {});
  });

  it('returns manifest properties', function() {
    var manifest = {
      foo: 'bar'
    };

    assert.deepEqual(generateManifestFromConfiguration(manifest), { foo: 'bar' });
  });
});
