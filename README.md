# dbin -- datomic/bin

[![NPM](https://nodei.co/npm/dbin.png?mini=true)](https://www.npmjs.org/package/dbin)

Helps run [Datomic](http://datomic.com) servers with configuration.

## Why

To test [datomiki](https://github.com/datomicon/datomiki) for starters.

Later, to run datomic servers - whether for development or in production.

## Install

This `dbin` package should install
[datomic-free](https://www.npmjs.org/package/datomic-free) as well.

## Use

### cli

Here are some example commands:

* $ `dbin` - get help without options
* $ `dbin -tr` - start the transactor and rest servers
* $ `dbin gets-ok?` - wait-up for the servers to start / answer with yes or no

### lib

```javascript
var d = require('dbin').use().run("transactor").run("rest")
console.log(d.cfg)
```

## Testing [![Build Status](https://secure.travis-ci.org/datomicon/dbin.png)](http://travis-ci.org/datomicon/dbin)

1. `dbin -rt`
2. `npm test`

## License

[MIT](http://orlin.mit-license.org)
