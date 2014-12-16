var args, cmd, cmds, d, help, onUp, yargs, _;

yargs = require("yargs");

_ = require("lodash");

onUp = require("on-up");

d = require("./index.js").use();

args = yargs.usage("Usage: $0 [command] [-options]").example("$0 -rt", "same as $ dbin start --transactor --rest").boolean(["t", "r"]).alias("t", "transactor").describe("t", "applies to the transactor").alias("r", "rest").describe("r", "applies to the rest server").argv;

cmd = _.size(args._) ? args._[0] : "start";

cmds = {
  start: "the default -- starts the options-specified servers",
  "gets-ok?": "get the rest api alias and report with a yes or not",
  "?, help": "this help"
};

help = function(message) {
  if (message) {
    console.log(message);
    console.log();
  }
  console.log(yargs.help());
  console.log("Commands:");
  for (cmd in cmds) {
    console.log("  " + cmd + " \t" + cmds[cmd]);
  }
  return console.log();
};

switch (cmd) {
  case "start":
    if (!(args.t || args.r)) {
      help("Don't know what to start.");
    } else {
      if (args.t) {
        d.run("transactor");
      }
      if (args.r) {
        d.run("rest");
      }
    }
    break;
  case "gets-ok?":
    onUp({
      req: {
        uri: d.cfg.rest.base
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
    break;
  case "?":
  case "help":
    help();
}
