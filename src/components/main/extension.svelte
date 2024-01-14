<script>
	import { createEventDispatcher } from 'svelte';
	import { Icon } from 'stwui'
	import Ecard from './showCard.svelte';
	import controler from '$lib/controler';
	import LoadingCards from '../common/loadingCards.svelte';
	import {icons} from '$lib/icons';
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

	let dispach = createEventDispatcher();

	const getLatest = async () => {
		return (await controler.latest(extension.package)) || [];
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
</script>
 
<div class="flex flex-col px-4 mx-4 my-6 w-full">
	<div class="flex items-center">
		<div
			class="font-medium py-1 flex-1 text-lg md:text-2xl max-h-10 text-slate-800 dark:text-slate-200 select-none"
		>
			{extension.name}
		</div>

		<button class="px-3 py-1 flex items-center rounded-full hover:bg-gray-600/80">
			<span>show more</span>
			<Icon data={icons.next} />
		</button>
	</div>
	<div
		class="flex flex-row items-stretch w-full h-fit gap-3 flex-nowrap no-scrollbar overflow-x-auto py-3"
	>
		{#await getLatest()}
			<LoadingCards />
		{:then items}
			{#each items as item}
				<a href="#" on:click={() => goTodetails(item)}>
					<Ecard title={item.title} cover={item.cover} />
				</a>
			{/each}
		{/await}
	</div>
</div>

<style>
	/* Your styles go here */
</style>
