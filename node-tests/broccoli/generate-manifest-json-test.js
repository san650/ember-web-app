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

    subject: function(inputNode) {
      return new GenerateManifest(inputNode, { foo: 'bar', apple: 'baz', ms: 'qux' });
    },
  });

  afterEach(function() {
    return cleanupBuilders();
  });

  it('generates manifest.json file', function() {
    return GenerateManifestHelper('fixtures')
      .then(function(result) {
        assert.deepEqual(result.files, ['manifest.json']);
        return path.join(result.directory, result.files[0]);
      })
      .then(readManifest)
      .then(function(manifest) {
        assert.equal(manifest.foo, 'bar');
      });
  });

  it('ignores vendor specific files', function() {
    return GenerateManifestHelper('fixtures')
      .then(function(result) {
        assert.deepEqual(result.files, ['manifest.json']);
        return path.join(result.directory, result.files[0]);
      })
      .then(readManifest)
      .then(function(manifest) {
        assert.equal(manifest.foo, 'bar');
        assert.strictEqual(manifest.apple, undefined);
        assert.strictEqual(manifest.ms, undefined);
      });
  });
});

function readManifest(file) {
  return JSON.parse(
    readFileSync(
      file,
      'utf8'));
}
