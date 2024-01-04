import axios from 'axios';

/**
 * Sends a request to the specified URL with the given options and returns the response data.
 *
 * @param {string} url - The URL to send the request to.
 * @param {Object} options - The options for the request (e.g., headers, method).
 * @return {Promise<any>} A promise that resolves with the response data if the request is successful,
 *                   or rejects with an error if the request fails.
 */
export async function request(url, options = {}) {
    try {
        const response = await axios(url, options);
        
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Failed to fetch manga list');
        }
    } catch (error) {
        throw new Error('Failed to fetch manga list');
    }

    
}
