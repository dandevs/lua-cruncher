# lua-cruncher
Concatenates lua files and all of its `require` modules

`npm i -g lua-cruncher`

## CLI
```
  Usage: lua-crunch [options] <file> [output]


  Options:

    -w, --watch [folder]  Watch and recompile on change
    -o, --out <file>      Output file path
    -h, --help            output usage information
```

## Node
```js
const luacruncher = require("lua-cruncher");
const crunchedCode = luacruncher.minify("path/to/file.lua");
```