# dbin -- datomic/bin [![Build Status](https://img.shields.io/travis/datomicon/dbin.svg?style=flat)](https://travis-ci.org/datomicon/dbin)

Helps run [Datomic](http://datomic.com) servers with configuration.

## Why

To test libs, such as [datomiki](https://github.com/datomicon/datomiki),
and run Datomic servers - first for development, later on production.

## Install

[![NPM](https://nodei.co/npm/dbin.png?mini=true)](https://www.npmjs.org/package/dbin)

This `dbin` package should install
[datomic-free](https://www.npmjs.org/package/datomic-free) as well.

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

## Testing [![Build Status](https://img.shields.io/travis/datomicon/dbin.svg?style=flat)](https://travis-ci.org/datomicon/dbin)

1. `dbin -rt`
2. `npm test`

## License

[MIT](http://orlin.mit-license.org)
