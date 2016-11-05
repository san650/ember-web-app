var testHelpers = require('broccoli-test-helpers');
var makeTestHelper = testHelpers.makeTestHelper;
var cleanupBuilders = testHelpers.cleanupBuilders;
var assert = require('assert');
var readFileSync = require('fs').readFileSync;
var path = require('path');

var ProcessManifest = require('../../lib/process-manifest');

describe('ProcessManifest', function() {
  var ProcessManifestHelper = makeTestHelper({
    fixturePath: __dirname,

    subject: function(inputNode, name, description) {
      return new ProcessManifest(inputNode, name, description);
    },
  });

  afterEach(function() {
    return cleanupBuilders();
  });

  it('replaces {{name}} and {{description}} tokens', function() {
    return ProcessManifestHelper('fixtures', 'foo bar name', 'foo bar description')
      .then(function(result) {
        assert.deepEqual(result.files, ['manifest.json']);
        return path.join(result.directory, result.files[0]);
      })
      .then(readManifest)
      .then(function(manifest) {
        assert.equal(manifest.name, 'foo bar name');
        assert.equal(manifest.short_name, 'foo bar name');
        assert.equal(manifest.description, 'foo bar description');
      });
  });
});

function readManifest(file) {
  return JSON.parse(
    readFileSync(
      file,
      'utf8'));
}
