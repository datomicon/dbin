#!/usr/bin/env node

// Note: the script is run automatically as npm postinstall (aka install)

var def = require("./defaults.json")
var run = require("childish-process")

// installs dbin globally, if it isn't already there
run("./node_modules/.bin/install-g")

// TODO: This should be moved to `dbin.use`...  Especially since some will use
// datomic-pro, and shouldn't have to download datomic-free!
if (def.edition === "free") {
  // "&&" should prevent invalid symlink, could also run them in parallel, but
  // datomic-free use would take any string without checking for valid version
  run("datomic-free update " + def.version + " && " +
      "datomic-free use "    + def.version,
    {"cwd": process.cwd() + "/node_modules/datomic-free"})
}
