<script>
    const cards = Array.from({ length: 7 }, (_, index) => index);
</script>

{#each cards as card}
    <div id="loading" class="rounded-md w-36 overflow-hidden mx-4 shadow-md h-48 relative animate-background">
        
    </div>
{/each}

<style>
    /* Add custom background loading animation */
    @keyframes background {
        0% {
            background-color: #f0f0f0;
        }
        50% {
            background-color: #e0e0e0;
        }
        100% {
            background-color: #f0f0f0;
        }
    }

    .animate-background {
        animation: background 3s ease-in-out infinite;
    }
</style>
