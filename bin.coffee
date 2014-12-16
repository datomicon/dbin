#!/usr/bin/env coffee

yargs = require("yargs")
_ = require("lodash")
onUp = require("on-up")
d = require("./index.js").use() # only with defaults for now

args = yargs
  .usage("Usage: $0 [command] [-options]")
  .example("$0 -rt", "same as $ dbin start --transactor --rest")
  .example("$0 gets-ok?", "wait-up for the servers to start / answer with yes or no (whether they did)")
  .boolean(["t", "r", "c"])
  .alias("t", "transactor").describe("t", "applies to the transactor")
  .alias("r", "rest").describe("r", "applies to the rest server")
  .alias("c", "console").describe("c", "applies to the console client")
  .argv

# the first arg is the command, defaults to start
cmd = if _.size args._ then args._[0] else "start"

cmds =
  start: "the default -- starts the options-specified servers"
  "gets-ok?": "get the rest api alias and report with a yes or not"
  "?, help": "this help"

help = (message) ->
  if message
    console.log(message)
    console.log()
  console.log yargs.help()
  console.log "Commands:"
  for cmd of cmds
    console.log "  #{cmd} \t#{cmds[cmd]}"
  console.log()

switch cmd

  when "start"
    unless args.t or args.r or args.c
      help("Don't know what to start.")
    else
      if args.t then d.run("transactor")
      if args.r then d.run("rest")
      if args.c then console.log "Starting the console - isn't implemented yet."

  when "gets-ok?"
    onUp {req: {uri: d.cfg.rest.base }, dots: true}, (res) ->
      if res.statusCode is 200
        console.log "yes"
        process.exit 0
      else
        console.log "not"
        process.exit 1

  when "?", "help"
    help()
