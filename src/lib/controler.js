import { extensionDB } from '../db/db';
import { isClient } from '../utils/is-client';
import { encode } from 'js-base64';
import Extension from './extension';

/**
 * @typedef {import("../db/db").ExtensionSettings} ExtensionSettings
 * @typedef {import("../db/db").Extension} ExtensionType
 * @typedef {import("../types/extension").BangumiWatch} BangumiWatch
 * @typedef {import("../types/extension").Detail} Detail
 * @typedef {import("../types/extension").FikushonWatch} FikushonWatch
 * @typedef {import("../types/extension").ListItem} ListItem
 * @typedef {import("../types/extension").MangaWatch} MangaWatch
 */

export class Controler {
    constructor() {
        this.db = extensionDB;

        if (isClient()) {
            Object.defineProperty(window, 'Extension', {
                value: Extension
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

        if (!extension) return;

        let script = `data:text/javascript;base64,${encode(extension.script)}`;

        if (isClient()) {
            const ext = await import(script/* @vite-ignore */).then((module) => {
                const ext = new module.default();

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
     * @return {Promise<ListItem[]|undefined>} A promise that resolves to the latest version of the package.
     */
    async latest(pkg, page = 1) {
        const ext = await this.load(pkg);

        if (!ext) return;

        return await ext.latest(page);
    }

 /**
     * Retrieves the latest version of a package from the extension database.
     *
     * @param {string} pkg - The name of the package to retrieve.
     * @param {number} page - The page number of the results to retrieve. Defaults to 1.
     * @return {Promise<ListItem[]|undefined>} A promise that resolves to the latest version of the package.
     */
    async search(pkg, query = "", page = 1) {
        const ext = await this.load(pkg);

        if (!ext) return;

        return await ext.search(query, page);
    }



    /**
     * Asynchronously retrieves details for a given package and URL.
     *
     * @param {Object} data - Object containing 'package' and 'url' keys.
     * @param {string} data.package - Identifier of the package.
     * @param {string} data.url - URL associated with the package details.
     * @return {Promise<Detail|undefined>} Promise resolving with package details or null.
     */
    async detail(data) {
        const ext = await this.load(data.package);

        if (!ext) return;

        return await ext.detail(data.url);
    }


}

const controler = new Controler();

export default controler;
