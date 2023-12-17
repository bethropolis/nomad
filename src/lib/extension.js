/**
 * @typedef {Object} ListItem
 * @property {string} title
 * @property {string} url
 * @property {string} cover
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
 * @property {Array.<{name: string, url: string}>} urls
 */

/**
 * @typedef {Object} BangumiWatch
 * @property {'hls' | 'mp4'} type
 * @property {string} url
 */


/**
 * @class
 */
class Extension {
	/**
	 * @param {number} page
	 * @returns {Promise<ListItem[]>}
	 * @abstract
	 */
	latest(page) {}

	/**
	 * @param {string} kw
	 * @param {number} page
	 * @returns {Promise<ListItem[]>}
	 * @abstract
	 */
	search(kw, page) {}

	/**
	 * @param {string} url
	 * @returns {Promise<Detail>}
	 * @abstract
	 */
	detail(url) {}

	/**
	 * @param {string} url
	 * @returns {Promise<BangumiWatch>}
	 * @abstract
	 */
	watch(url) {}

    /**
     * @param {string} url
     * @returns {Promise<string>}
     * @abstract
     */
	checkUpdate(url) {}

	/**
	 * @returns {void}
	 */
	unload() {}

	/**
	 * @returns {void}
	 */
	load() {}
}


export default Extension;