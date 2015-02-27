# dbin -- datomic/bin [![Build Status](https://img.shields.io/travis/datomicon/dbin.svg?style=flat)](https://travis-ci.org/datomicon/dbin)

Helps run [Datomic](http://datomic.com) servers with configuration.

## Why

To test libs, such as [datomiki](https://github.com/datomicon/datomiki),
and run Datomic servers - first for development, later on production.

## Install

[![NPM](https://nodei.co/npm/dbin.png?mini=true)](https://www.npmjs.org/package/dbin)

This `dbin` package should install
[datomic-free](https://www.npmjs.org/package/datomic-free) as well.

Running the console with datomic-free is possible, after a manual download.

Running datomic-pro servers works, after a manual download + custom config.

## Use

### cli

```sh
dbin help
```

### lib

```javascript
var d = require("dbin").use({"rest": {"port": 88}}).run("transactor").run("rest")
console.log(d.cfg)
```

### config

Here is an example for setting up datomic-pro:

```json
{
  "homeDir": false,
  "edition": "pro",
  "located": "datomic/pro",
  "version": "0.9.5052",
  "transactor":
    { "properties": "../../config/dev-transactor.cfg" }
}
```

Datomic is downloaded / extracted to `datomic/pro`, manually for now.
The transactor config is setup in `datomic/config`.
The above json config could be in `datomic/config`, or anywhere else.

So one can run `dbin -crt -o datomic/config/options.json`
to start the datomic console, rest server and transactor
with the fewest possible overrides.

See `defaults.json` for further configuration options.

## Testing [![Build Status](https://img.shields.io/travis/datomicon/dbin.svg?style=flat)](https://travis-ci.org/datomicon/dbin)

After `npm install -g batshit` one-time prerequisite:

1. `npm start`
2. `npm test`

## License

[MIT](http://orlin.mit-license.org)
