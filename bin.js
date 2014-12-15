var cmd, dbin;

dbin = require("./index.js");

cmd = require("commander");

cmd.command("gets-ok?").description("get the rest api alias and report with a yes or not").action(function() {
  return dbin.gets(function(res) {
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
    dbin.run("transactor");
  }
  if (cmd.rest) {
    dbin.run("rest");
  }
} else {
  cmd.help();
}
