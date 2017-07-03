'use strict';

var assert = require('assert');
var appleMetaTags = require('../../lib/apple-meta-tags');

describe('Unit: appleMetaTags()', function() {
  it('returns `web-app-capable` meta tag when display mode is fullscreen', function() {
    var manifest = {
      display: 'fullscreen'
    };
    var expected = '<meta name="apple-mobile-web-app-capable" content="yes">';

    var actual = appleMetaTags(manifest);

    assert.ok(actual.indexOf(expected) > -1);
  });

  it('returns `web-app-capable` meta tag when display mode is standalone', function() {
    var manifest = {
      display: 'standalone'
    };
    var expected = '<meta name="apple-mobile-web-app-capable" content="yes">';

    var actual = appleMetaTags(manifest);

    assert.ok(actual.indexOf(expected) > -1);
  });

  it('does not return `web-app-capable` meta tag when display mode is minimal-ui', function() {
    var manifest = {
      display: 'minimal-ui'
    };
    var notExpected = '<meta name="apple-mobile-web-app-capable" content="yes">';

    var actual = appleMetaTags(manifest);

    assert.ok(actual.indexOf(notExpected) === -1);
  });

  it('does not return `web-app-capable` meta tag when display mode is browser', function() {
    var manifest = {
      display: 'browser'
    };
    var notExpected = '<meta name="apple-mobile-web-app-capable" content="yes">';

    var actual = appleMetaTags(manifest);

    assert.ok(actual.indexOf(notExpected) === -1);
  });

  it('does not return `web-app-capable` meta tag when display mode is not defined', function() {
    var manifest = {};
    var notExpected = '<meta name="apple-mobile-web-app-capable" content="yes">';

    var actual = appleMetaTags(manifest);

    assert.ok(actual.indexOf(notExpected) === -1);
  });

  it('returns `web-app-title` meta tag', function() {
    var manifest = { name: 'foo bar' };
    var expected = '<meta name="apple-mobile-web-app-title" content="foo bar">';

    var actual = appleMetaTags(manifest);

    assert.ok(actual.indexOf(expected) > -1);
  });

  it("doesn't include `web-app-title` when manifest.name is not defined", function() {
    var manifest = {};
    var notExpected = 'apple-mobile-web-app-title';

    var actual = JSON.stringify(appleMetaTags(manifest));

    assert.ok(!actual.includes(notExpected));
  });

  it('returns `web-app-status-bar-style` meta tag with default value', function() {
    var manifest = {};
    var expected = '<meta name="apple-mobile-web-app-status-bar-style" content="default">';

    var actual = appleMetaTags(manifest);

    assert.ok(actual.indexOf(expected) > -1);
  });

  it('returns `web-app-status-bar-style` meta tag with custom value', function() {
    var manifest = {
      apple: {
        statusBarStyle: 'black-translucent'
      }
    };
    var expected = '<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">';

    var actual = appleMetaTags(manifest);

    assert.ok(actual.indexOf(expected) > -1);
  });

  it('returns empty array when apple is false', function() {
    var manifest = {
      display: 'fullscreen',
      apple: false
    };
    var expected = [];

    var actual = appleMetaTags(manifest);

    assert.deepEqual(actual, expected);
  });

  it('returns `format-detection` meta tag with disabled telephone', function() {
    var manifest = {
      apple: {
        formatDetection: {
          telephone: false
        }
      }
    };
    var expected = '<meta name="format-detection" content="telephone=no">';

    var actual = appleMetaTags(manifest);

    assert.ok(actual.indexOf(expected) > -1);
  });

  it("doesn't include `format-detection` when format detection is not provided", function() {
    var manifest = {
      apple: {}
    };
    var notExpected = 'format-detection';

    var actual = JSON.stringify(appleMetaTags(manifest));

    assert.ok(!actual.includes(notExpected));
  });
});
