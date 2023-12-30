import axios from 'axios';

export async function request(url, options) {
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
