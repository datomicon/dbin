#!/usr/bin/env batshit

load $(which batshit-helpers)

@test "verifies a global npm install of dbin and a running rest server" {
  pushd ~
  run dbin gets-ok?
  assert_success
  assert_output_contains "yes"
  popd
}

@test "overriding default options with relative config.json path" {
  run dbin -p -o test/config.json
  assert_success
  assert_output_contains "homeDir: false"
}

@test "overriding default options with absolute config.json path" {
  run dbin -p -o "$(pwd)/test/config.json"
  assert_success
  assert_output_contains "homeDir: false"
}

@test "overriding default options with a nonexistent-config.json causes #fail" {
  run dbin -o nonexistent-config.json
  assert_failure
  assert_output_contains "MODULE_NOT_FOUND"
}
