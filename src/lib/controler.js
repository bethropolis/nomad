import { extensionDB } from "../db/db";
import { isClient } from "../utils/is-client";
import { encode } from 'js-base64';
import Extension from "./extension";


export class Controler {

    constructor() {
        this.db = extensionDB;


        if (isClient()) {
            Object.defineProperty(window, 'Extension', {
                value: Extension,
            });
        } 
    }

    /**
     * Loads a package asynchronously.
     *
     * @param {string} pkg - the package to load
     * @return {Promise<Extension|undefined>} a promise that resolves with the loaded package's extension
     */
    async load(pkg) {

        const extension = await this.db.getExtension(pkg);

        let script = `data:text/javascript;base64,${encode(extension.script)}`;

        if (isClient()) {
            const ext = await import(script).then((module) => {
                const ext= new module.default();

                Object.assign(ext, extension);
                
                ext.load();
                return ext;
            });

            return ext;
        }

    }
    /**
     * Retrieves the latest version of a package from the extension database.
     *
     * @param {string} pkg - The name of the package to retrieve.
     * @param {number} page - The page number of the results to retrieve. Defaults to 1.
     * @return {Promise<any>} A promise that resolves to the latest version of the package.
     */
    async latest(pkg, page = 1) {

        const ext = await this.load(pkg);

        if(!ext) return;

        return await ext.latest(page);
    }

}



const controler = new Controler();

export default controler