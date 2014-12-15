run = require("childish-process").run
onUp = require("on-up")
servers = require("./servers")


class DBin

  use: (opts) ->
    unless opts?.defaults is false
      @cfg = require("./defaults.json")
    new Instance(@cfg)


class Instance

  constructor: (cfg) ->
    @cfg = cfg

  run: (server) ->
    serve = servers[server]
    serve.opts ?= {}
    console.log(serve.cmd)
    run(serve.cmd, serve.opts)

  gets: (cb) ->
    test = "http://localhost:#{@cfg.rest.port}/data/#{@cfg.rest.alias}/"
    onUp {req: {uri: test }, dots: true}, (res) ->
      cb(res)


module.exports = new DBin
