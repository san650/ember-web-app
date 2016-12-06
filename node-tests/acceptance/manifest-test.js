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

    return app.create('dummy', {
        fixturesPath: 'node-tests/acceptance/fixtures'
      })
      .then(function() {
        return app.runEmberCommand('build');
      });
  });

  it('generates a manifest.json file', function() {
    return readFile(app.filePath('/dist/manifest.json'), { encoding: 'utf-8' })
      .then(function(content) {
        assert.deepEqual(JSON.parse(content), {
          name: 'dummy',
          short_name: 'dummy',
          description: '',
          start_url: '/',
          display: 'standalone',
          background_color: '#fff',
          theme_color: '#fff',
          icons: []
        });
      });
  });
});
