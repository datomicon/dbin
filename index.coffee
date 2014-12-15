merge = require("lodash").merge
run = require("childish-process").run
onUp = require("on-up")


class DBin

  cfg: {}

  use: (opts) ->
    unless opts?.defaults is false
      @cfg = require("./defaults.json")
    merge(@cfg, opts)

    home = if @cfg.homeDir then require('home-dir').directory + "/" else ""
    base_path = "#{home}#{@cfg.located}/datomic-#{@cfg.edition}-#{@cfg.version}"
    alias_uri = "#{@cfg.rest.alias} #{@cfg.rest.uri}"
    @cfg.transactor.cmd = "#{base_path}/bin/transactor
#{base_path}/config/samples/free-transactor-template.properties"
    @cfg.rest.cmd = "#{base_path}/bin/rest -p #{@cfg.rest.port} #{alias_uri}"

    new Instance(@cfg)


class Instance

  constructor: (@cfg) -> @

  run: (server) ->
    serve = @cfg[server]
    if serve?
      serve.opts ?= {}
      console.log(serve.cmd)
      run(serve.cmd, serve.opts)

  gets: (cb) ->
    test = "http://localhost:#{@cfg.rest.port}/data/#{@cfg.rest.alias}/"
    onUp {req: {uri: test }, dots: true}, (res) ->
      cb(res)


module.exports = new DBin
