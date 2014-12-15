#!/usr/bin/env coffee

d = require("./index.js").use() # only with defaults for now
cmd = require("commander")
onUp = require("on-up")

cmd
  .command("gets-ok?")
  .description("get the rest api alias and report with a yes or not")
  .action ->
    onUp {req: {uri: d.cfg.rest.base }, dots: true}, (res) ->
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
  if cmd.transactor then d.run("transactor")
  if cmd.rest then d.run("rest")
else
  cmd.help()
