import * as lua from "luaparse";
import { forEach } from "lodash";

export function shortenedModuleNames(modulesData) {
    const output     = {};
    const oldPaths   = {};
    let   index      = 0;

    forEach(modulesData, (container, path) => {
        const id = numberToAlphabet(index);
        output[id] = container;
        oldPaths[path] = id;
        index++;
    });

    forEach(modulesData, container => {
        const shortenedSubmodules = {};

        forEach(container.submodules, (ast, submodulePath) => {
            shortenedSubmodules[oldPaths[submodulePath]] = ast;
        });

        container.submodules = shortenedSubmodules;
    });

    changeModuleRequireToLoader(output);
    return output;
}

export function changeModuleRequireToLoader(modulesData) {
    forEach(modulesData, (container, moduleName) => {
        forEach(container.submodules, (requireAST, submoduleName) => {
            replaceAST(requireAST, createLuaModuleLoaderAST(submoduleName).expression);
            // console.log(requireAST)
        });
    });
}

export function numberToAlphabet(n) {
    const posA     = "a".charCodeAt(0);
    const posB     = "z".charCodeAt(0);
    const length   = posB - posA + 1;
    let   output   = "";
    
    while (n >= 0) {
        output = String.fromCharCode(n % length + posA) + output;
        n = Math.floor(n / length) - 1;
    }
    
    return output;
}

export function createLuaModuleLoaderAST(moduleName) {
    return lua.parse(`
        __lc_load_module("${moduleName}")
    `).body[0];
}


export function replaceAST(ast, newAST) {
    forEach(ast, (value, key) => {
        delete ast[key];
    });

    forEach(newAST, (value, key) => {
        ast[key] = value;
    });

    return ast;
}