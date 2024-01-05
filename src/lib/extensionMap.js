import { writable } from 'svelte/store';


const createWritable = () => {
  const { subscribe, set, update } = writable(new Map());

  return {
    subscribe,
    
    /**
     * Sets the extension map.
     *
     * @param {Map<any, any>} map - The extension map.
     */
    setExtensionMap: (map) => {
      set(map);
    },
  
    /**
     * Updates the extension map with a new key-value pair.
     *
     * @param {any} key - The key to be added to the map.
     * @param {any} value - The value associated with the key.
     */
    updateExtensionMap: (key, value) => {
      update((oldMap) => {
        const newMap = new Map(oldMap);
        newMap.set(key, value);
        return newMap;
      });
    },

  };
};

// Create the writable store
const extensionMapStore = createWritable();

// Export the store
export default extensionMapStore;
