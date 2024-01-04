
import Extension from '$lib/extension';
import { extensionDB } from '../db/db';
import { readExtensionMetaData, verExtensionMateData } from '../utils/extension';
import { isClient } from '../utils/is-client';
import { autorun, makeAutoObservable } from "mobx";
import { encode } from 'js-base64';


/**
 * @typedef {import('./settings').default} SettingsStore
 */


/**
 * @class ExtensionStore
 */
export default class ExtensionStore {
  

    /**
     * Constructor for the class.
     *
     * @param {SettingsStore} settingsStore - An instance of the SettingsStore class.
     */
    constructor(settingsStore) {
        makeAutoObservable(this);
  /** @type {Map<string, Extension>} */
    this.extensionsMap = new Map();

    /** @type {Map<string, Error>} */
    this.extensionsErrorMap = new Map();

    /** @type {string|undefined} */
    this.proxyUrl;


        if (isClient()) {
            Object.defineProperty(window, 'Extension', {
                value: Extension,
            });
        } 

        autorun(() => {
            this.proxyUrl = settingsStore.getSetting('proxy'); 

            this.extensionsMap.forEach((extension) => {
                if (this.proxyUrl) {
                    extension.proxyUrl = this.proxyUrl;
                }
            });
        });
    }

    /**
     * @param {string} script
     * @returns {Promise<string>}
     */
    installExtension(script) {
        return new Promise((resolve, reject) => {
            const extensionData = readExtensionMetaData(script);

            if (!extensionData || !verExtensionMateData(extensionData)) {
                return reject('Extension metadata error');
            }

            extensionData.script = script;
            script = `data:text/javascript;base64,${encode(script)}`;

            if (isClient()) {
                import(/* webpackIgnore: true */ script)
                    .then((module) => {
                        const extension = new module.default();

                        Object.assign(extension, extensionData);

                        extension.proxyUrl = this.proxyUrl || '';
                        extensionDB.addExtension(extensionData);
                        this.setExtension(extension.package, extension);
                        extension.load();
                        return resolve(extension.package);
                    })
                    .catch((error) => {
                        this.extensionsErrorMap.set(extensionData.package, error);
                        return reject(error);
                    });
            }
        });
    }

    /**
     * @param {string} pkg
     */
    unloadExtension(pkg) {
        this.extensionsMap.get(pkg)?.unload();
        this.extensionsMap.delete(pkg);
        extensionDB.deleteExtension(pkg);
    }

    /**
     * @param {string} pkg
     * @returns {Extension|undefined}
     */
    getExtension(pkg) {
        return this.extensionsMap.get(pkg);
    }

    /**
     * @param {"bangumi"|"manga"|"fikushon"} type
     * @returns {Extension[]}
     */
    getExtensionsByType(type) {
        return Array.from(this.extensionsMap.values()).filter(
            (extension) => extension.type === type
        );
    }

    /**
     * @param {string} pkg
     * @returns {Error|undefined}
     */
    getExtensionsError(pkg) {
        return this.extensionsErrorMap.get(pkg);
    }

    /**
     * @returns {Promise<void>}
     */
    async init() {
        const extensions = await extensionDB.getAllExtensions();

        await Promise.all(
            extensions.map((extension) => {
                return this.installExtension(extension.script);
            })
        );
    }

    /**
     * @param {string} pkg
     * @param {Extension} extension
     */
    setExtension(pkg, extension) {
        this.extensionsMap.set(pkg, extension);
    }
}