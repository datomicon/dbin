var bin, cmd, run, servers;

servers = require("./servers");

cmd = require("commander");

run = require("childish-process").run;

bin = function(server) {
  var serve;
  serve = servers[server];
  return console.log(serve);
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
