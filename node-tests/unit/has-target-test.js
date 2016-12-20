'use strict';

var assert = require('assert');
var hasTarget = require('../../lib/has-target');

describe('Unit: hasTarget()', function() {
  it('returns false when object is undefined', function() {
    var object = undefined;

    assert.ok(!hasTarget(object, 'foo'));
  });

  it('returns true when object.targets contains the target', function() {
    var object = {
      targets: ['foo']
    };

    assert.ok(hasTarget(object, 'foo'));
  });

  it('returns false when object.targets does not contain the target', function() {
    var object = {
      targets: ['bar']
    };

    assert.ok(!hasTarget(object, 'foo'));
  });
});
