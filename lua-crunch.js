#!/usr/bin/env node
const luacruncher   = require("./bin/index");
const program       = require("commander");
const path          = require("path");
const fs            = require("fs");
const chokidar      = require("chokidar");

program
    .arguments("<file> [output]")
    .option("-w, --watch [folder]", "Watch and recompile on change")
    .action(processFile)
    .parse(process.argv);

// --------------------------------------------------------

function processFile(file, output = getOutputDefault(file)) {

    if (program.watch)
        startWatchProcess(program.watch, file, output);
    else
        minifyFile(file, output);
}

function getOutputDefault(baseName) {
    const baseNameWithoutExtension = path.parse(baseName).name;
    return baseNameWithoutExtension + ".min.lua";
}

function minifyFile(filePath, outputPath) {
    const code = luacruncher.minify(filePath);
    fs.writeFileSync(outputPath, code, { encoding: "utf-8" });
}

function startWatchProcess(folder, filePath, outputPath) {
    if (typeof folder === "boolean" || folder == "./") 
        folder = ".";

    const watcher = chokidar.watch(folder, {
        ignored: outputPath,
        depth: 99,
    });

    watcher.on("ready", () => {
        watcher.on("change", compile);
        watcher.on("add", compile);
    });

    compile();

    // --------------------------------------------------------

    function compile() {
        try {
            minifyFile(filePath, outputPath);
            console.log(`lua-cruncher: compiled ${filePath} -> ${outputPath}`);
        }
        catch(error) {
            console.error(error);
            console.log("");
            console.log(`lua-cruncher: waiting for changes`);
        }
    }
}