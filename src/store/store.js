import { writable } from 'svelte/store';
import { Store } from '.';


export const details = writable({ package: '', url: '' });
export const searchQuery = writable(''); 
