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

  it('generates a manifest.json file', function() {
    return app
      .create('empty', {
        fixturesPath: 'node-tests/acceptance/fixtures'
      })
      .then(function() {
        return app.runEmberCommand('build')
      })
      .then(contentOf(app, 'dist/manifest.json'))
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
        fixturesPath: 'node-tests/acceptance/fixtures'
      })
      .then(function() {
        // WORKAROUND: ember-cli-addon-tests doesn't include in the
        // package.json packages installed with blueprint's addPackageToProject
        // are not copied when re-generating the app with a new name
        //
        // See https://github.com/tomdale/ember-cli-addon-tests/issues/27
        app.editPackageJSON(function(pkg) {
          pkg['devDependencies']['ember-web-app-rename'] = '*';
        });
      })
      .then(function() {
        return app.runEmberCommand('build', '--prod')
      })
      .then(contentOf(app, 'dist/manifest.json'))
      .then(assertJSON(app, {
        icons: [ { src: "pio-8911090226e7b5522790f1218f6924a5.png" } ]
      }))
      .then(contentOf(app, 'dist/fastbootAssetMap.json'))
      .then(assertJSON(app, { "pio.png": "pio-0987654321.png" }));
  });

  it('renames manifest.json', function() {
    return app
      .create('config-name', {
        fixturesPath: 'node-tests/acceptance/fixtures'
      })
      .then(function() {
        // WORKAROUND: ember-cli-addon-tests doesn't include in the
        // package.json packages installed with blueprint's addPackageToProject
        // are not copied when re-generating the app with a new name
        //
        // See https://github.com/tomdale/ember-cli-addon-tests/issues/27
        app.editPackageJSON(function(pkg) {
          pkg['devDependencies']['ember-web-app-rename'] = '*';
        });
      })
      .then(function() {
        return app.runEmberCommand('build')
      })
      .then(contentOf(app, 'dist/my-awesome-manifest.json'))
      .then(assertJSON(app, {
        name: 'foo'
      }))
      .then(contentOf(app, 'dist/index.html'))
      .then(function(content) {
        assert.ok(content.indexOf('href="/my-awesome-manifest.json"') > -1, 'index.html uses name from configuration');
      });
  });

  it('doesn\'t generate the manifest.json', function() {
    return app
      .create('disabled', {
        fixturesPath: 'node-tests/acceptance/fixtures'
      })
      .then(function() {
        // WORKAROUND: ember-cli-addon-tests doesn't include in the
        // package.json packages installed with blueprint's addPackageToProject
        // are not copied when re-generating the app with a new name
        //
        // See https://github.com/tomdale/ember-cli-addon-tests/issues/27
        app.editPackageJSON(function(pkg) {
          pkg['devDependencies']['ember-web-app-rename'] = '*';
        });
      })
      .then(function() {
        return app.runEmberCommand('build')
      })
      .then(function() {
        assert.ok(!fs.existsSync(app.filePath('dist/manifest.json')), 'Doesn\'t generate manifest.json file');
      })
      .then(contentOf(app, 'dist/index.html'))
      .then(function(content) {
        assert.ok(!content.includes('apple-touch-icon'), 'Doesn\'t include meta tags');
      });
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
