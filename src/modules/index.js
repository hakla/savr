const glob = require("glob")
const path = require("path")

let options = {
  cwd: __dirname,
  ignore: "**/index.js"
}

class ModuleLoader {

  static available(cb) {
    glob("*.js", options, (err, files) => {
      cb(files.map(file => require(`./${file}`)))
    })
  }

  static availableSync() {
    return glob.sync("*.js", options).map(file => require(`./${file}`))
  }

}

module.exports = ModuleLoader
