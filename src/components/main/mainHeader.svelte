<script>
  import { searchQuery } from '../../store/store.js';
  import { Input } from 'stwui';

  let search = '';

  function updateSearchQuery(event) { // Add event parameter here
    if (event.key === 'Enter') { // Only update search when Enter is clicked
      searchQuery.set(search);
    }
  }
</script>

<main class="flex justify-end w-full p-1 sticky top-0 bg-white dark:bg-gray-700 z-50">
  <div class="search">
    <Input type="text" placeholder="Search" class="min-w-[250px]" bind:value={search} on:keydown={updateSearchQuery} />
  </div>
</main>
