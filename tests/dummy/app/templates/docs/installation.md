# Installation

```sh
$ ember install ember-web-app
```

This generates a config/manifest.js configuration file.

## Example

Having the following configuration file `config/manifest.js`

```js
module.exports = function() {
  return {
    name: "Let's Cook",
    short_name: "Let's Cook",
    description: "An app for organizing your weekly menu and groceries list.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffa105",
    theme_color: "#ffa105",

    icons: [
      {
        src: "/images/icons/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/images/icons/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png"
      },
      {
        src: "/images/icons/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
        targets: ['apple']
      },
      {
        src: "/images/icons/mstile-150x150.png",
        element: "square150x150logo",
        targets: ['ms']
      }
    ],

    apple: {
      statusBarStyle: 'black-translucent'
    },

    ms: {
      tileColor: '#ffffff'
    }
  }
}
```

It will generate the following meta tags

`index.html`

```html
<link rel="manifest" href="/manifest.webmanifest">

<link rel="apple-touch-icon" href="/images/icons/android-chrome-192x192-883114367f2d72fc9a509409454a1e73.png" sizes="192x192">
<link rel="apple-touch-icon" href="/images/icons/android-chrome-512x512-af3d768ff652dc2be589a3c22c6dc827.png" sizes="512x512">
<link rel="apple-touch-icon" href="/images/icons/apple-touch-icon-36cba25bc155e8ba414265f9d85861ca.png" sizes="180x180">

<meta name="theme-color" content="#ffa105">

<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="Let's Cook">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">

<meta name="msapplication-config" content="/browserconfig.xml">
```

and the following `manifest.webmanifest` file

```json
{
  "name": "Let's Cook",
  "short_name": "Let's Cook",
  "description": "An app for organizing your weekly menu and groceries list.",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffa105",
  "theme_color": "#ffa105",
  "icons": [
    {
      "src": "/images/icons/android-chrome-192x192-883114367f2d72fc9a509409454a1e73.png",
      "sizes": "192x192",
      "type":"image/png"
    },
    {
      "src": "/images/icons/android-chrome-512x512-af3d768ff652dc2be589a3c22c6dc827.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

and the following `browserconfig.xml` file

```xml
<?xml version="1.0"?>
<browserconfig>
  <msapplication>
    <tile>
      <square150x150logo src="/images/icons/mstile-150x150.png"/>
      <TileColor>#ffffff</TileColor>
    </tile>
  </msapplication>
</browserconfig>
```

