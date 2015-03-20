var args, cmd, cmds, d, dbin, error, fs, help, onUp, path, yargs;

require("source-map-support").install();

yargs = require("yargs");

onUp = require("on-up");

dbin = require("./index.js");

path = require("path");

fs = require("fs");

args = yargs.usage("Usage: $0 [command] [-options]").example("$0 -rt", "same as $ dbin start --transactor --rest").example("$0 gets-ok?", "wait-up for the servers to start / answer with yes or no (whether they did)").string("o").alias("o", "config").describe("o", "from file, merged into defaults.json").boolean(["p", "t", "r", "c"]).alias("p", "print").describe("p", "prints the config").alias("t", "transactor").describe("t", "applies to the transactor").alias("r", "rest").describe("r", "applies to the rest server").alias("c", "console").describe("c", "applies to the console client").argv;

try {
  if ((args.o != null) && args.o[0] !== '/') {
    args.o = path.join(process.cwd(), args.o);
  }
  d = dbin.use(args.o != null ? require(args.o) : void 0);
} catch (_error) {
  error = _error;
  console.log("Bad options --config '" + args.o + "'.");
  console.log("The file must be / export valid json.");
  console.log(error);
  process.exit(1);
}

if (args.p) {
  console.log();
  console.log(d.cfg);
  console.log();
}

cmd = args._.length ? args._[0] : "start";

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
    if (!(args.t || args.r || args.c)) {
      help("Don't know what to start.");
    } else {
      if (args.t) {
        d.run("transactor");
      }
      if (args.r) {
        d.run("rest");
      }
      if (args.c) {
        if (d.cfg.edition === "pro" || fs.existsSync(d.cfg.console.path)) {
          d.run("console");
        } else {
          console.log("No console found at " + d.cfg.console.path + " - please download and install it there or else set console.path accordingly.");
          process.exit(1);
        }
      }
    }
    break;
  case "gets-ok?":
    onUp({
      req: {
        uri: d.cfg.rest.base
      },
      dots: true,
      patience: 70000
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

//# sourceMappingURL=maps/bin.js.map