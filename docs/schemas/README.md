# Config

Object containing config details

The schema defines the following properties:

## `projects` (array)

The object is an array with all elements of the type `project`.

Default:

```
[
  {
    "id": "Google"
  },
  {
    "id": "Yahoo",
    "name": "Yahoo"
  }
]
```

## `envs` (array, required)

The object is an array with all elements of the type `env`.

Default:

```
[
  {
    "shortName": "FR",
    "url": "https://www.google.fr/",
    "ribbon": {
      "backgroundColor": "#2519c7",
      "color": "pink",
      "type": "corner-ribbon"
    },
    "badge": {
      "backgroundColor": "#154785"
    },
    "project": "Google"
  },
  {
    "name": "ES",
    "url": "https://www.google.es/",
    "ribbon": false,
    "project": "Google"
  },
  {
    "shortName": "DE",
    "name": "Germany",
    "url": "https://www.google.de/",
    "ribbon": {
      "backgroundColor": "#1fab19"
    },
    "badge": false,
    "project": "Google"
  }
]
```

## `options` (object, required)

Global options

Default:

```
{
  "ribbon": {
    "type": "corner-ribbon",
    "color": "white",
    "backgroundColor": "#2f2f2f",
    "position": "right"
  },
  "badge": {
    "backgroundColor": "#2677c9"
  },
  "displayDomain": true,
  "displayHeader": true,
  "displayFooter": true,
  "displaySeeProjectsLink": true
}
```

---

# Sub Schemas

The schema defines the following additional types:

## `project` (object)

Properties of the `project` object:

### `id` (string,number, required)

### `name` (string)

## `options` (object)

Object containing global options

Properties of the `options` object:

### `ribbon`

The object must be one of the following types:

* `boolean`
* `ribbon`

### `badge`

The object must be one of the following types:

* `boolean`
* `badge`

### `displayDomain` (boolean)

Default: `true`

### `displayHeader` (boolean)

Default: `true`

### `displayFooter` (boolean)

Default: `true`

### `displaySeeProjectsLink` (boolean)

Default: `true`

## `env` (object)

Properties of the `env` object:

### `ribbon`

The object must be one of the following types:

* `boolean`
* `ribbon`

### `badge`

The object must be one of the following types:

* `boolean`
* `badge`

### `displayDomain` (boolean)

Default: `true`

### `shortName` (string)

### `name` (string)

### `url` (string, required)

Additional restrictions:

* Regex pattern: `^(https?|wss?|ftp)://`

### `project` (string,number)

## `badge` (object)

Properties of the `badge` object:

### `backgroundColor` (string)

Default: `"#2677c9"`

## `ribbon` (object)

Properties of the `ribbon` object:

### `type` (string, enum)

This element must be one of the following enum values:

* `corner-ribbon`
* `square-ribbon`

Default: `"corner-ribbon"`

### `color` (string)

Default: `"white"`

### `backgroundColor` (string)

Default: `"#2f2f2f"`

### `position` (string, enum)

This element must be one of the following enum values:

* `left`
* `right`

Default: `"right"`

## `boolean` (boolean)