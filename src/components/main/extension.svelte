<script>
	import { createEventDispatcher } from 'svelte';
	import { searchQuery } from '../../store/store.js';
	import { Icon } from 'stwui';
	import Ecard from './showCard.svelte';
	import controler from '$lib/controler';
	import LoadingCards from '../common/loadingCards.svelte';
	import { icons } from '$lib/icons';
	/**
	 * @typedef {import("../../db/db").Extension} Extension
	 * @typedef {import("../../types/extension").ListItem} ListItem
	 */

	/**
	 * @type {Extension}
	 */
	export let extension;
	/**
	 * @type {ListItem[]}
	 */
	let data = [];
	let search = '';
	/**
	 * @type {Promise<ListItem[]>}
	 */
	let dataPromise;

	let dispach = createEventDispatcher();

	const getLatest = async () => {
		return (await controler.latest(extension.package)) || [];
	};

	/**
	 * Retrieves the searched data.
	 *
	 * @param {string} search - The search query.
	 * @param {number} page - The page number.
	 * @returns {Promise<ListItem[]>} - A promise that resolves when the data is retrieved.
	 */
	const getSearched = async (search, page) => {
		return (await controler.search(extension.package, search, page)) || [];
	};

	/**
	 * Retrieves the data.
	 * @returns {Promise<ListItem[]>} - A promise that resolves when the data is retrieved.
	 */
	const getData = async () => {
		if (search) {
			return await getSearched(search, 1);
		} else {
			return await getLatest();
		}
	};

	/**
	 * Navigates to the details page with the specified item.
	 * @param {Object} item - The item to navigate to the details page with.
	 * @param {string} item.url - The url of the item.
	 * @returns {Promise<void>}
	 */
	const goTodetails = async (item) => {
		dispach('details', { package: extension.package, url: item.url });
	};

	searchQuery.subscribe((value) => {
		search = value;
		console.log(search);
	});

	$: {
		search;
		dataPromise = getData(); 
	}
	
</script>

<div class="flex flex-col px-4 mx-4 my-6 w-full">
	<div class="flex items-center">
		<div
			class="font-medium py-1 flex-1 text-lg md:text-2xl max-h-10 text-slate-800 dark:text-slate-200 select-none"
		>
			{extension.name}
		</div>

		<button class="px-3 py-1 flex items-center rounded-full hover:bg-gray-600/80 active:bg-gray-500">
			<span>show more</span>
			<Icon data={icons.next} />
		</button>
	</div>
	<div
		class="flex flex-row items-stretch w-full h-fit gap-3 flex-nowrap no-scrollbar overflow-x-scroll py-3"
	>
		{#await dataPromise}
			<LoadingCards />
		{:then items}
			{#each items as item}
				<a href="/details" on:click={() => goTodetails(item)}>
					<Ecard title={item.title} cover={item.cover} />
				</a>
			{/each}
		{:catch error}
			<p>{error.message}</p>
		{/await}
	</div>
</div>

<style>
	a {
		text-decoration: none;
	}
</style>
