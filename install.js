#!/usr/bin/env node

var def = require("./defaults.json");

if (def.edition === "free") {
  var child = require("childish-process");
  child.exe("./node_modules/.bin/install-g || true", function() {
    // datomic-free update depends on a global install
    // though either ok to fail (with || true)
    child.run("datomic-free update " + def.version,
      {"cwd": process.cwd() + "/node_modules/datomic-free"});
  });
}
