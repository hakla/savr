"use strict";

const assert = require("assert")
const chalk = require("chalk")
const copy = require("copy")
const dateformat = require("dateformat")
const fs = require("fs.extra")
const path = require("path")

const log = console.log;

let utils = {
  assertPath: (path, key) => {
    assert.ok(path, chalk.red(`Path to ${key} isn't set!`));
    assert.ok(fs.existsSync(path), chalk.red(`Path to ${key} doesn't exist!`));
  },
  copy: (from, to, cb) => {
    let parts = from.split(/[\/\\]/);

    let savegame = parts[parts.length - 2]
    let file = parts[parts.length - 1]

    return fs.copy(from, to + path.sep + file, {
      replace: true
    }, cb)
  },
  createFolder: (path) => {
    if (!fs.existsSync(path)) {
      fs.mkdir(path)
    }

    return path
  },
  createBackupFolder: (backupPath, name, generations) => {
    let _path = backupPath + path.sep + name

    // make sure the backupPath exists
    utils.createFolder(_path)

    // create the folder for this backup
    let folder = utils.createFolder(_path + path.sep + Date.now())

    // TODO delete folders if there are too many

    return folder;
  },
  error: (message) => log(chalk.red(message)),
  folderFromFile: (filepath) => {
    let parts = filepath.split(/[\/\\]/)

    // remove the filename from the path
    parts.pop()

    // create the folder path
    return parts.join(path.sep)
  },
  info: (message) => log(chalk.blue(message)),
  ok: (message) => log(chalk.green(message)),
  readdir: (path, cb) => fs.readdirSync(path)
};

module.exports = utils
