const chalk = require("chalk")
const chokidar = require("chokidar")
const fs = require("fs")
const _path = require("path")
const ora = require("ora")
const Store = require("jfs")
const utils = require("savr-utils")
const modules = require("./modules")
const gothic2 = require("./modules/gothic2")

const db = new Store("data")

class BackupTask {

  constructor(game, folder, backupPath) {
    let watcher = chokidar.watch(folder, {
      usePolling: true,
      awaitWriteFinish: true,
      disableGlobbing: true,
      ignoreInitial: true
    })

    watcher.on("change", path => {
      // saved game => initiate backup
      this.file(gothic2, path, backupPath)
    })

    watcher.on("addDir", path => {
      this.folder(gothic2, path, backupPath)
    })
  }

  backup(game, folder, backupPath) {
    let name = folder.split(/[\/\\]/).pop()

    backupPath = utils.createBackupFolder(backupPath, name, 10)

    let promises = game.backup(folder, backupPath)

    Promise.all(promises).then(() => {
      this.spinner.succeed(`Backup successful (${backupPath})`)
      this.spinner = undefined
    }).catch(() => {
      if (this.spinner !== undefined) {
        this.spinner.fail("Backup unsuccessful")
        this.spinner = undefined
      }
    })
  }

  file(game, path, backupPath) {
    if (this.timeout !== undefined) clearTimeout(this.timeout)

    this.spinner = (this.spinner || ora(`Backing up ... (${path})`).start())
    this.spinner.text = `Backing up ... (${path})`

    this.timeout = setTimeout(() => {
      // reset timeout
      this.timeout = undefined

      this.backup(game, utils.folderFromFile(path), backupPath)
    }, 5000)
  }

  folder(game, folder, backupPath) {
    BackupTask.spinner = (this.spinner || ora(`Backing up ... (${folder})`).start())

    setTimeout(() => {
      this.backup(game, folder, backupPath)
    }, 5000)
  }

  static watch(game, path, backupPath) {
    new BackupTask(game, path, backupPath)
  }

}

module.exports = BackupTask
