'use strict';

let assert = require('assert');
let fs = require('fs');
let AddonTestApp = require('ember-cli-addon-tests').AddonTestApp;

describe('Acceptance: browserconfig file generation', function() {
  this.timeout(300000);

  let app;

  before(function() {
    if (process.env.SKIP_ACCEPTANCE === 'true') {
      this.skip();
      return;
    }

    app = new AddonTestApp();
  });

  it('generates a browserconfig.xml file', function() {
    return app
      .create('empty', {
        fixturesPath: 'node-tests/acceptance/fixtures',
      })
      .then(function() {
        return app.runEmberCommand('build')
      })
      .then(contentOf(app, 'dist/browserconfig.xml'))
      .then(function(content) {
        assert.equal(
          content,
          '<?xml version="1.0"?><browserconfig><msapplication/></browserconfig>'
        );
      });
  });

  it('configures broccoli-asset-rev', function() {
    return app
      .create('dummy', {
        fixturesPath: 'node-tests/acceptance/fixtures',
      })
      .then(function() {
        return app.runEmberCommand('build', '--prod')
      })
      .then(contentOf(app, 'dist/browserconfig.xml'))
      .then(function(content) {
        assert.equal(
          content,
          '<?xml version="1.0"?><browserconfig><msapplication><tile><square150x150logo src="pio-8911090226e7b5522790f1218f6924a5.png"/><TileColor>#FFFFFF</TileColor></tile></msapplication></browserconfig>'
        );
      })
      .then(contentOf(app, 'dist/fastbootAssetMap.json'))
      .then(assertJSON(app, { "pio.png": "pio-0987654321.png" }));
  });

  it(`doesn't generate browserconfig when disabled`, function() {
    return app
      .create('disabled', {
        fixturesPath: 'node-tests/acceptance/fixtures',
      })
      .then(function() {
        return app.runEmberCommand('build')
      })
      .then(function() {
        assert.ok(
          !fs.existsSync(app.filePath('dist/browserconfig.xml')),
          `Doesn't generate browserconfig.xml file`
        );
      })
      .then(contentOf(app, 'dist/index.html'))
      .then(function(content) {
        assert.ok(
          !content.includes('msapplication-config'),
          `Doesn't include meta tags`
        );
      });
  });

  it(`doesn't generate browserconfig when 'ms' is falsey`, function() {
    return app
      .create('no-ms', {
        fixturesPath: 'node-tests/acceptance/fixtures',
      })
      .then(function() {
        return app.runEmberCommand('build')
      })
      .then(function() {
        assert.ok(
          !fs.existsSync(app.filePath('dist/browserconfig.xml')),
          `Doesn't generate browserconfig.xml file`
        );
      })
      .then(contentOf(app, 'dist/index.html'))
      .then(function(content) {
        assert.ok(
          !content.includes('msapplication-config'),
          `Doesn't include meta tags`
        );
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
        assert.ok(
          content.indexOf('content="/foo/bar/baz/browserconfig.xml"') > -1,
          'index.html uses rootURL from configuration'
        );
      });
  });

  it('uses fingerprint configuration for browserconfig', function() {
    return app
      .create('broccoli-asset-rev', {
        fixturesPath: 'node-tests/acceptance/fixtures',
      })
      .then(function() {
        return app.runEmberCommand('build', '--prod')
      })
      .then(contentOf(app, 'dist/browserconfig.xml'))
      .then(function(content) {
        assert.equal(
          content,
          '<?xml version="1.0"?><browserconfig><msapplication><tile><square150x150logo src="https://www.example.com/pio-8911090226e7b5522790f1218f6924a5.png"/><TileColor>#FFFFFF</TileColor></tile></msapplication></browserconfig>'
        );
      })
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
