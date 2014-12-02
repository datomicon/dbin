cfg = require("./defaults.json")
home = require('home-dir').directory + "/"

base_path = "#{home}#{cfg.located}/datomic-#{cfg.edition}-#{cfg.version}"
alias_uri = "#{cfg.rest.alias} #{cfg.rest.uri}"

module.exports =

  transactor:
    cmd: "#{base_path}/bin/transactor
#{base_path}/config/samples/free-transactor-template.properties"

  rest: cmd: "#{base_path}/bin/rest -p #{cfg.rest.port} #{alias_uri}"
