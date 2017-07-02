import { Folder } from "./vfs/folder";
import { File } from "./vfs/file";
import { getPathRelation } from "./utils";
import * as path from "path";

export class VFS {
    pathToFiles = new Set();

    // --------------------------------------------------------
    _path = process.cwd();

    get path() {
        return _path;
    }

    set path(newPath) {
        if (newPath === path.resolve("/"))
            newPath = process.cwd();

        this.newPath = newPath;
    }
    // --------------------------------------------------------

    resolve(newPath) {
        return this.path = path.resolve(this.path, newPath);
    }

    loadFile(pathToFile) {
        
    }
}

