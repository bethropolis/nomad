<script lang="ts">
	import { icons } from './../lib/icons.js';
   import { Menu, Badge } from 'stwui';

   
    const items = [
        {
            key: 'home',
            data: icons.home,
            label: 'Home',
            href: '/'
        },
        {
            key: 'extensions',
            data: icons.file_document,
            label: 'Extensions',
            href: '/extensions',
        },
        {
            key: 'repo',
            data: icons.poll,
            label: 'Repo',
            href: '/repo',
        },
        {
            key: 'settings',
            data: icons.settings,
            label: 'Settings',
            href: '/settings',
        }
    ];

    let active = '';
</script>

<Menu {active} class="text-lg dark:bg-gray-700">
    {#each items as item}
        {#if item.data}
            <Menu.Item
                key={item.key}
                label={item.label}
                href={item.href}
                on:click={() => (active = item.key)}
                class="flex items-center gap-2"
            >
                <Menu.Item.Icon slot="icon" data={item.data} />
            </Menu.Item>
        {/if}
    {/each}
</Menu>