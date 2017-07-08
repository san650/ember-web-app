# ember-web-app
[![Build Status](https://travis-ci.org/san650/ember-web-app.svg?branch=master)](https://travis-ci.org/san650/ember-web-app)
[![Ember Observer Score](https://emberobserver.com/badges/ember-web-app.svg)](https://emberobserver.com/addons/ember-web-app)

This Ember addon helps you configure and manage the web app manifest and related meta tags needed to create a Progressive Web Application

From [MDN](https://developer.mozilla.org/en-US/docs/Web/Manifest)

> The web app manifest provides information about an application (such as name,
> author, icon, and description) in a text file. The purpose of the manifest is
> to install web applications to the homescreen of a device, providing users
> with quicker access and a richer experience.

Addon features:

* Generates a manifest.ember-web-app.json file using a JavaScript template
* Uses fingerprint for images
* Generates equivalent meta tags for supporting other devices (e.g. iPhone)
* Validates the configuration

Here's a brief list of the main missing features that we intend to add in the future.

* Generate image variants for different devices
* Generate Microsoft's browserconfig.xml manifest for Win8/Win10 integration

See the [documentation](#documentation) section below for more information.

## Table of content

* [Installation](#installation)
* [Example](#example)
* [Configuration](#configuration)
  * [Disable](#disable)
  * [Fingerprint](#fingerprint)
* [API documentation](#api-documentation)
  * [`name`](#name)
  * [`short_name`](#short_name)
  * [`background_color`](#background_color)
  * [`description`](#description)
  * [`dir`](#dir)
  * [`display`](#display)
  * [`icons`](#icons)
  * [`lang`](#lang)
  * [`orientation`](#orientation)
  * [`prefer_related_applications`](#prefer_related_applications)
  * [`related_applications`](#related_applications)
  * [`scope`](#scope)
  * [`start_url`](#start_url)
  * [`theme_color`](#theme_color)
  * [`apple`](#apple)
    * [`apple.statusBarStyle`](#applestatusbarstyle)
    * [`apple.precomposed`](#appleprecomposed)
    * [`apple.formatDetection`](#appleformatdetection)
* [Development](#development)
* [Project's health](#projects-health)
* [License](#license)

## Installation

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
      }
    ],

    apple: {
      statusBarStyle: 'black-translucent'
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

## Configuration

### Disable

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

### Fingerprint

You can add fingerprint checksum to your manifest.webmanifest file by configuring [broccoli-asset-rev](https://github.com/rickharrison/broccoli-asset-rev).

The following example prepends with a custom domain and adds fingerprint checksum to the manifest.webmanifest file.

`ember-cli-build.js`

```js
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var defaultExtensions = ['js', 'css', 'png', 'jpg', 'gif', 'map'];
  var options = {
    fingerprint: {
      extensions: defaultExtensions.concat(['webmanifest']),
      prepend: 'https://www.example.com/'
    }
  };

  var app = new EmberApp(defaults, options);

  return app.toTree();
};
```

Note that the `replaceExtensions` configuration from `broccoli-asset-rev` is updated internally by `ember-web-app` so you don't have to configure yourself on your project.

## API documentation

This Ember addon generates a [Web Application Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest) at build time using the `config/manifest.js` configuration file.

It also generates some compatibility meta tags for supporting vendor specific web application features like Apple's [Web Content For Safari](https://developer.apple.com/library/content/documentation/AppleApplications/Reference/SafariWebContent/Introduction/Introduction.html) and Microsoft's [Browser configuration schema](https://msdn.microsoft.com/en-us/library/dn320426%28v=vs.85%29.aspx) that don't yet support the Web Application Manifest standard.

Internally, this addon takes into account four different types of targets for generating the web app manifest taking care of including some backward compatibility meta tags in order to support as many devices and browsers as possible. These targets are:

* manifest (default target)
* apple (to target iOS devices)
* ms (to target Win8/Win10 devices)
* android (to target options specific for android devices)

Not all targets are used for all properties (actually, most properties are not affected by the targets).

### List of supported properties.

* [`name`](#name)
* [`short_name`](#short_name)
* [`background_color`](#background_color)
* [`description`](#description)
* [`dir`](#dir)
* [`display`](#display)
* [`icons`](#icons)
* [`lang`](#lang)
* [`orientation`](#orientation)
* [`prefer_related_applications`](#prefer_related_applications)
* [`related_applications`](#related_applications)
* [`scope`](#scope)
* [`start_url`](#start_url)
* [`theme_color`](#theme_color)
* [`apple.statusBarStyle`](#applestatusbarstyle)

#### `name`

> Provides a human-readable name for the application as it is intended to be displayed to the user, for example among a list of other applications or as a label for an icon.

Example

```js
manifest.name = "dummy";
```

| Target     | Generates |
| ---        | ---       |
| `manifest` | `{ "name": "dummy" }`
| `apple`    | `<meta name="apple-mobile-web-app-title" content="dummy">`
| `ms`       | `<meta name="application-name" content="dummy">`
| `android`  | does not apply

#### `short_name`

> Provides a short human-readable name for the application. This is intended for use where there is insufficient space to display the full name of the web application.

Example

```js
manifest.short_name = "dummy";
```

| Target     | Generates |
| ---        | ---       |
| `manifest` | `{ "short_name": "dummy" }`
| `apple`    | does not apply
| `ms`       | does not apply
| `android`  | does not apply

#### `background_color`

> Defines the expected background color for the web application.

Example

```js
manifest.background_color = "#fff";
```

| Target     | Generates |
| ---        | ---       |
| `manifest` | `{ "background_color": "#fff" }`
| `apple`    | does not apply
| `ms`       | does not apply
| `android`  | does not apply

#### `description`

> Provides a general description of what the web application does.

Example

```js
manifest.description = "Lorem ipsum dolor";
```

| Target     | Generates |
| ---        | ---       |
| `manifest` | `{ "description": "Lorem ipsum dolor" }`
| `apple`    | does not apply
| `ms`       | does not apply
| `android`  | does not apply

#### `dir`

> Specifies the primary text direction for the `name`, `short_name`, and description members.

Possible values:
  * ltr (left-to-right)
  * rtl (right-to-left)
  * auto

Example

```js
manifest.dir = "ltr";
```

| Target     | Generates |
| ---        | ---       |
| `manifest` | `{ "dir": "ltr" }`
| `apple`    | does not apply
| `ms`       | does not apply
| `android`  | does not apply

#### `display`

> Defines the developer's preferred display mode for the web application.

Possible values:
  * fullscreen
  * standalone
  * minimal-ui
  * browser

The default value for `display` is `browser` when is not defined.

Example

```js
manifest.display = "fullscreen";
```

| Target     | Generates |
| ---        | ---       |
| `manifest` | `{ "display": "fullscreen" }`
| `apple`    | `<meta name="apple-mobile-web-app-capable" content="yes">`
| `ms`       | does not apply
| `android`  | does not apply

__Note that for iOS the meta tag will be render with value `yes` only when display is `fullscreen` or `standalone`.__

#### `icons`

> Specifies an array of image objects that can serve as application icons in various contexts. For example, they can be used to represent the web application amongst a list of other applications, or to integrate the web application with an OS's task switcher and/or system preferences.

Image object members:
  * `src` The path to the image file.
  * `sizes` A string containing space-separated image dimensions.
  * `type` A hint as to the media type of the image.
  * `targets` **Non standard** Targets for the images. ['manifest', 'apple'] by default.

Example

```js
icons: [
  {
    src: '/foo/bar.png',
    sizes: '180x180'
  },
  {
    src: '/bar/baz.png',
    sizes: '280x280',
    targets: ['apple']  // non-standard property
  },
  {
    src: '/bar/fav.png',
    sizes: '32x32',
    targets: ['favicon']
  }
];
```

| Target     | Generates |
| ---        | ---       |
| `manifest` | `{ "icons": [ { "src": "/foo/bar.png", "sizes": "180x180" } ] }`
| `apple`    | `<link rel="apple-touch-icon" href="/foo/bar.png" sizes="180x180">` `<link rel="apple-touch-icon" href="/foo/bar.png" sizes="280x280">`
| `ms`       | does not apply (for now)
| `android`  | does not apply
| `favicon`  | `<link rel="icon" href="/bar/fav.png" sizes="32x32">`

#### `lang`

> Specifies the primary language for the values in the name and short_name members.

Example

```js
manifest.lang = "es-UY";
```

| Target     | Generates |
| ---        | ---       |
| `manifest` | `{ "lang": "es-UY" }`
| `apple`    | does not apply
| `ms`       | does not apply
| `android`  | does not apply

#### `orientation`

> Defines the default orientation for all the web application's top level browsing contexts.

Possible values:
  * any
  * natural
  * landscape
  * landscape-primary
  * landscape-secondary
  * portrait
  * portrait-primary
  * portrait-secondary

Example

```js
manifest.orientation = "portrait";
```

| Target     | Generates |
| ---        | ---       |
| `manifest` | `{ "orientation": "portrait" }`
| `apple`    | does not apply
| `ms`       | does not apply
| `android`  | does not apply

#### `prefer_related_applications`

> Specifies a boolean value that hints for the user agent to indicate to the user that the specified related applications are available, and recommended over the web application.

Possible values:
  * true
  * false

Example

```js
manifest.prefer_related_applications = true;
```

| Target     | Generates |
| ---        | ---       |
| `manifest` | `{ "prefer_related_applications": true }`
| `apple`    | does not apply
| `ms`       | does not apply
| `android`  | does not apply

#### `related_applications`

> Specifies an array of "application objects" representing native applications that are installable by, or accessible to, the underlying platform.

Application object members:
  * `platform` The platform on which the application can be found.
  * `url` The URL at which the application can be found.
  * `id` The ID used to represent the application on the specified platform.

Example

```js
manifest.prefer_related_applications = true;
manifest.related_applications = [
  {
    "platform": "itunes",
    "url": "https://itunes.apple.com/app/example-app1/id123456789"
  }
];
```

| Target     | Generates |
| ---        | ---       |
| `manifest` | `{ "prefer_related_applications": true, "related_applications": [{"platform": "itunes", "url": "https://itunes.apple.com/app/example-app1/id123456789" }] }`
| `apple`    | does not apply
| `ms`       | does not apply
| `android`  | does not apply

#### `scope`

> Defines the navigation scope of this web application's application context. This basically restricts what web pages can be viewed while the manifest is applied.

Example

```js
manifest.scope = "/myapp/";
```

| Target     | Generates |
| ---        | ---       |
| `manifest` | `{ "scope": "/myapp/" }`
| `apple`    | does not apply
| `ms`       | does not apply
| `android`  | does not apply

#### `start_url`

> Specifies the URL that loads when a user launches the application from a device.

Example

```js
manifest.start_url = "./?utm_source=web_app_manifest";
```

| Target     | Generates |
| ---        | ---       |
| `manifest` | `{ "start_url": "./?utm_source=web_app_manifest" }`
| `apple`    | does not apply
| `ms`       | does not apply
| `android`  | does not apply

#### `theme_color`

> Defines the default theme color for an application. This sometimes affects how the application is displayed by the OS.

Example

```js
manifest.theme_color = "aliceblue";
```

| Target     | Generates |
| ---        | ---       |
| `manifest` | `{ "theme_color": "aliceblue" }`
| `apple`    | does not apply
| `ms`       | does not apply
| `android`  | `<meta name="theme-color" content="aliceblue">`

### Vendor specific properties (non-standard)

#### `apple`

> Turns on/off the generation of apple specific meta and link tags.

Possible values:
  * `true` Turn on. This is the default value.
  * `false` Turn off.
  * An object with custom settings (see the settings below)

Example

```js
manifest.apple = false;
```

| Target     | Generates |
| ---        | ---       |
| `manifest` | `{ "apple": false }`
| `apple`    | __returns an empty string__
| `ms`       | does not apply
| `android`  | does not apply

#### `apple.statusBarStyle`

> Sets the style of the status bar for a web application in iOS

See [Changing the Status Bar Appearance](https://developer.apple.com/library/content/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html#//apple_ref/doc/uid/TP40002051-CH3-SW1)

Possible values:
  * `default` The status bar appears normal.
  * `black` The status bar has a black background.
  * `black-translucent` The status bar is black and translucent.

Note that if set to default or black, the web content is displayed below the status bar. If set to black-translucent, the web content is displayed on the entire screen, partially obscured by the status bar.

Example

```js
manifest.apple = {
 statusBarStyle: 'black-translucent'
};
```

| Target     | Generates |
| ---        | ---       |
| `manifest` | does not apply
| `apple`    | `<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">`
| `ms`       | does not apply
| `android`  | does not apply

#### `apple.precomposed`

> Adds `precomposed` suffix to apple touch icons

See [Precomposed Keyword for apple touch icons](https://mathiasbynens.be/notes/touch-icons#effects)

Possible values:
  * `true` Adds precomposed suffix.
  * `false` (default) Does not add precomposed suffix.

Example

```js
manifest.apple = {
 precomposed: 'true'
};
```

| Target     | Generates |
| ---        | ---       |
| `manifest` | does not apply
| `apple`    | `<link rel="apple-touch-icon-precomposed" href="/images/icons/apple-touch-icon-192x192.png" sizes="192x192">`
| `ms`       | does not apply
| `android`  | does not apply

#### `apple.formatDetection`

> Adds `format-detection` meta tag if needed

See [Safari HTML Reference](https://developer.apple.com/library/content/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/MetaTags.html#//apple_ref/doc/uid/TP40008193-SW5)

Possible values:
  * An object with following settings
    * `telephone: false` Disables automatic phone number detection.

Example

```js
manifest.apple = {
 formatDetection: {
   telephone: false
 }
};
```

| Target     | Generates |
| ---        | ---       |
| `manifest` | does not apply
| `apple`    | `<meta name="format-detection" content="telephone=no">`
| `ms`       | does not apply
| `android`  | does not apply

## Development

```sh
$ git clone https://github.com/san650/ember-web-app.git
$ cd $_
$ yarn          # (or npm install)
$ bower install
```

Running tests

```sh
$ npm test
```

## Project's health

[![Build Status](https://travis-ci.org/san650/ember-web-app.svg?branch=master)](https://travis-ci.org/san650/ember-web-app)
[![Ember Observer Score](https://emberobserver.com/badges/ember-web-app.svg)](https://emberobserver.com/addons/ember-web-app)

## License

ember-web-app is licensed under the MIT license.

See [LICENSE](./LICENSE) for the full license text.
