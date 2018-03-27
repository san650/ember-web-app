# `name`

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
