import { forEach, isPlainObject } from "lodash";
import * as lua from "luaparse";
import * as fs from "fs";
import * as path from "path";

export function getAllModulesFromFile(filePath, fileASTs = {}) {
    filePath = path.resolve(filePath);

    if (fileASTs[filePath])
        return fileASTs;

    const folderPath     = path.dirname(filePath);
    const code           = fs.readFileSync(filePath, "utf-8");
    const ast            = lua.parse(code);

    const container = fileASTs[filePath] = { 
        submodules:   {},
        ast:          ast,
    };

    (function traverse(node) {
        const submodule = getSubmodule(node);
        if (submodule) {
            getAllModulesFromFile(submodule, fileASTs);
        }

        forEach(node, child => {
            if (Array.isArray(child)) 
                forEach(child, subnode => traverse(subnode));
            
            else if (isPlainObject(child))
                traverse(child);
        });
    })(ast);

    return fileASTs;

    // --------------------------------------------------------

    function getSubmodule(node) {
        if (!node || !node.type)
            return;

        if (node.type !== "StringCallExpression" && node.type !== "CallExpression")
            return;

        if (node.base.name !== "require")
            return;

        if ((node.argument || node.arguments[0]).type !== "StringLiteral")
            return;

        let submodule   = (node.argument || node.arguments[0]).value;
            submodule   = path.extname(submodule).length > 0 ? submodule : submodule + ".lua";
            submodule   = path.resolve(folderPath, submodule);

        container.submodules[submodule] = node;
        return submodule;
    }
}