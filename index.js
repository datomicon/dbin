var cfg, onUp, run, servers;

cfg = require("./defaults.json");

run = require("childish-process").run;

onUp = require("on-up");

servers = require("./servers");

module.exports = {
  run: function(server) {
    var serve;
    serve = servers[server];
    if (serve.opts == null) {
      serve.opts = {};
    }
    console.log(serve.cmd);
    return run(serve.cmd, serve.opts);
  },
  gets: function(cb) {
    var test;
    test = "http://localhost:" + cfg.rest.port + "/data/" + cfg.rest.alias + "/";
    return onUp({
      req: {
        uri: test
      },
      dots: true
    }, function(res) {
      return cb(res);
    });
  }
};
