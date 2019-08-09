workflow "Run tests and build" {
  on = "pull_request"
  resolves = ["docker://node:12.8.0-alpine"]
}

action "yarn install" {
  uses = "docker://node:12.8.0-alpine"
  args = "install"
  runs = "yarn"
}

action "docker://node:12.8.0-alpine" {
  uses = "docker://node:12.8.0-alpine"
  needs = ["yarn install"]
  runs = "yarn"
  args = "lint"
}
