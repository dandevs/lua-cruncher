import { getAllModulesFromFile } from "./moduleDependencies";
import { shortenedModuleNames } from "./utils";
import * as fs from "fs-extra";
import * as path from "path";
import { minify as minifyLua } from "luamin";
import { forEach } from "lodash";

export default concatenateLua;
export function concatenateLua(entryPath) {
    const modules = shortenedModuleNames(
        getAllModulesFromFile(entryPath)
    );

    forEach(modules, (container, moduleName) => {
        console.log(moduleName + ":");
        console.log(minifyLua(container.ast));
        console.log();
    });

    console.log(
        // JSON.stringify(modules, null, 4)
        // JSON.stringify(getAllModulesFromFile(entryPath), null, 4)
    );
}

concatenateLua("test/lua/entry.lua");