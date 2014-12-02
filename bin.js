var bin, cmd, exe, run, servers, _ref;

servers = require("./servers");

cmd = require("commander");

_ref = require("childish-process"), exe = _ref.exe, run = _ref.run;

bin = function(server) {
  var serve;
  serve = servers[server];
  if (serve.opts == null) {
    serve.opts = {};
  }
  console.log(serve.cmd);
  return run(serve.cmd, serve.opts);
};

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
