<script>
	import { createEventDispatcher, onMount } from 'svelte';
	import extensionMapStore from '$lib/extensionMap';
	import { Avatar, Card } from 'stwui';

	/**
	 * @typedef {import("../../db/db").Extension} Extension
	 */


	/**
	 * @type {Extension}
	 */
	export let extension;

	let state = $extensionMapStore.get(extension.package) ? "uninstall" : "install";


	const dispatch = createEventDispatcher();

	const handleInstall = async () => {
		state = "installing";
		await dispatch('install', extension.package);
		await checkState();
	};

	const handleUninstall = async () => {
		state = "uninstalling";
		await dispatch('uninstall', extension.package);
		await checkState();
	}

	const handleUpdate = async () => {
		await dispatch('update', extension.package); 
	}

	const handleClick = () =>{
		if(state == "install"){
			handleInstall()
		}else{
			handleUninstall();
		}
	}


	const checkState = () =>{
		if($extensionMapStore.get(extension.package)){
			state = "uninstall"
		}	
	}


	onMount(async () => {
		// await checkState()
	})


	$: $extensionMapStore && checkState();
</script>

<Card class="dark:bg-gray-600">
	<Card.Content slot="content">
		<div class="min-h-[70px]">
			<Avatar src={extension.icon} alt={extension.name} class="w-12 h-12" />
			<span class="text-lg px-2">{extension.name}</span>
		</div>
		<div class="flex">
			<div>version: {extension.version}</div>
		</div>
	</Card.Content>

	<Card.Actions slot="actions" class="dark:bg-gray-500 ">
		<Card.Actions.Action class="dak:hover:text-blue-200">
			<Card.Actions.Action.Label slot="label" class="text-lg dak:hover:text-blue-200" on:click={handleClick}>{state}</Card.Actions.Action.Label>
		</Card.Actions.Action>
	</Card.Actions>
</Card>
