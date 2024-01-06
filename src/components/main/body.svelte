<script>
	import { onMount } from 'svelte';
	import { extensionDB } from '../../db/db';
	import Extension from './extension.svelte';
	import Details from './details.svelte';

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
	 * @type {string}
	 */
	let page;


	onMount(() => {
		page = 'home';
	});

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
	 */
	const switchToDetails = (event) => {
		selected = event.detail;
		page = 'details';
	};
    
</script>

{#if page === 'home'}
	{#await loadExtensions()}
		<p>Loading...</p>
	{:then}
		{#each extensions as extension}
			<Extension {extension} on:details={switchToDetails} />
		{/each}
	{/await}
{:else if page === 'details'}
	<Details {selected} />
{/if}

<style>
	/* Your styles go here */
</style>
