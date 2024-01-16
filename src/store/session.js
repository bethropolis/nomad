/**
 * Wrapper class for session storage.
 */
class SessionStorageWrapper {
    /**
     * Sets the value of the pair identified by key to value, creating a new key/value pair if none existed for key previously.
     * @param {string} key - The name of the key to create/update.
     * @param {*} value - The value to give the key.
     */
    setItem(key, value) {
        try {
            sessionStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error(`Error setting item with key "${key}" to sessionStorage`, e);
        }
    }

    /**
     * Returns the current value associated with the given key, or null if the given key does not exist in the list associated with the object.
     * @param {string} key - The name of the key to retrieve.
     * @return {*} The current value associated with the given key, or null if the key does not exist.
     */
    getItem(key) {
        try {
            const value = sessionStorage.getItem(key);
            return value ? JSON.parse(value) : null;
        } catch (e) {
            console.error(`Error getting item with key "${key}" from sessionStorage`, e);
            return null;
        }
    }

    /**
     * Removes the key/value pair with the given key from the list associated with the object, if a key/value pair with the given key exists.
     * @param {string} key - The name of the key to remove.
     */
    removeItem(key) {
        sessionStorage.removeItem(key);
    }

    /**
     * Empties the list associated with the object of all key/value pairs, if there are any.
     */
    clear() {
        sessionStorage.clear();
    }
}


export const sessionDB = new SessionStorageWrapper();