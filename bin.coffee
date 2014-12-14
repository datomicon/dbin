#!/usr/bin/env coffee

servers = require("./servers")
cmd = require("commander")
{exe, run} = require("childish-process")
opts = require("./defaults.json")
onUp = require("on-up")

bin = (server) ->
  serve = servers[server]
  serve.opts ?= {}
  console.log serve.cmd
  run serve.cmd, serve.opts

cmd
  .command("gets-ok?")
  .description("get the rest api alias and report with a yes or not")
  .action ->
    test = "http://localhost:#{opts.rest.port}/data/#{opts.rest.alias}/"
    onUp {req: {uri: test }, dots: true}, (res) ->
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
  if cmd.transactor then bin "transactor"
  if cmd.rest then bin "rest"
else
  cmd.help()
