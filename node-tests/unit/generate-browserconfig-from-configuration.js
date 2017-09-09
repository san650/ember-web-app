'use strict';

const assert = require('assert');
const generateBrowserconfigFromConfiguration = require('../../lib/generate-browserconfig-from-configuration');

describe('Unit: generateBrowserconfigFromConfiguration()', function() {
  it(`generates the minimal browserconfig.xml if there are no icons with 'ms' target`, function() {
    const manifest = {};

    assert.equal(
      generateBrowserconfigFromConfiguration(manifest),
      '<?xml version="1.0"?><browserconfig><msapplication/></browserconfig>'
    );
  });

  it(`throws an error if it finds an icon with target 'ms' without the right 'element' property`, function() {
    const manifest = {
      icons: [
        {
          src: 'image.png',
          sizes: '150x150',
          targets: ['ms']
        }
      ]
    };

    assert.throws(
      function() {
        generateBrowserconfigFromConfiguration(manifest);
      }
    );
  });

  it(`throws an error if the icon is valid but there's no 'ms.tileColor' property`, function() {
    const manifest = {
      icons: [
        {
          src: 'image.png',
          sizes: '150x150',
          element: 'square150x150logo',
          targets: ['ms']
        }
      ]
    };

    assert.throws(
      function() {
        generateBrowserconfigFromConfiguration(manifest);
      }
    );
  });

  it(`adds each icon to the list of tiles`, function() {
    const manifest = {
      icons: [
        {
          src: 'mstile-150x150.png',
          element: 'square150x150logo',
          targets: ['ms']
        },
        {
          src: 'mstile-310x310.png',
          element: 'square310x310logo',
          targets: ['ms']
        }
      ],

      ms: {
        tileColor: '#ffffff'
      }
    };

    assert.equal(
      generateBrowserconfigFromConfiguration(manifest),
      `<?xml version="1.0"?><browserconfig><msapplication><tile><square150x150logo src="mstile-150x150.png"/><square310x310logo src="mstile-310x310.png"/><TileColor>#ffffff</TileColor></tile></msapplication></browserconfig>`
    );
  });
});
