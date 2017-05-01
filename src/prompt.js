class Prompt {

  static create(instance) {
    return new Prompt(instance)
  }

  constructor(instance) {
    let push = (prompt) => this.prompts.push(prompt) && this

    this.inquirer = instance.inquirer
    this.prompts = []

    this.input = (name, message) => push({
      name,
      message,
      type: "input"
    })

    this.list = (name, message, choices) => push({
      choices,
      name,
      message,
      type: "list"
    })

    this.path = (name, message) => push({
      name,
      message,
      basePath: "/",
      type: "path"
    })

    this.inquirer.registerPrompt('path', require('inquirer-path').PathPrompt);
  }

  runPrompts(cb, result) {
    let prompt = this.prompts.shift()

    if (prompt === undefined) {
      cb(result || {})
    } else {
      this.inquirer.prompt(prompt, (res) => this.runPrompts(cb, Object.assign({}, result, res)))
    }
  }

  then(cb) {
    this.runPrompts(cb)
  }

}

module.exports = Prompt
