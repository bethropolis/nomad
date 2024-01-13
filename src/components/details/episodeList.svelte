<script lang="ts">
	import { List } from 'stwui';
	import { onMount } from 'svelte';

	export const items = [];

	function handleSelect(item) {
		console.log(item);
	}

	onMount(() => {
		console.log(`on mount ${items.length}`);
	});

	const getItems = async () => {
		return items;
	};

	$: console.log(items); 
</script>

<List>
		{#each items as item}
			<a href="#/player" on:click={() => handleSelect(item)}>
				<List.Item>
					<List.Item.Content slot="content">
						<List.Item.Content.Description slot="description">
							{item.name}
						</List.Item.Content.Description>
					</List.Item.Content>
				</List.Item>
			</a>
		{/each}
</List>
