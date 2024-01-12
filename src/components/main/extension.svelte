<script>
	import Ecard from './showCard.svelte';
	import controler from '$lib/controler';
	import LoadingCards from '../common/loadingCards.svelte';
	import { createEventDispatcher } from 'svelte';

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

	let dispach =  createEventDispatcher();

	const getLatest = async () => {
		return (await controler.latest(extension.package)) || [];
	};

	const goTodetails = async (item) => {
		dispach('details', {package:extension.package, url:item.url});
	};
</script>

<div class="flex flex-col px-4 mx-4 my-6 w-full">
	<div>
		<div class="font-medium text-2xl max-h-10">{extension.name}</div>
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
