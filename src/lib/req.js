import axios from 'axios';
import { settingsDB } from '../db/db';
import { invoke } from '@tauri-apps/api';

/**
 * @typedef {Object} CustomHeaders
 * @property {string} Miru-Url - Custom URL header
 * @property {string} [anyOtherHeader] - Other headers can also be included
 */

/**
 * @typedef {Object} CustomRequestOptions
 * @property {CustomHeaders} headers - The headers to include in the request
 * @property {string} [method] - The method for the request (e.g., GET, POST)
 */

/**
 * Sends a request to the specified URL with the given options and returns the response data.
 *
 * @param {string} url - The URL to send the request to.
 * @param {CustomRequestOptions} options - The options for the request.
 * @return {Promise<any>} A promise that resolves with the response data if the request is successful,
 *                   or rejects with an error if the request fails.
 */
export async function request(url, options) {
	let proxy = await settingsDB.getSettings('proxy');
	url = proxy?.value + url;
    let response;
	try {
		if (window.__TAURI__) {	
			response = await invoke('make_request', { url, options });
		} else {
			response = (await axios(url, options)).data;
		}

		if (response.status === 200) {
			return response;
		} else {
			throw new Error('Failed to fetch manga list');
		}
	} catch (error) {
		throw new Error('Failed to fetch manga list');
	}
}
