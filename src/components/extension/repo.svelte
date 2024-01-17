<script>
	import { Store } from '../../store';
	import extensionMapStore from '$lib/extensionMap';
	import ExtensionCard from './extensionCard.svelte';
	import { writable } from 'svelte/store';
	import { request } from '$lib/req';
	import { extensionDB } from '../../db/db';

	const { settingsStore, extensionStore } = new Store();

	let data = writable([]);
	let isLoading = true;

	const fetchData = async () => {
		await settingsStore.init(); // Wait for settingsStore initialization

		await extensionDB.getAllExtensions().then((extensions) => {
			const map = new Map();
			extensions.forEach((extension) => {
				map.set(extension.package, true);
			});
			extensionMapStore.setExtensionMap(map);
		});

		try {
			const repository = await settingsStore.getSetting('repo');
			const response = (await request(repository + '/index.json')) || [];

			const filteredData = await Promise.all(
				response.map(async (item) => {
					if (await filterRepos(item)) {
						return item;
					}
					return null;
				})
			);

			// Remove null items from the array
			const finalFilteredData = filteredData.filter((item) => item !== null);

			$data = finalFilteredData;
		} catch (err) {
			// Handle errors
		} finally {
			isLoading = false;
		}
	};

	const filterRepos = async (item) => {
		const allowedTypes = await settingsStore.getSetting('allowed_types'); // Get settings synchronously
		const nsfw = await settingsStore.getSetting('nsfw');

		return allowedTypes.includes(item.type) && (nsfw || item?.nsfw != 'true');
	};

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

<main class="grid grid-cols-4 gap-4 w-full h-full overflow-auto p-10 no-scrollbar">
	{#await fetchData()}
		<p>loading..</p>
	{:then}
		{#each $data as item}
			<ExtensionCard
				extension={item}
				on:install={() => handleInstall(item.package)}
				on:uninstall={() => handleUninstall(item.package)}
				on:update={() => handleUpdate(item.package)}
			/>
		{/each}
	{/await}
</main>

<style>
	/* your styles go here */
</style>
