<script>
	import { onMount } from 'svelte';
	import { settingsDB } from './../../db/table/setting.js';
    export let title = '';
    export let cover = '';


    let proxy = ""

    onMount(async () => {
        proxy = (await settingsDB.getSettings('proxy'))?.value
    })
</script>

<div class="border dark:border-none border-gray-300 rounded-md overflow-hidden mx-1 flex-none shadow-md w-36 h-48 relative">
        <img src={(proxy+cover)} alt="{title}"  class="object-cover object-center aspect-auto w-full h-full" />
</div>

<style>
    /* No specific styles needed here as TailwindCSS classes are used */
</style>
