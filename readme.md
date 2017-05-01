# savr [![Build Status](https://travis-ci.org/hakla/savr.svg?branch=master)](https://travis-ci.org/hakla/savr)

> Savegame watcher


## Install

```
$ npm install --save gothic-watcher
```


## Usage

```js
const savr = require('savr');

savr.available((modules) => {

})
//=> 'unicorns & rainbows'
```


## CLI

```
$ npm install --global savr
```

```
$ gothic-watcher --help

  Usage
    gothic-watcher [input]

  Options
    --foo  Lorem ipsum [Default: false]

  Examples
    $ gothic-watcher
    unicorns & rainbows
    $ gothic-watcher ponies
    ponies & rainbows
```


## License

MIT © [hakla](http://-)
