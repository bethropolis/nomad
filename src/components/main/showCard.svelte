<script>
    export let title = '';
    export let cover = '';
</script>

<div class="border border-gray-300 rounded-md overflow-hidden mx-1 flex-none shadow-md w-36 h-48 relative">
        <img src={cover} alt="{title}"  class="object-cover object-center aspect-auto w-full h-full" />
</div>

<style>
    /* No specific styles needed here as TailwindCSS classes are used */
</style>
