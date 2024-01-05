<script>
	import { extensionDB } from "../db/db";
	import Extension from "./extension.svelte";

    let extensions = []
    const loadExtensions = async () => {
       extensions = await extensionDB.getAllExtensions();
    }
</script>

{#await loadExtensions()}
    <p>Loading...</p>
{:then}
    <ul>
        {#each extensions as extension}
            <Extension extension={extension} />
        {/each}
    </ul>
{/await}


<style>
    /* your styles go here */
</style>

<!-- markup (zero or more items) goes here -->