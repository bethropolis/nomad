import { settingsDB } from '../db/db';
import { isClient } from '../utils/is-client';
import { autorun, makeAutoObservable } from 'mobx';
import { env } from '$env/dynamic/public';

/***
 * @typedef {import("../db/db").Settings} Settings
 */

/**
 * @class
 * @classdesc Represents the SettingsStore class.
 */
export default class SettingsStore {
    /**
     * Creates an instance of SettingsStore.
     */
    constructor() {
        /** @type {Map<string, any>} */
        this.items = new Map();

        /** @type {Map<string, any>} */
        this.envItems = new Map();

        /** @type {boolean} */
        this.ready = false;

        /** @ignore */
        makeAutoObservable(this);
        /** @ignore */
         autorun(async() => {
            if (isClient()) {
                // if (this.getSetting('language')) {
                //     Cookies.set('language', this.getSetting('language'), {
                //         expires: 365
                //     });
                // }

                const theme = await this.getSetting('theme');
                const setDark = () => document.documentElement.classList.add('dark');
                const setLight = () => document.documentElement.classList.remove('dark');
                if (theme === 'auto') {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
                    prefersDark.matches ? setDark() : setLight();
                    prefersDark.addEventListener('change', async(e) => {
                        if (await this.getSetting('theme') !== 'auto') {
                            return;
                        }
                        if (e.matches) {
                            setDark();
                            return;
                        }
                        setLight();
                    });
                }
                if (theme === 'dark') {
                    setDark();
                }
                if (theme === 'light') {
                    setLight();
                }
            }
        });
    }

    /**
     * Initializes the SettingsStore.
     * @async
     */
    async init() {
        if (!isClient()) {
            return;
        }

        const settings = await settingsDB.getAllSettings();

        settings.forEach(async(setting) => {
            await this.setSetting(setting.key, setting.value);
        });

        this.envItems.set('theme', env.PUBLIC_NOMAD_THEME);
        this.envItems.set('proxy', env.PUBLIC_NOMAD_PROXY);
        this.envItems.set('repo', env.PUBLIC_NOMAD_REPOSITORY);
        this.envItems.set('TMDBKey', env.PUBLIC_NOMAD_TMDB_KEY);

    
        this.envItems.forEach(async(value, key) => {
            if (!this.getSetting(key)) { 
                await this.setSetting(key, value);
            }
        });
    }

    /**
     * Gets the value of the setting with the specified key.
     * @param {string} key - The key of the setting.
     * @returns {Promise<any>} The value of the setting.
     */
    async getSetting(key) {
        console.log(this.items.get(key), key)
       return await this.items.get(key);
    }

    /**
     * Sets the value of the setting with the specified key.
     * @param {string} key - The key of the setting.
     * @param {any} value - The value of the setting.
     */
    async setSetting(key, value) {
        await this.items.set(key, value);
        await settingsDB.setSettings(key, value);
    }

    /**
     * Resets the value of the setting with the specified key to the default value.
     * @param {string} key - The key of the setting.
     */
    resetSetting(key) {
        this.setSetting(key, this.envItems.get(key));
    }
}
