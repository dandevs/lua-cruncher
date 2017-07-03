#!/usr/bin/env node
import { getAllModulesFromFile } from "./moduleDependencies";
import { shortenedModuleNames } from "./utils";
import { minify as minifyLua } from "luamin";
import { forEach } from "lodash";
import { compileModules } from "./compileModules";
import * as path from "path";

export default minify;
export function minify(entryPath) {
    const modules = shortenedModuleNames(
        getAllModulesFromFile(entryPath)
    );
    
    const code = compileModules(modules);
    return code;
}
