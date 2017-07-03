import { forEach } from "lodash";
import { minify as minifyLua } from "luamin";

export function compileModules(modulesData, entryModuleName) {
    // console.log(modulesData);

    let code = `
        local __lc_modules = {};
        local function __lc_add_module(name, module)
            __lc_modules[name] = {
                loaded = false,
                module = module
            }
        end
        local function __lc_module(moduleName)
            local moduleContainer = __lc_modules[moduleName]

            if not moduleContainer then
                return
            end

            if not moduleContainer.loaded then
                moduleContainer.module = moduleContainer.module(__lc_module)
                moduleContainer.loaded = true
            end

            return moduleContainer.module
        end

    `;

    forEach(modulesData, (moduleInfo, moduleName) => {
        let moduleCode = `
            __lc_add_module("${moduleName}", function()
                ${minifyLua(moduleInfo.ast)}
            end)
        `;

        code += moduleCode;
    });

    code += `return __lc_module("a")`;
    code = minifyLua(code);

    return code;
}