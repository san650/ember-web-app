'use strict';

var assert = require('assert');
var configureFingerprint = require('../../lib/configure-fingerprint');

describe('Unit: configureFingerprint()', function() {
  it('returns `false` when current options is `false`', function() {
    assert.strictEqual(configureFingerprint(false), false);
  });

  it('returns safe configuration when options is undefined', function() {
    var expected = {
      replaceExtensions: ['html', 'css', 'js', 'webmanifest']
    };

    var actual = configureFingerprint(undefined, 'manifest.webmanifest');

    assert.deepEqual(actual, expected);
  });

  it('updates options', function() {
    var userOptions = {
      prepend: 'prefix',
      exclude: ['foo', 'bar'],
      replaceExtensions: ['baz']
    };
    var expected = {
      prepend: 'prefix',
      exclude: ['foo', 'bar'],
      replaceExtensions: ['baz', 'webmanifest']
    };

    var actual = configureFingerprint(userOptions, 'manifest.webmanifest');

    assert.deepEqual(actual, expected);
  });

  it('completes missing values using defaults', function() {
    var userOptions = {
      prepend: 'prefix'
    };
    var expected = {
      prepend: 'prefix',
      replaceExtensions: ['html', 'css', 'js', 'webmanifest']
    };

    var actual = configureFingerprint(userOptions, 'manifest.webmanifest');

    assert.deepEqual(actual, expected);
  });
});
