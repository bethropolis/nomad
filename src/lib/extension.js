/**
 * @typedef {Object} ListItem
 * @property {string} title
 * @property {string} url
 * @property {string} cover
 * @property {string} [update]
 */

import dataStorage from "./db.js";
import request from 'umi-request';
/**
 * @typedef {Object} Detail
 * @property {string} title
 * @property {string} cover
 * @property {string} [desc]
 * @property {Object.<string, string>} [metadata]
 * @property {Episode[]} [episodes]
 */

/**
 * @typedef {Object} Episode
 * @property {string} title
 * @property {Array.<{name: string, url: string}>} urls
 */

/**
 * @typedef {Object} BangumiWatch
 * @property {'hls' | 'mp4'} type
 * @property {string} url
 */


/**
 * @class
 */
class Extension {
    package = "test";
    proxyUrl = "https://api.mangadex.org";
    webSite = "";
    name = "";
    version = "";
    lang = "";
    script = "";
    scriptUrl = "";
    author = "";
    license = "";
    description = "";
    type = "bangumi";
    nsfw = false;



    async request(url, options) {
        try {
            if (!options) {
                options = {};
            }
            if (!options.headers) {
                options.headers = { "Miru-Url": this.webSite }; // Assuming 'this.webSite' is defined in your class
            }
            if (!options.headers["Miru-Url"]) {
                options.headers = { ...options.headers, "Miru-Url": this.webSite };
            }

            const miruProxy = this.proxyUrl + url;

            console.log(miruProxy, options)
            const response = await request(miruProxy, options);
            return response;
        } catch (error) {
            console.error('Error making request:', error);
            throw new Error('Request failed'); // You can handle errors as needed
        }
    }


    async getSetting(key) {
        try {
            const packageName = this.package; // Assuming 'this.package' contains the package name
            const setting = await dataStorage.getSetting(packageName, key);
            if (setting) {
                return setting; // Return the setting value
            } else {
                throw new Error(`Setting with key '${key}' not found`);
            }
        } catch (error) {
            console.error('Error getting setting:', error);
            throw new Error('Failed to retrieve setting');
        }
    }
    


    /**
     * Registers a new setting in the database.
     *
     * @param {Object} setting - The setting object to be registered.
     * @param {string} setting.key - The key of the setting.
     * @param {string} setting.title - The title of the setting.
     * @param {string} setting.type - The type of the setting.
     * @param {any} setting.defaultValue - The default value of the setting.
     * @param {string} setting.description - The description of the setting.
     * @param {Array} setting.options - The options for the setting (optional).
     * @return {Promise<void>} - A promise that resolves when the setting is registered successfully.
     */
    async registerSetting(setting) {
        try {
            // ...existing code...
            await dataStorage.addSettings({
                package: this.package,
                ...setting,
                value: setting.defaultValue,
            });

            await dataStorage.write();
        } catch (error) {
            console.error('Error registering setting:', error);
        }
    }


    async latest(page) { }

    /**
     * @param {string} kw
     * @param {number} page
     * @returns {Promise<ListItem[]>}
     * @abstract
     */
    async search(kw, page) { }

    /**
     * @param {string} url
     * @returns {Promise<Detail>}
     * @abstract
     */
    async detail(url) { }

    /**
     * @param {string} url
     * @returns {Promise<BangumiWatch>}
     * @abstract
     */
    async watch(url) { }

    /**
     * @param {string} url
     * @returns {Promise<string>}
     * @abstract
     */
    async checkUpdate(url) { }

    /**
     * @returns {void}
     */
    async unload() { }

    /**
     * @returns {void}
     */
    async load() { }


}


export default Extension;
