workflow "Run tests and build" {
  on = "pull_request"
  resolves = ["yarn install", "docker://12.8.0-alpine"]
}

action "yarn install" {
  uses = "docker://12.8.0-alpine"
  args = "install"
  runs = "yarn"
}

action "docker://12.8.0-alpine" {
  uses = "docker://12.8.0-alpine"
  needs = ["yarn install"]
  runs = "yarn"
}
