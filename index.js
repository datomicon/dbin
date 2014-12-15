var DBin, Instance, merge, onUp, run;

merge = require("lodash").merge;

run = require("childish-process").run;

onUp = require("on-up");

DBin = (function() {
  function DBin() {}

  DBin.prototype.cfg = {};

  DBin.prototype.use = function(opts) {
    var alias_uri, base_path, home;
    if ((opts != null ? opts.defaults : void 0) !== false) {
      this.cfg = require("./defaults.json");
    }
    merge(this.cfg, opts);
    home = this.cfg.homeDir ? require('home-dir').directory + "/" : "";
    base_path = "" + home + this.cfg.located + "/datomic-" + this.cfg.edition + "-" + this.cfg.version;
    alias_uri = "" + this.cfg.rest.alias + " " + this.cfg.rest.uri;
    this.cfg.transactor.cmd = "" + base_path + "/bin/transactor " + base_path + "/config/samples/free-transactor-template.properties";
    this.cfg.rest.cmd = "" + base_path + "/bin/rest -p " + this.cfg.rest.port + " " + alias_uri;
    return new Instance(this.cfg);
  };

  return DBin;

})();

Instance = (function() {
  function Instance(cfg) {
    this.cfg = cfg;
    this;
  }

  Instance.prototype.run = function(server) {
    var serve;
    serve = this.cfg[server];
    if (serve != null) {
      if (serve.opts == null) {
        serve.opts = {};
      }
      console.log(serve.cmd);
      return run(serve.cmd, serve.opts);
    }
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
