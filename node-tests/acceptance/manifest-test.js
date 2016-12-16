var assert = require('assert');
var RSVP = require('rsvp');
var readFile = RSVP.denodeify(require('fs').readFile);
var AddonTestApp = require('ember-cli-addon-tests').AddonTestApp;

describe('Acceptance: manifest file generation', function() {
  this.timeout(300000);

  var app;

  before(function() {
    if (process.env.SKIP_ACCEPTANCE === 'true') {
      this.skip();
      return;
    }

    app = new AddonTestApp();
  });

  it('generates a manifest.ember-web-app.json file', function() {
    return app.create('empty', {
        fixturesPath: 'node-tests/acceptance/fixtures'
      })
      .then(function() {
        return app.runEmberCommand('build');
      })
      .then(function() {
        return readFile(app.filePath('/dist/manifest.ember-web-app.json'), { encoding: 'utf-8' });
      })
      .then(function(content) {
        assert.deepEqual(JSON.parse(content), {
          name: 'empty',
          short_name: 'empty',
          description: '',
          start_url: '/',
          display: 'standalone',
          background_color: '#fff',
          theme_color: '#fff',
          icons: [
          ]
        });
      });
  });

  it('configures broccoli-asset-rev', function() {
    return app.create('dummy', {
        fixturesPath: 'node-tests/acceptance/fixtures'
      })
      .then(function() {
        return app.runEmberCommand('build', '--prod');
      })
      .then(function() {
        return readFile(app.filePath('/dist/manifest.ember-web-app.json'), { encoding: 'utf-8' });
      })
      .then(function(content) {
        // fingerprint images
        assert.deepEqual(JSON.parse(content), {
          icons: [
            {
              src: "pio-8911090226e7b5522790f1218f6924a5.png"
            }
          ]
        });
      })
      .then(function() {
        return readFile(app.filePath('/dist/fastbootAssetMap.json'), { encoding: 'utf-8' });
      })
      .then(function(content) {
        // doesn't edit other .json files
        assert.deepEqual(JSON.parse(content), { "pio.png": "pio-0987654321.png" });
      });
  });
});
