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

  it('includes icons with no target definition', function() {
    var expected = {
      icons: [
        {
          src: 'foo/bar.png',
          sizes: '120x120',
          type: 'image/png'
        }
      ]
    };

    var manifest = {
      icons: [
        {
          src: 'foo/bar.png',
          sizes: '120x120',
          type: 'image/png'
        }
      ]
    };

    assert.deepEqual(generateManifestFromConfiguration(manifest), expected);
  });

  it('filters icons that has a different target than manifest', function() {
    var expected = {
      icons: [
        {
          src: 'baz/qux.png',
          sizes: '120x120',
          type: 'image/png'
        }
      ]
    };

    var manifest = {
      icons: [
        {
          src: 'foo/bar.png',
          sizes: '120x120',
          type: 'image/png',
          targets: ['apple']
        },
        {
          src: 'baz/qux.png',
          sizes: '120x120',
          type: 'image/png',
          targets: ['manifest']
        }
      ]
    };

    assert.deepEqual(generateManifestFromConfiguration(manifest), expected);
  });
});
