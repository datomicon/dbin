cfg = require("./defaults.json")

base_path = "#{cfg.located}/datomic-#{cfg.edition}-#{cfg.version}"
alias_uri = "#{cfg.rest.alias} #{cfg.rest.uri}"

module.exports =

  transactor:
    cmd: "lein datomic start"
    opts:
      cwd: "#{process.cwd()}/#{cfg.located}"

  rest: cmd: "#{base_path}/bin/rest -p #{cfg.rest.port} #{alias_uri}"
