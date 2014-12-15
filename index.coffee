cfg = require("./defaults.json")
run = require("childish-process").run
onUp = require("on-up")
servers = require("./servers")

module.exports =

  run: (server) ->
    serve = servers[server]
    serve.opts ?= {}
    console.log(serve.cmd)
    run(serve.cmd, serve.opts)

  gets: (cb) ->
    test = "http://localhost:#{cfg.rest.port}/data/#{cfg.rest.alias}/"
    onUp {req: {uri: test }, dots: true}, (res) ->
      cb(res)
