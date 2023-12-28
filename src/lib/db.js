import { JSONFilePreset } from 'lowdb/node';

class DataStorage {
    constructor(fileName, defaultData) {
        this.fileName = fileName;
        this.defaultData = defaultData;
        this.db = null;
    }

    async init() {
        this.db = await JSONFilePreset(this.fileName, this.defaultData);
        return this.db;
    }

    async updateData(key, value = '') {
        if (!this.db) {
            await this.init();
        }
        await this.db.data[key].push(value);
        return await this.db.data;
    }

    async getData() {
        if (!this.db) {
            await this.init();
        }
        return await this.db.data;
    }

    async write() {
        if (!this.db) {
            await this.init();
        }
        await this.db.write();
        return await this.db.data;
    }

    // New methods

    async addSettings(settings) {
        try {
            let database = await this.init();

            if (!database.data.extensions[settings.package]) {
                database.data.extensions[settings.package] = {};
            }

            const existingSetting = await database.data.extensions[settings.package][settings.key];

            if (existingSetting) {
                // Update existing setting properties
                database.data.extensions[settings.package][settings.key] = { ...existingSetting, ...settings };
            } else {
                // Add new setting
                database.data.extensions[settings.package][settings.key] = { ...settings };
            }


            return await database.data;

        } catch (error) {
            console.error('Error adding settings:', error);
            throw new Error('Failed to add settings');
        }
    }


    async getSetting(packageName, key) {
        try {
            await this.init();
    
            const packageSettings = this.db.data.extensions?.[packageName];
            if (packageSettings && packageSettings[key]) {
                return packageSettings[key].value;
            } else {
                throw new Error(`Setting '${key}' not found in package '${packageName}'`);
            }
        } catch (error) {
            console.error('Error getting setting:', error);
            throw new Error('Failed to retrieve setting');
        }
    }
    
}

const defaultData = { extensions: {} };
const dataStorage = new DataStorage('db.json', defaultData);

export default dataStorage;
