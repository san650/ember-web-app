/* jshint node: true */
'use strict';

var assert = require('assert');
var configureFingerprint = require('../../lib/configure-fingerprint');

describe('configureFingerprint()', function() {
  it('returns `false` when current options is `false`', function() {
    assert.strictEqual(configureFingerprint(false), false);
  });

  it('returns safe configuration when options is undefined', function() {
    var expected = {
      exclude: ['manifest.json'],
      replaceExtensions: ['html', 'css', 'js', 'json']
    };

    var actual = configureFingerprint(undefined);

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
      exclude: ['foo', 'bar', 'manifest.json'],
      replaceExtensions: ['baz', 'json']
    };

    var actual = configureFingerprint(userOptions);

    assert.deepEqual(actual, expected);
  });

  it('completes missing values using defaults', function() {
    var userOptions = {
      prepend: 'prefix'
    };
    var expected = {
      prepend: 'prefix',
      exclude: ['manifest.json'],
      replaceExtensions: ['html', 'css', 'js', 'json']
    };

    var actual = configureFingerprint(userOptions);

    assert.deepEqual(actual, expected);
  });
});
