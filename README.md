# lua-cruncher
Concatenates lua files and all of its `require` modules

`npm i -g lua-cruncher`

```
├── entry.lua
├── libs
|  ├── libA.lua
|  └── libB.lua
├── startup
|  ├── funRoutine.lua
|  ├── painRoutine.lua
|  └── sadRoutine.lua
└── utils.lua
```

`lua-cruncher entry.lua bundle.lua`. This script will recursively find `require`'s starting from `entry.lua`.
You'll end up with essentially [entry.lua, utils.lua, libs/libA.lua, libsB.lua ..... ] -> bundle.lua

## CLI
`lua-crucnher entry.lua out.lua -w`
```
  Usage: lua-cruncher [options] <file> [output]


  Options:

    -w, --watch [folder]  Watch and recompile on change
    -h, --help            output usage information
```

output defaults to filename.min.lua

## Node
```js
const luacruncher = require("lua-cruncher");
const crunchedCode = luacruncher.minify("path/to/file.lua");
```