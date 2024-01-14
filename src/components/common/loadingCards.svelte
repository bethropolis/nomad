<script>
    const cards = Array.from({ length: 7 }, (_, index) => index);
</script>

{#each cards as card}
    <div id="loading" class="rounded-md w-36 overflow-hidden mx-4 shadow-md h-48 relative animate-background">
        
    </div>
{/each}

<style>

    :root {
        --loader-1: #f0f0f0;
        --loader-2: #e0e0e0;
    }

    :global(.dark) {
        --loader-1: #4b5563;
        --loader-2: #334155;
    }


    @keyframes background {
        0% {
            background-color: var(--loader-1);
        }
        50% {
            background-color: var(--loader-2);
        }
        100% {
            background-color: var(--loader-1);
        }
    }

    .animate-background {
        animation: background 3s ease-in-out infinite;
    }
</style>
