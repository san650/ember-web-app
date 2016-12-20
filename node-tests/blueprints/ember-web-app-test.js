'use strict';

var blueprintHelpers = require('ember-cli-blueprint-test-helpers/helpers');
var setupTestHooks = blueprintHelpers.setupTestHooks;
var emberNew = blueprintHelpers.emberNew;
var emberGenerateDestroy = blueprintHelpers.emberGenerateDestroy;

var expect = require('ember-cli-blueprint-test-helpers/chai').expect;

describe('Blueprints: ember generate and destroy ember-web-app', function() {
  setupTestHooks(this);

  it('generates config/manifest.js file', function() {
    var args = ['ember-web-app', 'foo'];

    return emberNew()
      .then(() => emberGenerateDestroy(args, (file) => {
        expect(file('config/manifest.js'))
          .to.contain('name: "my-app"')
          .to.contain('short_name: "my-app"')
          .to.contain('display: "standalone"');
    }));
  });
});
