<script>
	import extensionMapStore from '$lib/extensionMap';
	import { Avatar, Card } from 'stwui';
	import { createEventDispatcher, onMount } from 'svelte';

	/**
	 * @typedef {import("../../db/db").Extension} Extension
	 */


	/**
	 * @type {Extension}
	 */
	export let extension;

	const dispatch = createEventDispatcher();

	const handleInstall = () => {
		dispatch('install', extension.package);
	};

	const handleUninstall = () => {
		dispatch('uninstall', extension.package);
	}

	const handleUpdate = () => {
		dispatch('update', extension.package);
	}


	onMount(() => {
		
	})
</script>

<Card>
	<Card.Content slot="content">
		<div class="min-h-[70px]">
			<Avatar src={extension.icon} alt={extension.name} class="w-12 h-12" />
			<span class="text-lg px-2">{extension.name}</span>
		</div>
		<div class="flex">
			<div>version: {extension.version}</div>
		</div>
	</Card.Content>

	<Card.Actions slot="actions">
		<Card.Actions.Action>
			<Card.Actions.Action.Label slot="label" class="text-lg" on:click={handleInstall}>install</Card.Actions.Action.Label>
		</Card.Actions.Action>
	</Card.Actions>
</Card>
