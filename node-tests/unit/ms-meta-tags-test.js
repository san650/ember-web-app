'use strict';

var assert = require('assert');
var msMetaTags = require('../../lib/ms-meta-tags');

describe('Unit: msMetaTags()', function() {
  it('returns meta tag with the link to browserconfig.xml', function() {
    var manifest = {
      ms: true
    };
    var config = {};

    assert.deepEqual(
      msMetaTags(manifest, config, 'browserconfig.xml'),
      [
        '<meta name="msapplication-config" content="/browserconfig.xml">'
      ]
    );
  });

  it('uses rootURL if defined', function() {
    var manifest = {
      ms: true
    };
    var config = {
      rootURL: '/foo/bar/'
    };

    assert.deepEqual(
      msMetaTags(manifest, config, 'browserconfig.xml'),
      [
        '<meta name="msapplication-config" content="/foo/bar/browserconfig.xml">'
      ]
    );
  });

  it(`does not return the tag if 'ms' is falsey`, function() {
    var manifest = {};
    var config = {};

    assert.deepEqual(msMetaTags(manifest, config, 'browserconfig.xml'), []);
  });
});
