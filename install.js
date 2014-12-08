#!/usr/bin/env node

var def = require("./defaults.json");
var child = require("childish-process");

// installs dbin globally, if it isn't already there
child.run("./node_modules/.bin/install-g");

if (def.edition === "free") {
  // "&&" should prevent invalid symlink, could also run them in parallel, but
  // datomic-free use would take any string without checking for valid version
  child.run("datomic-free update " + def.version + " && " +
            "datomic-free use "    + def.version,
    {"cwd": process.cwd() + "/node_modules/datomic-free"});
}
