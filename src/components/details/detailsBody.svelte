<script>
	import { icons } from './../../lib/icons.js';
	import DetailsMain from './detailsMain.svelte';
	import { Select } from 'stwui';
	import { onMount } from 'svelte';
	import { List } from 'stwui';
	import { Icon } from 'stwui';

	/**
	 * @typedef {import("../../types/extension").Detail} Detail
	 * */

	/**
	 * @type {Detail}
	 * */
	export let data;

	/**
	 * @type {Array<object>}
	 * */
	let options = [];

	let episodes = [];
	let selectedOption = '';
	let groupedEpisodes;
	// svg play button

	const populateOptions = async () => {
		await data.episodes?.map((item) => {
			options.push({ label: item.title, value: item.title });
		});
	};

	const groupEpisodes = async () => {
		groupedEpisodes = await data.episodes?.reduce((acc, episode) => {
			const { title, urls } = episode;
			if (!acc[title]) {
				acc[title] = [];
			}
			acc[title] = [...urls];
			return acc;
		}, {});
	};

	const setDefaultOption = () => {
		selectedOption = options[0]?.label;
	};

	const updateEpisodes = () => {
		episodes = groupedEpisodes[selectedOption];
	};

	onMount(async () => {
		await populateOptions();
		await groupEpisodes();
		await setDefaultOption();
		await updateEpisodes();
	});

	/**
	 * Handle change event and update the episodes.
	 * @param {Event} e - The change event.
	 * @returns {void}
	 */
	function handleChange(e) {
		if (!groupedEpisodes[e.target.value]) {
			episodes = data.episodes[0];
		}
		selectedOption = e.target.value;
		updateEpisodes();
	}

	function handleSelect(item) {
		console.log(item);
	}

	$: console.log(episodes);
</script>

<div id="details" class="grid grid-rows-4 grid-flow-col gap-4 w-full h-full overflow-hidden">
	<div class="row-span-4 col-span-3">
		<DetailsMain {data} />
	</div>
	<div class="col-span-1 row-span-4">
		<Select placeholder={selectedOption} on:change={handleChange} {options} class="mb-2">
			<Select.Options slot="options">
				{#each options as option}
					<Select.Options.Option {option} />
				{/each}
			</Select.Options>
		</Select>

		<List bordered class=" overflow-y-auto h-full no-scrollbar min-w-[270px] last:mb-5">
			{#each episodes as item}
				<a href="#/player" on:click={() => handleSelect(item)}>
					<List.Item class="px-2 border-b">
						<List.Item.Content slot="content">
							<List.Item.Content.Description slot="description" class="flex gap-1 items-center">
								<Icon data={icons.play} />
								<span>{item.name}</span>
							</List.Item.Content.Description>
						</List.Item.Content>
					</List.Item>
				</a>
			{/each}
		</List>
	</div>
</div>

<style>
</style>
