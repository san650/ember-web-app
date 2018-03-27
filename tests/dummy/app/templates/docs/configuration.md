# Configuration

## Disable

You can disable the addon by adding a configuration option to `ember-cli-build.js` build file.

```js
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var options = {
    'ember-web-app': {
      enabled: false
    }
  };

  var app = new EmberApp(defaults, options);

  return app.toTree();
};
```

## Fingerprint

You can add fingerprint checksum to your manifest.webmanifest file by configuring [broccoli-asset-rev](https://github.com/rickharrison/broccoli-asset-rev).

The following example prepends with a custom domain and adds fingerprint checksum to the manifest.webmanifest file.

`ember-cli-build.js`

```js
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var broccoliAssetRevDefaults = require( 'broccoli-asset-rev/lib/default-options' );

module.exports = function(defaults) {
  var options = {
    fingerprint: {
      extensions: broccoliAssetRevDefaults.concat(['webmanifest']),
      prepend: 'https://www.example.com/'
    }
  };

  var app = new EmberApp(defaults, options);

  return app.toTree();
};
```

Note that the `replaceExtensions` configuration from `broccoli-asset-rev` is updated internally by `ember-web-app` so you don't have to configure yourself on your project.

