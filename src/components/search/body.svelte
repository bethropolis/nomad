<script>
	import { onMount } from 'svelte';
	import { searchQuery } from '../../store/store.js';
	import { sessionDB } from '../../store/session';
	import Ecard from '../common/showCard.svelte';
	import LoadingCards from '../common/loadingCards.svelte';
	import controler from '$lib/controler';
	import { set } from 'mobx';

	/**
	 * @typedef {import("../../types/extension").ListItem} ListItem
	 */

	let pkg = sessionDB.getItem('package');

	let isLoading = false;
	let search = '';
	let page = 1;
	let observer;

	/**
	 * @type {ListItem[]}
	 */
	let data = [];

	const getLatest = async (page = 1) => {
		let result = (await controler.latest(pkg, page)) || [];
		data = [...data, ...result];
	};

	const loadMore = async (entries, observer) => {
		if (entries[0].isIntersecting && !isLoading) {
			isLoading = true;
            setTimeout(() => {
			page++;
            }, 1000);
			isLoading = false;
		}
	};

	const getsearch = async (query = '', page = 1) => {
		let result = (await controler.search(pkg, query, page)) || [];
		if (page === 1) {
			data = result;
		} else {
			data = [...data, ...result];
		}
	};

	/**
	 * Navigates to the details page with the specified item.
	 * @param {Object} item - The item to navigate to the details page with.
	 * @param {string} item.url - The url of the item.
	 * @returns {Promise<void>}
	 */
	const goTodetails = async (item) => {
		sessionDB.setItem('details', { package: pkg, url: item.url });
	};

	const getData = async (page = 1) => {
        isLoading = true;
        console.log(page, search);

		if (search) {
			await getsearch(search, page);
		} else {
			await getLatest(page);
		}
        isLoading = false;
	};

	onMount(async () => {
		observer = new IntersectionObserver(loadMore);
		observer.observe(document.querySelector('.load-more'));
	});

	searchQuery.subscribe((value) => {
		search = value;
	});

	$: {
		search;
		getData(page);
	}
</script>

<main class="p-4">
	<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 gap-y-8 grid-auto">
		{#each data as item}
			<a href="/details" on:click={() => goTodetails(item)}>
				<Ecard title={item.title} cover={item.cover} />
			</a>
		{/each}

		<div class="load-more"></div>

		{#if isLoading}
			<LoadingCards />
		{/if}
	</div>
</main>

<style>
	/* your styles go here */
</style>
