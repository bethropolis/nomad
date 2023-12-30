import { JSONFilePreset } from 'lowdb/node';

class DataStorage {
    /**
     * Creates a new instance of the constructor.
     *
     * @param {string} filePath - The file path.
     * @param {object} defaultSettings - The default settings.
     */
    constructor(filePath, defaultSettings) {
        this.filePath = filePath;
        this.defaultSettings = defaultSettings;
        this.db = {};
    }

    /**
     * Initializes the function.
     *
     * @return {Promise<type>} The initialized function.
     */
    async init() {
        this.db = await JSONFilePreset(this.filePath, this.defaultSettings);
        return this.db;
    }

    /**
     * Updates the data with the given key.
     *
     * @param {string} key - The key used to update the data.
     * @return {object} - The updated data object.
     */
    async updateData(key) {
        if (!this.db) {
            await this.init();
        }
        this.db.data[key].push();
        return this.db.data;
    }

    /**
     * Retrieves the data from the database.
     *
     * @return {Promise} Returns a Promise that resolves to the data from the database.
     */
    async getData() {
        if (!this.db) {
            await this.init();
        }
        return this.db.data;
    }

    /**
     * Asynchronously writes data to the database.
     *
     * @return {Promise<Object>} The data that was written to the database.
     */
    async write() {
        if (!this.db) {
            await this.init();
        }
        this.db.write();
        return this.db.data;
    }

    
    /**
     * Adds settings to the database.
     *
     * @param {Object} settings - The settings to be added.
     * @return {Object} The updated database.
     */
    async addSettings(settings) {
        let database = await this.init();

        if (!database.data.extensions[settings.package]) {
            database.data.extensions[settings.package] = {};
        }

        const existingSetting = database.data.extensions[settings.package][settings.key];

        if (!existingSetting) {
            // Add new setting
            database.data.extensions[settings.package][settings.key] = { ...settings };
        }

        return database.data;
    }

    /**
     * Retrieves the value of a specific setting for a given package.
     *
     * @param {string} packageName - The name of the package.
     * @param {string} key - The key of the setting.
     * @return {any} The value of the setting, or null if not found.
     */
    async getSetting(packageName, key) {
        await this.init();

        const packageSettings = this.db.data.extensions?.[packageName];
        return packageSettings?.[key]?.value ?? null;
    }
}

const defaultSettings = { extensions: {} };
const dataStorage = new DataStorage('db.json', defaultSettings);

export default dataStorage;