<script>
	import { Input } from 'stwui';
	import { Toggle } from 'stwui';
	import { settingsDB } from './../../db/table/setting.js';

	export let data;
Input
	function update(setting) {
		settingsDB.updateSettings(setting.key, setting.value);
	}
</script>

<main class="mx-8">
	<h1>Settings</h1>
	<div class="">
		{#each data.settings as setting}
			<div class="input-data my-2 w-3/4 flex">
				<label class="w-3/12 text-lg" for={setting.key}>{setting.key}</label>
				{#if setting.type === 'toggle'}
					<Toggle bind:on={setting.value} on:click={() => update(setting)} class="w-24" />
				{:else}
					<Input
						class="w-9/12"
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
