import { db } from '../db';

/**
 * @typedef {Object} Extension
 * @property {number} [id]
 * @property {string} name
 * @property {string} package
 * @property {string} version
 * @property {string} lang
 * @property {'bangumi' | 'manga' | 'fikushon'} type
 * @property {string} script
 * @property {string} description
 * @property {boolean} [nsfw]
 * @property {string} [website]
 * @property {string} [author]
 * @property {string} [icon]
 * @property {string} [license]
 */

/**
 * @typedef {Object} ExtensionSettings
 * @property {number} [id]
 * @property {string} title
 * @property {string} package
 * @property {string} key
 * @property {string | boolean} value
 * @property {'input' | 'select' | 'checkbox'} type
 * @property {Object[]} [options]
 * @property {string} options.label
 * @property {string} options.value
 * @property {string | boolean} defaultValue
 * @property {string} [description]
 */

/**
 * @namespace extensionDB
 */
export const extensionDB = {
	/**
	 * Returns all extensions.
	 * @returns {Promise<Extension[]>}
	 */
	getAllExtensions: () => {
		return db.extension.toArray();
	},

	/**
	 * Returns all extensions of a specific type.
	 * @param {Extension['type']} type - The type of extension.
	 * @returns {Promise<Extension[]>}
	 */
	getAllExtensionsForType: (type) => {
		return db.extension.where('type').equals(type).toArray();
	},

	/**
	 * Deletes an extension by package name.
	 * @param {string} packageName - The package name of the extension to delete.
	 * @returns {Promise<number>}
	 */
	deleteExtension: (packageName) => {
		return db.extension.where('package').equals(packageName).delete();
	},

	/**
	 * Adds or modifies an extension.
	 * @param {Extension} extension - The extension to add or modify.
	 * @returns {Promise<any>}
	 */
	addExtension: async (extension) => {
		const existingExtension = await extensionDB.getExtension(extension.package);
		if (existingExtension) {
			return db.extension.where('package').equals(extension.package).modify(extension);
		}
		return db.extension.add(extension);
	},

	/**
	 * Retrieves an extension by package name.
	 * @param {string} packageName - The package name of the extension to retrieve.
	 * @returns {Promise<Extension | undefined>}
	 */
	getExtension: (packageName) => {
		return db.extension.where('package').equals(packageName).first();
	}
};

/**
 * @namespace ExtensionSettingsDB
 */
export const ExtensionSettingsDB = {
	/**
	 * Retrieves extension settings by package name.
	 * @param {string} packageName - The package name of the extension settings to retrieve.
	 * @returns {Promise<ExtensionSettings[]>}
	 */
	get: (packageName) => {
		return db.extensionSettings.where('package').equals(packageName).toArray();
	},

	/**
	 * Retrieves extension settings by package name and key.
	 * @param {string} packageName - The package name of the extension settings to retrieve.
	 * @param {string} key - The key of the extension settings to retrieve.
	 * @returns {Promise<ExtensionSettings | undefined>}
	 */
	getByKey: (packageName, key) => {
		return db.extensionSettings
			.where('package')
			.equals(packageName)
			.and((item) => item.key === key)
			.first();
	},

	/**
	 * Sets the value of an extension setting.
	 * @param {string} packageName - The package name of the extension.
	 * @param {string} key - The key of the extension setting.
	 * @param {string | boolean} value - The value to set.
	 * @returns {Promise<number>}
	 */
	set: (packageName, key, value) => {
		return db.extensionSettings
			.where('package')
			.equals(packageName)
			.and((item) => item.key === key)
			.modify({
				value
			});
	},

	/**
	 * Adds or modifies extension settings.
	 * @param {ExtensionSettings} settings - The extension settings to add or modify.
	 * @returns {Promise<any>}
	 */
	add: async (settings) => {
		const setting = await ExtensionSettingsDB.getByKey(settings.package, settings.key);
		if (setting) {
			return db.extensionSettings
				.where('package')
				.equals(settings.package)
				.and((item) => item.key === settings.key)
				.modify({
					title: settings.title,
					type: settings.type,
					options: settings.options,
					defaultValue: settings.defaultValue,
					description: settings.description
				});
		}
		return db.extensionSettings.add(settings);
	},

	/**
	 * Deletes extension settings by package name.
	 * @param {string} pkg - The package name of the extension settings to delete.
	 * @returns {Promise<number>}
	 */
	deleteExtension: (pkg) => {
		return db.extensionSettings.where('package').equals(pkg).delete();
	}
};
