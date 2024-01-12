<script>
	import { onMount } from 'svelte';
	import { extensionDB } from '../../db/db';
	import Extension from './extension.svelte';
	import { goto } from '$app/navigation';
	import { details } from '../../store/store';

	/**
	 * @typedef {import("../../db/db").Extension} Extension
	 */

	/**
	 * @typedef {Object} SelectedPackage
	 * @property {string} package - The selected package
	 * @property {string} url - The shows url
	 */

	/**
	 * @type {SelectedPackage}
	 */
	let selected;
    

	/**
	 * @type {Extension[]}
	 */
	let extensions = [];

	const loadExtensions = async () => {
		extensions = await extensionDB.getAllExtensions();
	};

	/**
	 * @param {object} event
	 * @param {object} event.detail
	 * @param {string} event.detail.package
	 * @param {string} event.detail.url
	 */
	const switchToDetails = (event) => {
		$details = event.detail;
		goto('/details');
	};
    
</script>

	{#await loadExtensions()}
		<p>Loading...</p>
	{:then}
		{#each extensions as extension}
			<Extension {extension} on:details={switchToDetails} />
		{/each}
	{/await}

<style>
	/* Your styles go here */
</style>
