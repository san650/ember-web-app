'use strict';

var assert = require('assert');
var includes = require('../../../lib/utils/includes');

describe('Unit: includes()', function() {
  it('returns false if the array is null', function() {
    assert.ok(!includes(null, 1));
  });

  it('returns true if the array contains the element', function() {
    assert.ok(includes([1, 2], 1));
  });

  it('returns false if the array does not contain the element', function() {
    assert.ok(!includes([1, 2], 3));
  });
});
