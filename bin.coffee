#!/usr/bin/env coffee

dbin = require("./index.js").use()
cmd = require("commander")

cmd
  .command("gets-ok?")
  .description("get the rest api alias and report with a yes or not")
  .action ->
    dbin.gets (res) ->
      if res.statusCode is 200
        console.log "yes"
        process.exit 0
      else
        console.log "not"
        process.exit 1

cmd
  .option("-r, --rest", "start the rest server")
  .option("-t, --transactor", "start the transactor")
  .parse(process.argv)

if process.argv.length > 2
  if cmd.transactor then dbin.run("transactor")
  if cmd.rest then dbin.run("rest")
else
  cmd.help()
