#!/usr/bin/env node

"use strict";

const glob = require("glob")
const meow = require("meow")
const vorpal = require("vorpal")()

const Prompt = require("./prompt").create(vorpal.ui)
const watcher = require(".")

function toListItem(module) {
  return {
    name: module.name,
    value: module
  }
}

vorpal
  .command("configure", "Configure backup paths")
  .action(function(args, cb) {
    Prompt
      .list("game", "Which game do you want to configure? ", watcher.availableSync().map(toListItem))
      .path("path", "Define path to savegames: ")
      .path("backupPath", "Define backup path: ")
      .then(result => {
        watcher.setPaths(result.game, result.path, result.backupPath)

        cb()
      })
  })

vorpal
  .command("watch", "Start watching a specific game")
  .action(function(args, cb) {
    Prompt
      .list("game", "Which game do you want to watch? ", watcher.availableSync().map(toListItem))
      .then(result => {
        watcher.watch(result.game)
      })
  })

vorpal
  .delimiter(" $ ")
  .show()
