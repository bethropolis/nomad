<script>
	import { invoke } from '@tauri-apps/api/tauri';
	import Body from '../components/main/body.svelte';
	import { onMount } from 'svelte';

	onMount(async () => {
		try {
			await invoke('close_splashscreen');
		} catch (e) {
			// console.log(e);
		}
	});
</script>

<main class="overflow-x-hidden overflow-y-auto no-scrollbar w-full h-full">
	<Body />
</main>
