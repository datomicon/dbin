#!/usr/bin/env coffee

yargs = require("yargs")
_ = require("lodash")
onUp = require("on-up")
dbin = require("./index.js")
fs = require("fs")


args = yargs
  .usage("Usage: $0 [command] [-options]")
  .example("$0 -rt", "same as $ dbin start --transactor --rest")
  .example("$0 gets-ok?", "wait-up for the servers to start / answer with yes or no (whether they did)")
  .string("o").alias("o", "config").describe("o", "merged into defaults.json - see README.md for more info")
  .boolean(["p", "t", "r", "c"])
  .alias("p", "print").describe("p", "prints the config")
  .alias("t", "transactor").describe("t", "applies to the transactor")
  .alias("r", "rest").describe("r", "applies to the rest server")
  .alias("c", "console").describe("c", "applies to the console client")
  .argv

try
  d = dbin.use(if args.o? then require(args.o))
catch error
  console.log "Bad options --config '#{args.o}'."
  console.log "The file must be / export valid json."
  console.log error
  process.exit 1

if args.p?
  console.log()
  console.log d.cfg
  console.log()

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
      if args.c
        if d.cfg.edition is "pro" or fs.existsSync(d.cfg.console.path)
          d.run("console")
        else
          console.log "No console found at #{d.cfg.console.path}
- please download and install it there or else set console.path accordingly."
          process.exit 1

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
