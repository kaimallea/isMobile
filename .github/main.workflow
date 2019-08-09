workflow "Run tests and build" {
  resolves = ["yarn"]
  on = "pull_request"
}

action "yarn install" {
  uses = "docker://12.8.0-alpine"
  args = "install"
  runs = "yarn"
}

action "yarn test" {
  uses = "docker://12.8.0-alpine"
  args = "test"
  needs = ["yarn install"]
  runs = "yarn"
}

action "yarn" {
  uses = "docker://12.8.0-alpine"
  needs = ["yarn test"]
  args = "build"
  runs = "yarn"
}
