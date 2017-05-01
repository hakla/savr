'use strict'

const fs = require("fs")
const ora = require("ora")
const Store = require("jfs")
const utils = require("savr-utils")
const modules = require("./modules")
const BackupTask = require("./backup")

const db = new Store("data")

module.exports = {
  available: modules.available,
  availableSync: modules.availableSync,
  getPaths: (game) => db.get(game.name),
  setPaths: (game, _in, _out) => db.save(game.id, { "in": _in, "out": _out }),
  get: (id) => db.getSync(id),
  set: (id, value) => db.save(id, value),
  watch: (game) => {
    try {
      utils.info("Starting ...")

      let configuration = db.getSync(game.id)
      let path = configuration["in"]
      let backupPath = configuration["out"]

      if (!fs.existsSync(backupPath)) {
        fs.mkdirSync(backupPath)
      }

      utils.assertPath(path, "savegames")
      utils.assertPath(backupPath, "backup")

      utils.ok("Paths are ok!")
      utils.info(`Starting watcher for ${path} ...`)

      BackupTask.watch(game, path, backupPath)
    } catch (exception) {
      console.error(exception.message)
      process.exit(1)
    }
  }
}
