var testHelpers = require('broccoli-test-helpers');
var makeTestHelper = testHelpers.makeTestHelper;
var cleanupBuilders = testHelpers.cleanupBuilders;
var assert = require('assert');
var readFileSync = require('fs').readFileSync;
var path = require('path');

var GenerateManifest = require('../../lib/broccoli/generate-manifest-json');

describe('Broccoli: ProcessManifest', function() {
  var GenerateManifestHelper = makeTestHelper({
    fixturePath: __dirname,

    subject: function() {
      return new GenerateManifest({ foo: 'bar', apple: 'baz', ms: 'qux' }, 'manifest.webmanifest');
    },
  });

  afterEach(function() {
    return cleanupBuilders();
  });

  it('generates manifest.webmanifest file', function() {
    return GenerateManifestHelper()
      .then(function(result) {
        assert.deepEqual(result.files, ['manifest.webmanifest']);
        return path.join(result.directory, result.files[0]);
      })
      .then(readManifest)
      .then(function(manifest) {
        assert.equal(manifest.foo, 'bar');
      });
  });
});

function readManifest(file) {
  return JSON.parse(
    readFileSync(
      file,
      'utf8'));
}
