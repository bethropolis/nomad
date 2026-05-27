

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
 * @typedef {Object} ListItem
 * @property {string} title
 * @property {string} url
 * @property {string} cover
 * @property {string} [desc]
 * @property {string} [update]
 */

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
 * @property {Array.<{ name: string, url: string }>} urls
 */

/**
 * @typedef {Object} BangumiWatch
 * @property {"hls" | "mp4" | "flv" | "dash" | "custom"} type
 * @property {string} url
 * @property {Array.<{ html: string, src: string }>} [subtitles]
 * @property {Array<any>} [controls]
 * @property {boolean} noDefaultPlayer
 */

/**
 * @typedef {Object} MangaWatch
 * @property {string[]} urls
 */

/**
 * @typedef {Object} FikushonWatch
 * @property {string[]} content
 * @property {string} title
 * @property {string} subtitle
 */

// Export the types
// @ts-ignore
export { Extension, ExtensionSettings, ListItem, Detail, Episode, BangumiWatch, MangaWatch, FikushonWatch } 