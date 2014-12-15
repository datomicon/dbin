var DBin, Instance, onUp, run, servers;

run = require("childish-process").run;

onUp = require("on-up");

servers = require("./servers");

DBin = (function() {
  function DBin() {}

  DBin.prototype.use = function(opts) {
    if ((opts != null ? opts.defaults : void 0) !== false) {
      this.cfg = require("./defaults.json");
    }
    return new Instance(this.cfg);
  };

  return DBin;

})();

Instance = (function() {
  function Instance(cfg) {
    this.cfg = cfg;
  }

  Instance.prototype.run = function(server) {
    var serve;
    serve = servers[server];
    if (serve.opts == null) {
      serve.opts = {};
    }
    console.log(serve.cmd);
    return run(serve.cmd, serve.opts);
  };

  Instance.prototype.gets = function(cb) {
    var test;
    test = "http://localhost:" + this.cfg.rest.port + "/data/" + this.cfg.rest.alias + "/";
    return onUp({
      req: {
        uri: test
      },
      dots: true
    }, function(res) {
      return cb(res);
    });
  };

  return Instance;

})();

module.exports = new DBin;
