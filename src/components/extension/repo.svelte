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

    console.log(settingsStore.getSetting('repo') + '/index.json')
	onMount(async () => {
		extensionDB.getAllExtensions().then((extensions) => {
			const map = new Map();
			extensions.forEach((extension) => {
				map.set(extension.package, true);
			});
			extensionMapStore.setExtensionMap(map);
		});

		try {
			$data = await request(settingsStore.getSetting('repo') + '/index.json');
		} catch (err) {
			//alert(err);
		} finally {
			isLoading = false;
		}
	});

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
		const script = await request(`${settingsStore.getSetting('repo')}/repo/${pkg.trim()}.js`);

		if (!script) {
			alert('Package not found!');
		}

		extensionStore
			.installExtension(script)
			.then(() => {
				setExtensionMapAndUpdateView(pkg, true);
			})
			.catch((err) => {
				alert('error during install');
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


{#if $data && $data.length > 0}

    {#each $data as item}
      <ExtensionCard extension={item} on:install={() => handleInstall(item.package)} on:uninstall={() => handleUninstall(item.package)} on:update={() => handleUpdate(item.package)} />
    {/each}
{/if}

<style>
	/* your styles go here */
</style>
