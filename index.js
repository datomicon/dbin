var DBin, merge, run;

merge = require("lodash").merge;

run = require("childish-process").run;

DBin = (function() {
  var Datomic, it;

  function DBin() {}

  it = null;

  DBin.prototype.cfg = {};

  DBin.use = function(opts) {
    var alias_uri, base_path, home;
    if (it == null) {
      if ((opts != null ? opts.defaults : void 0) !== false) {
        this.cfg = require("./defaults.json");
      }
      merge(this.cfg, opts);
      home = this.cfg.homeDir ? require("home-dir").directory + "/" : "";
      base_path = "" + home + this.cfg.located + "/datomic-" + this.cfg.edition + "-" + this.cfg.version;
      alias_uri = "" + this.cfg.rest.alias + " " + this.cfg.transactor.uri;
      this.cfg.transactor.cmd = "" + base_path + "/bin/transactor " + base_path + "/config/samples/free-transactor-template.properties";
      this.cfg.rest.cmd = "" + base_path + "/bin/rest -p " + this.cfg.rest.port + " " + alias_uri;
      this.cfg.rest.uri = "http://localhost:" + this.cfg.rest.port;
      this.cfg.rest.base = "" + this.cfg.rest.uri + "/data/" + this.cfg.rest.alias + "/";
      return it = new Datomic(this.cfg);
    }
  };

  Datomic = (function() {
    function Datomic(cfg) {
      this.cfg = cfg;
      this;
    }

    Datomic.prototype.run = function(server) {
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

    return Datomic;

  })();

  return DBin;

})();

module.exports = DBin;
