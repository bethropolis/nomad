/**
 * @typedef {Object} ListItem
 * @property {string} title
 * @property {string} url
 * @property {string} cover
 * @property {string} [update]
 */

import dataStorage from "./db.js";
import {request} from "./req.js";
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
        options = options || {};
        options.headers = options.headers || {};
        options.headers["Miru-Url"] = options.headers["Miru-Url"] || this.webSite;
        
        const miruProxy = this.proxyUrl + url;

        const response = await request(miruProxy, options);
        
        return response;
    } catch (error) {
        console.error('Error making request:', error);
        throw new Error('Request failed');
    }
}


async getSetting(key) {
    const packageName = this.package;
    const setting = await dataStorage.getSetting(packageName, key);
    if (setting) {
        return setting;
    } else {
        throw new Error(`Setting with key '${key}' not found`);
    }
}
    
async registerSetting(setting) {
    try {
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


    async latest(page) {
        throw new Error('Not implemented');
     }

    /**
     * @param {string} kw
     * @param {number} page
     * @returns {Promise<ListItem[]>}
     * @abstract
     */
    async search(kw, page) {
        throw new Error('Not implemented');
     }

    /**
     * @param {string} url
     * @returns {Promise<Detail>}
     * @abstract
     */
    async detail(url) {
        throw new Error('Not implemented');
     }

    /**
     * @param {string} url
     * @returns {Promise<BangumiWatch>}
     * @abstract
     */
    async watch(url) { 
        throw new Error('Not implemented');
    }

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
