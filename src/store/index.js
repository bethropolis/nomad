import ExtensionStore from "./extension";
import SettingsStore from "./settings";

/**
 * @typedef {Object} RootStore
 * @property {SettingsStore} settingsStore
 * @property {ExtensionStore} extensionStore
 */

/**
 * @class
 * @implements {RootStore}
 */
export class Store {
    /**
     * Creates an instance of RootStore.
     */
    constructor() {
        /**
         * @type {SettingsStore}
         */
        this.settingsStore = new SettingsStore();
        
        /**
         * @type {ExtensionStore}
         */
        this.extensionStore = new ExtensionStore(this.settingsStore);
    }
}





