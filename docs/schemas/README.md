# Config

Object containing config details

The schema defines the following properties:

## `projects` (array)

The object is an array with all elements of the type `project`.

Default:

```
[]
```

## `envs` (array, required)

The object is an array with all elements of the type `env`.

Default:

```
[]
```

## `options` (options, required)

---

# Sub Schemas

The schema defines the following additional types:

## `project` (object)

Properties of the `project` object:

### `id`

The object must be one of the following types:

* `undefined`
* `undefined`

### `name` (string)

## `options` (object)

Object containing global options

Properties of the `options` object:

### `ribbon`

The object must be one of the following types:

* `undefined`
* `ribbon`

### `badge`

The object must be one of the following types:

* `undefined`
* `badge`

### `displayDomain` (boolean)

Default: `true`

## `env` (object)

Properties of the `env` object:

### `ribbon`

The object must be one of the following types:

* `undefined`
* `ribbon`

### `badge`

The object must be one of the following types:

* `undefined`
* `badge`

### `displayDomain` (boolean)

Default: `true`

### `shortName` (string)

### `name` (string)

### `url` (string, required)

Additional restrictions:

* Regex pattern: `^(https?|wss?|ftp)://`

### `project`

The object must be one of the following types:

* `undefined`
* `undefined`

## `badge` (object)

Properties of the `badge` object:

### `backgroundColor` (string)

Default: `"#2677c9"`

## `ribbon` (object)

Properties of the `ribbon` object:

### `color` (string)

Default: `"white"`

### `backgroundColor` (string)

Default: `"#2f2f2f"`

### `position` (string, enum)

This element must be one of the following enum values:

* `left`
* `right`

Default: `"right"`

### `type` (string, enum)

This element must be one of the following enum values:

* `corner-ribbon`
* `square-ribbon`

Default: `"corner-ribbon"`