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

<Card hoverable>
	<Card.Content slot="content">
		<div class="">
			<Avatar src={extension.icon} alt={extension.name} class="w-12 h-12" />
			{extension.name}
		</div>
	</Card.Content>

	<Card.Actions slot="actions">
		<Card.Actions.Action>
			<Card.Actions.Action.Label slot="label" class="text-lg" on:click={handleInstall}>install</Card.Actions.Action.Label>
		</Card.Actions.Action>
	</Card.Actions>
</Card>
