<script>
	import { onMount } from 'svelte';
	import { Input } from 'stwui';
	import { Toggle } from 'stwui';
	import { settingsDB } from './../../db/table/setting.js';

	/**
	 * @type {Array<{key: string, value: string | boolean, type: string}>}
	 */
	let settings = [];

	onMount(async () => {
		/**
		 * @type {Array<{key: string, value: string }>}
		 */
		let all_settings = await settingsDB.getAllSettings();
		settings = [
			{
				key: 'proxy',
				value: all_settings.find((setting) => setting.key === 'proxy')?.value || '',
				type: 'text'
			},
			{
				key: 'repo',
				value: all_settings.find((setting) => setting.key === 'repo')?.value|| '',
				type: 'text'
			}
			// {
			// 	key: 'nsfw',
			// 	value: all_settings.find((setting) => setting.key === 'nsfw').value || false,
			// 	type: 'toggle'
			// }
		];
	});

	/**
	 * @param {{key: string, value: string | boolean}} setting
	 */
	function update(setting) {
		settingsDB.updateSettings(setting.key, setting.value);
	}
</script>

<main class="mx-8">
	<h1 class="dark:text-gray-300">Settings</h1>
	<div class="">
		{#each settings as setting}
			<div class="input-data my-2 w-3/4 flex">
				<label class="w-3/12 text-lg dark:text-slate-200" for={setting.key}>{setting.key}</label>
				{#if setting.type === 'toggle'}
					<Toggle bind:on={setting.value} on:click={() => update(setting)} class="w-24" />
				{:else}
					<Input
						class="w-9/12 dark:text-gray-300"
						type="text"
						id={setting.key}
						on:keyup={() => update(setting)}
						bind:value={setting.value}
					/>
				{/if}
			</div>
		{/each}
	</div>
</main>

<style>
</style>
