workflow "Install, Lint, Test, Build" {
  on = "pull_request"
  resolves = ["docker://node:12.8.0-alpine-1", "docker://node:12.8.0-alpine-2", "docker://node:12.8.0-alpine-3"]
}

action "docker://node:12.8.0-alpine" {
  uses = "docker://node:12.8.0-alpine"
  runs = "yarn"
  args = "install"
}

action "docker://node:12.8.0-alpine-1" {
  uses = "docker://node:12.8.0-alpine"
  needs = ["docker://node:12.8.0-alpine"]
  runs = "yarn"
  args = "lint"
}

action "docker://node:12.8.0-alpine-2" {
  uses = "docker://node:12.8.0-alpine"
  needs = ["docker://node:12.8.0-alpine"]
  runs = "yarn"
  args = "test"
}

action "docker://node:12.8.0-alpine-3" {
  uses = "docker://node:12.8.0-alpine"
  needs = ["docker://node:12.8.0-alpine"]
  runs = "yarn"
  args = "build"
}
