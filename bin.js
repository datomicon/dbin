var bin, cmd, exe, onUp, opts, run, servers, _ref;

servers = require("./servers");

cmd = require("commander");

_ref = require("childish-process"), exe = _ref.exe, run = _ref.run;

opts = require("./defaults.json");

onUp = require("on-up");

bin = function(server) {
  var serve;
  serve = servers[server];
  if (serve.opts == null) {
    serve.opts = {};
  }
  console.log(serve.cmd);
  return run(serve.cmd, serve.opts);
};

cmd.command("gets-ok?").description("get the rest api alias and report with a yes or not").action(function() {
  var test;
  test = "http://localhost:" + opts.rest.port + "/data/" + opts.rest.alias + "/";
  return onUp({
    req: {
      uri: test
    },
    dots: true
  }, function(res) {
    if (res.statusCode === 200) {
      console.log("yes");
      return process.exit(0);
    } else {
      console.log("not");
      return process.exit(1);
    }
  });
});

cmd.option("-r, --rest", "start the rest server").option("-t, --transactor", "start the transactor").parse(process.argv);

if (process.argv.length > 2) {
  if (cmd.transactor) {
    bin("transactor");
  }
  if (cmd.rest) {
    bin("rest");
  }
} else {
  cmd.help();
}
