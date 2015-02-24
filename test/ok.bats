#!/usr/bin/env batshit

load $(which batshit-helpers)

@test "verifies a global npm install of dbin and a running rest server" {
  pushd ~
  run dbin gets-ok?
  assert_success
  assert_output_contains "yes"
  popd
}
