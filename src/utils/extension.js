/***
 * @typedef {import("../db/db").Extension} Extension
 */

/**
 * Reads the extension metadata from a script.
 * @param {string} script - The script to read metadata from.
 * @returns {Extension|undefined} - The extension metadata, or undefined if no metadata is found.
 */
export function readExtensionMetaData(script) {
    /** @type {string|undefined} */
    const scriptMetaData = script.match(/MiruExtension([\s\S]+?)\/MiruExtension/)?.[1];
    if (!scriptMetaData) return undefined;

    /** @type {Extension|any} */
    const data = {};
    const lines = scriptMetaData.split("\n");
    lines.forEach(line => {
        if (line.startsWith("// @")) {
            const [property, ...values] = line.slice(4).split(" ");
            data[property] = values.join(" ").trim();
        }
    });

    return data;
}

/**
 * Validates if the extension metadata is valid.
 * @param {Extension} data - The extension metadata to validate.
 * @returns {boolean} True if the metadata is valid, false otherwise.
 */
export function verExtensionMateData(data) {
  if (
    !data.name ||
    !data.package ||
    !data.version ||
    !data.type ||
    !data.lang
  ) {
    return false;
  }
  return true;
}