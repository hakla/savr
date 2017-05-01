"use strict"

const path = require("path")
const utils = require("../utils")

let backup = (filepath, backupPath) => new Promise((resolve, reject) => {
  utils.copy(filepath, backupPath, (err, files) => {
    if (err) reject(err.message)
    else resolve()
  })
})

let gothic2 = {
  backup: (folder, backupPath) => utils.readdir(folder).map(file => backup(folder + path.sep + file, backupPath)),
  id: "gothic2",
  name: "Gothic II"
}

module.exports = gothic2
