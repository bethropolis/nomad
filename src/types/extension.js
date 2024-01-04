

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
export { ListItem, Detail, Episode, BangumiWatch, MangaWatch, FikushonWatch }