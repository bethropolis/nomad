<script lang="ts">
   import { Menu, Badge } from 'stwui';

    const home = '<g fill="none" fill-rule="evenodd" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="m1.5 10.5l9-9l9 9"/><path d="M3.5 8.5v8a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-8"/></g>'    
    const file_document = '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m8.499 5.5l-2 .003a1 1 0 0 0-1 1V8.5a1 1 0 0 0 .884.993l.118.007l2-.003a1 1 0 0 0 .999-1V6.501a1 1 0 0 0-.884-.994zm6 0l-2 .003a1 1 0 0 0-1 1V8.5a1 1 0 0 0 .884.993l.118.007l2-.003a1 1 0 0 0 .999-1V6.501a1 1 0 0 0-.884-.994zm-6 6l-2 .003a1 1 0 0 0-1 1V14.5a1 1 0 0 0 .884.993l.118.007l2-.003a1 1 0 0 0 .999-1v-1.996a1 1 0 0 0-.884-.994zm5.001 0v4m2-2h-4"/>';
    const poll = '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M3.5 7.5h14v7.998a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2zm0-3.978h14a1 1 0 0 1 1 1V6.5a1 1 0 0 1-1 1h-14a1 1 0 0 1-1-1V4.522a1 1 0 0 1 1-1m5 6.978h4"/>';
    const settings = '<g fill="none" fill-rule="evenodd" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" transform="translate(3 3)"><path stroke-width=".933" d="M7.5.5c.351 0 .697.026 1.034.076l.508 1.539c.445.127.868.308 1.26.536l1.46-.704c.517.397.977.865 1.365 1.389l-.73 1.447c.221.396.395.822.514 1.27l1.53.533a7.066 7.066 0 0 1-.017 1.948l-1.539.508a5.567 5.567 0 0 1-.536 1.26l.704 1.46a7.041 7.041 0 0 1-1.389 1.365l-1.447-.73a5.507 5.507 0 0 1-1.27.514l-.533 1.53a7.066 7.066 0 0 1-1.948-.017l-.508-1.539a5.567 5.567 0 0 1-1.26-.536l-1.46.704a7.041 7.041 0 0 1-1.365-1.389l.73-1.447a5.565 5.565 0 0 1-.514-1.27l-1.53-.534a7.066 7.066 0 0 1 .017-1.947l1.539-.508c.127-.445.308-.868.536-1.26l-.704-1.46a7.041 7.041 0 0 1 1.389-1.365l1.447.73a5.507 5.507 0 0 1 1.27-.514l.534-1.53A7.06 7.06 0 0 1 7.5.5"/><circle cx="7.5" cy="7.5" r="3"/></g>' ;

    const items = [
        {
            key: 'home',
            data: home,
            label: 'Home',
            href: '/'
        },
        {
            key: 'extensions',
            data: file_document,
            label: 'Extensions',
            href: '/extensions',
        },
        {
            key: 'repo',
            data: poll,
            label: 'Repo',
            href: '/repo',
        },
        {
            key: 'settings',
            data: settings,
            label: 'Settings',
            href: '/settings',
        }
    ];

    let active = '';
</script>

<Menu {active} class="text-lg">
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