#!/usr/bin/env coffee

servers = require("./servers")
cmd = require("commander")
{exe, run} = require("childish-process")

bin = (server) ->
  serve = servers[server]
  serve.opts ?= {}
  console.log serve.cmd
  run serve.cmd, serve.opts

cmd
  .option("-r, --rest", "start the rest server")
  .option("-t, --transactor", "start the transactor")
  .parse(process.argv)

if process.argv.length > 2
  if cmd.transactor then bin "transactor"
  if cmd.rest then bin "rest"
else
  cmd.help()
