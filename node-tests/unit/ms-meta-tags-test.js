'use strict';

var assert = require('assert');
var msMetaTags = require('../../lib/ms-meta-tags');

describe('Unit: msMetaTags()', function() {
  it('returns meta tag with the link to browserconfig.xml', function() {
    var manifest = {};
    var config = {};
    var expected = [
      '<meta name="msapplication-config" content="/browserconfig.xml">'
    ];

    assert.deepEqual(msMetaTags(config, 'browserconfig.xml'), expected);
  });

  it('uses rootURL if defined', function() {
    var manifest = {};
    var config = {
      rootURL: '/foo/bar/'
    };
    var expected = [
      '<meta name="msapplication-config" content="/foo/bar/browserconfig.xml">'
    ];

    assert.deepEqual(msMetaTags(config, 'browserconfig.xml'), expected);
  });
});
