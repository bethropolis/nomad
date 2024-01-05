<script>
	import { Store } from '../../store';
	import extensionMapStore from '$lib/extensionMap';
	import ExtensionCard from './extensionCard.svelte';
	import { writable } from 'svelte/store';
	import { request } from '$lib/req';
	import { onMount } from 'svelte';
	import { extensionDB } from '../../db/db';

	const { settingsStore, extensionStore } = new Store();

	let data = writable([]);
	let isLoading = true;

	const fetchData = async () => {
		await settingsStore.init(); // Wait for settingsStore initialization

		extensionDB.getAllExtensions().then((extensions) => {
			const map = new Map();
			extensions.forEach((extension) => {
				map.set(extension.package, true);
			});
			extensionMapStore.setExtensionMap(map);
		});

		try {
			let repo = await settingsStore.getSetting('repo');
			$data = await request(repo + '/index.json');
		} catch (err) {
			//alert(err);
		} finally {
			isLoading = false;
		}
	};

	onMount(fetchData);

	/**
	 * @param {string} pkg - The package name
	 * @param {boolean} installed - Indicates whether the package is installed or not
	 */
	const setExtensionMapAndUpdateView = (pkg, installed) => {
		extensionMapStore.updateExtensionMap(pkg, installed);
	};

	/**
	 * Handles the installation of a package.
	 * @param {string} pkg - The name of the package to install.
	 */
	const handleInstall = async (pkg) => {
		const script = await request(`${await settingsStore.getSetting('repo')}/repo/${pkg.trim()}.js`);

		if (!script) {
			alert('Package not found!');
		}

		extensionStore
			.installExtension(script)
			.then(() => {
				setExtensionMapAndUpdateView(pkg, true);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	/**
	 * Handles the uninstallation of a package.
	 * @param {string} pkg - The name of the package to install.
	 */
	const handleUninstall = async (pkg) => {
		extensionStore.unloadExtension(pkg);
		setExtensionMapAndUpdateView(pkg, false);
	};

	/**
	 * Handles the update of a package.
	 * @param {string} pkg - The name of the package to install.
	 */
	const handleUpdate = async (pkg) => {
		await handleUninstall(pkg);
		await handleInstall(pkg);
	};
</script>

<main class="grid grid-cols-4 gap-4 overflow-scroll p-10">

{#if $data && $data.length > 0}
	{#each $data as item}
		<ExtensionCard
			extension={item}
			on:install={() => handleInstall(item.package)}
			on:uninstall={() => handleUninstall(item.package)}
			on:update={() => handleUpdate(item.package)}
		/>
	{/each}
{/if}
</main>
<style>
	/* your styles go here */
</style>
