merge = require("lodash").merge
run = require("childish-process").run


class DBin # singleton

  it = null
  cfg: {}

  @use: (opts) ->
    # Note: calling use again could be made meaningful (e.g. upgrade / restart)
    unless it?
      unless opts?.defaults is false
        @cfg = require("./defaults.json")
      merge(@cfg, opts)

      home = if @cfg.homeDir then require("home-dir").directory + "/" else ""
      base_path = "#{home}#{@cfg.located}/datomic-#{@cfg.edition}-#{@cfg.version}"
      alias_uri = "#{@cfg.rest.alias} #{@cfg.transactor.uri}"

      @cfg.transactor.cmd = "#{base_path}/bin/transactor
  #{base_path}/config/samples/free-transactor-template.properties"
      @cfg.rest.cmd = "#{base_path}/bin/rest -p #{@cfg.rest.port} #{alias_uri}"
      @cfg.rest.uri = "http://localhost:#{@cfg.rest.port}"
      @cfg.rest.base = "#{@cfg.rest.uri}/data/#{@cfg.rest.alias}/"

      it = new Datomic(@cfg)


  class Datomic # private

    constructor: (@cfg) -> @

    run: (server) ->
      serve = @cfg[server]
      if serve?
        serve.opts ?= {}
        console.log(serve.cmd)
        run(serve.cmd, serve.opts)


module.exports = DBin
