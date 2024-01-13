import { db } from "../db";

/**
 * Represents a settings object.
 * @typedef {Object} Settings
 * @property {number} [id] - The ID of the setting.
 * @property {string} key - The key of the setting.
 * @property {*} value - The value of the setting.
 */

/**
 * Namespace for settings database operations.
 * @namespace settingsDB
 */
export const settingsDB = {
  /**
   * Get all settings.
   * @returns {Promise<Settings[]>} The array of settings.
   */
  async getAllSettings() {
    return await db.settings.toArray();
  },

  /**
   * Get settings by key.
   * @param {string} key - The key of the setting.
   * @returns {Promise<Settings | undefined>} The setting object.
   */
  async getSettings(key) {
    return await db.settings.where("key").equals(key).first();
  },

  /**
   * Set settings.
   * @param {string} key - The key of the setting.
   * @param {*} value - The value of the setting.
   * @returns {Promise<number>} The number of modified or added settings.
   */
  async setSettings(key, value) {
    if (await this.getSettings(key)) {
      return db.settings.where("key").equals(key).modify({ value });
    }
    return db.settings.add({ key, value });
  },


    /**
   * Update settings by key.
   * @param {string} key - The key of the setting.
   * @param {*} value - The new value of the setting.
   * @returns {Promise<number>} The number of modified settings.
   */
    async updateSettings(key, value) {
      return db.settings.where("key").equals(key).modify({ value });
    },

  /**
   * Delete settings by key.
   * @param {string} key - The key of the setting.
   * @returns {Promise<number>} The number of deleted settings.
   */
  deleteSettings(key) {
    return db.settings.where("key").equals(key).delete();
  },

  /**
   * Delete all settings.
   * @returns {Promise<void>} The number of cleared settings.
   */
  deleteAllSettings() {
    return db.settings.clear();
  },
};