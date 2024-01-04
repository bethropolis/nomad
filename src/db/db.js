import Dexie from "dexie";

/**
 * @typedef {import("./table/extension").Extension} Extension
 * @typedef {import("./table/extension").ExtensionSettings} ExtensionSettings
 * @typedef {import("./table/setting").Settings} Settings
 */

export * from "./table/extension";
export * from "./table/setting";

/**
 * @class
 * @extends Dexie
 */
export class NomadDB extends Dexie {
  constructor() {
    super("NomadDB");
    this.version(1).stores({
      extension:
        "++id, id, name, &package, version, lang, type, script, enable, description, webSite, scriptUrl, author, icon, settings",
      extensionSettings:
        "++id, title, package, key, value, type, options, defaultValue, description, &[package+key]",
      settings: "++id, &key, value",
    });

    /** @type {Dexie.Table<Extension, number>} */
    this.extension = this.table("extension");

    /** @type {Dexie.Table<ExtensionSettings, number>} */
    this.extensionSettings = this.table("extensionSettings");

    /** @type {Dexie.Table<Settings, number>} */
    this.settings = this.table("settings");
  }
}

/** @type {NomadDB} */
export const db = new NomadDB();