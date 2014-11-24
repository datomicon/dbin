#!/usr/bin/env coffee

servers = require("./servers")
cmd = require("commander")
run = require("childish-process").run

bin = (server) ->
  serve = servers[server]
  console.log serve
  # run serve.cmd, if serve.opts? then serve.opts else {}

cmd
  .option("-r, --rest", "start the rest server")
  .option("-t, --transactor", "start the transactor")
  .parse(process.argv)

if cmd.transactor then bin "transactor"
if cmd.rest then bin "rest"
