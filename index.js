var DBin, merge, run;

require("source-map-support").install();

merge = require("lodash.merge");

run = require("childish-process");

DBin = (function() {
  var Datomic, it;

  function DBin() {}

  it = null;

  DBin.prototype.cfg = {};

  DBin.use = function(opts) {
    var alias_uri, base, base_path, home, protocol, stp;
    if (it == null) {
      if ((opts != null ? opts.defaults : void 0) !== false) {
        this.cfg = require("./defaults.json");
      }
      merge(this.cfg, opts);
      home = this.cfg.homeDir ? require("home-dir").directory + "/" : "";
      base_path = "" + home + this.cfg.located + "/datomic-" + this.cfg.edition + "-" + this.cfg.version;
      alias_uri = this.cfg.rest.alias + " " + this.cfg.transactor.uri;
      if (this.cfg.transactor.properties == null) {
        protocol = this.cfg.edition === "free" ? "free" : "dev";
        stp = base_path + "/config/samples/" + protocol + "-transactor-template.properties";
        this.cfg.transactor.properties = stp;
      }
      this.cfg.transactor.cmd = base_path + "/bin/transactor " + this.cfg.transactor.properties;
      this.cfg.rest.cmd = base_path + "/bin/rest -p " + this.cfg.rest.port + " " + alias_uri;
      this.cfg.rest.uri = "http://localhost:" + this.cfg.rest.port;
      this.cfg.rest.base = this.cfg.rest.uri + "/data/" + this.cfg.rest.alias + "/";
      if ((base = this.cfg.console).path == null) {
        base.path = base_path + "/bin/console";
      }
      this.cfg.console.cmd = this.cfg.console.path + " -p " + this.cfg.console.port + " " + alias_uri;
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
        run(serve.cmd, serve.opts);
      }
      return this;
    };

    return Datomic;

  })();

  return DBin;

})();

module.exports = DBin;

//# sourceMappingURL=maps/index.js.map