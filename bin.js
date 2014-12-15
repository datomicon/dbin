var cmd, d, onUp;

d = require("./index.js").use();

cmd = require("commander");

onUp = require("on-up");

cmd.command("gets-ok?").description("get the rest api alias and report with a yes or not").action(function() {
  return onUp({
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
});

cmd.option("-r, --rest", "start the rest server").option("-t, --transactor", "start the transactor").parse(process.argv);

if (process.argv.length > 2) {
  if (cmd.transactor) {
    d.run("transactor");
  }
  if (cmd.rest) {
    d.run("rest");
  }
} else {
  cmd.help();
}
