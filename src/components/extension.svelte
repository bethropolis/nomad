<script>
	import { Card } from 'stwui';
    import Ecard from "./Ecard.svelte"
	import { onMount, tick } from 'svelte';
	import { Store } from '../store';
	import controler from '$lib/controler';
    export let extension;

    let data;

    onMount(async() => {
        data = await controler.latest(extension.package);
    })


</script>

<Card elevation="none">
	<Card.Content slot="content">

        {#if data}
            {#each data as item}
              <Ecard title={item.title} cover={item.cover} />
             {/each}
        {/if}
    </Card.Content>
</Card>

<style>
    /* your styles go here */
</style>

<!-- markup (zero or more items) goes here -->