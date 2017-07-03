# lua-cruncher
Concatenates lua files and all of its `require` modules

`npm i -g lua-cruncher`

## CLI
`lua-crucnher entry.lua out.lua -w`
```
  Usage: lua-cruncher [options] <file> [output]


  Options:

    -w, --watch [folder]  Watch and recompile on change
    -h, --help            output usage information
```

output defaults to <file>.min.lua

## Node
```js
const luacruncher = require("lua-cruncher");
const crunchedCode = luacruncher.minify("path/to/file.lua");
```