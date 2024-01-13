<script>
	import { onMount } from 'svelte';
	import { extensionDB } from './../../db/table/extension.js';
    import { List, Button } from 'stwui';

    let items = [];

    onMount(async () => {
        items = await extensionDB.getAllExtensions();
    })

    const uninstall = async (pkg) =>{
        await extensionDB.deleteExtension(pkg);
        items = await extensionDB.getAllExtensions();
    }
</script>


<List class="m-4">
    {#each items as item}
       <List.Item >
          <List.Item.Leading slot="leading">
             <List.Item.Leading.Avatar slot="avatar" src={item.icon} />
          </List.Item.Leading>
          <List.Item.Content slot="content">
             <List.Item.Content.Title slot="title">{item.name}</List.Item.Content.Title>
             <List.Item.Content.Description slot="description">
                {item.author}
             </List.Item.Content.Description>
          </List.Item.Content>
          <List.Item.Extra slot="extra" placement="start">
             <Button type="primary" class="rounded-full" on:click={() => uninstall(item.package)}>
                uninstall
             </Button>
          </List.Item.Extra>
       </List.Item>
    {/each}
 </List>


<style>
</style>
