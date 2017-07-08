var assert = require('assert');
var RSVP = require('rsvp');
var fs = require('fs');
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

  it('generates a manifest.webmanifest file', function() {
    return app
      .create('empty', {
        fixturesPath: 'node-tests/acceptance/fixtures',
      })
      .then(function() {
        return app.runEmberCommand('build')
      })
      .then(contentOf(app, 'dist/manifest.webmanifest'))
      .then(assertJSON(app, {
        name: 'empty',
        short_name: 'empty',
        description: '',
        start_url: '/',
        display: 'standalone',
        background_color: '#fff',
        theme_color: '#fff',
        icons: [
        ]
      }));
  });

  it('configures broccoli-asset-rev', function() {
    return app
      .create('dummy', {
        fixturesPath: 'node-tests/acceptance/fixtures',
      })
      .then(function() {
        return app.runEmberCommand('build', '--prod')
      })
      .then(contentOf(app, 'dist/manifest.webmanifest'))
      .then(assertJSON(app, {
        icons: [ { src: "pio-8911090226e7b5522790f1218f6924a5.png" } ]
      }))
      .then(contentOf(app, 'dist/fastbootAssetMap.json'))
      .then(assertJSON(app, { "pio.png": "pio-0987654321.png" }));
  });

  it('doesn\'t generate the manifest.webmanifest', function() {
    return app
      .create('disabled', {
        fixturesPath: 'node-tests/acceptance/fixtures',
      })
      .then(function() {
        return app.runEmberCommand('build')
      })
      .then(function() {
        assert.ok(!fs.existsSync(app.filePath('dist/manifest.webmanifest')), 'Doesn\'t generate manifest.webmanifest file');
      })
      .then(contentOf(app, 'dist/index.html'))
      .then(function(content) {
        assert.ok(!content.includes('apple-touch-icon'), 'Doesn\'t include meta tags');
      });
  });

  it('uses rootURL configuration', function() {
    return app
      .create('config-root-url', {
        fixturesPath: 'node-tests/acceptance/fixtures',
      })
      .then(function() {
        return app.runEmberCommand('build')
      })
      .then(contentOf(app, 'dist/index.html'))
      .then(function(content) {
        assert.ok(content.indexOf('href="/foo/bar/baz/manifest.webmanifest"') > -1, 'index.html uses rootURL from configuration');
      });
  });

  it('uses fingerprint configuration for manifest', function() {
    return app
      .create('broccoli-asset-rev', {
        fixturesPath: 'node-tests/acceptance/fixtures',
      })
      .then(function() {
        return app.runEmberCommand('build', '--prod')
      })
      .then(contentOf(app, 'dist/index.html'))
      .then(function(content) {
        assert.ok(content.indexOf('href="https://www.example.com/manifest-ce65942fa306b3b532ff17cf85454f3d.webmanifest"') > -1, 'checksum fingerprint is added to manifest.webmanifest file');
        assert.ok(content.indexOf('href="https://www.example.com/pio-8911090226e7b5522790f1218f6924a5.png"') > -1, 'checksum fingerprint is added to image file');
      })
      .then(contentOf(app, 'dist/manifest-ce65942fa306b3b532ff17cf85454f3d.webmanifest'))
      .then(assertJSON(app, {
        icons: [ { src: "https://www.example.com/pio-8911090226e7b5522790f1218f6924a5.png" } ]
      }));
  });
});

function contentOf(app, path) {
  return function() {
    return fs.readFileSync(app.filePath(path), { encoding: 'utf-8' });
  };
}

function assertJSON(app, expected) {
  return function(actual) {
    assert.deepEqual(JSON.parse(actual), expected, 'assert JSON');
  };
}
