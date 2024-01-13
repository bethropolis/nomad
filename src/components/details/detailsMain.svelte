<script>
	import { icons } from './../../lib/icons.js';
	import { Icon } from 'stwui';
    	/**
	 * @typedef {import("../../types/extension").Detail} Detail
	 */

    /**
     * @type {Detail}
     * */
	export let data;

</script>

<main class="mx-8 h-full overflow-auto min-w-0">
	<div class="flex h-1/3 lg:h-1/2">
		<div class="image flex items-end">
			<img
				src={data.cover}
				alt={data.title}
				class="object-cover object-center aspect-auto rounded w-36 h-48"
			/>
		</div>

		<div class="mx-6 max-w-[384px] flex items-end">
			<h1 class="text-5xl">{data.title}</h1>
		</div>

        <div class="btns flex items-end justify-center flex-1 min-w-0">
            <button id="start-watch" class=""><Icon data={icons.play} />  <span>start watching</span> </button>
        </div>
	</div>

    <div class="desc mt-7 mx- w-11/12  max-h-[250px] overflow-hidden">
        <h5 class="text-gray-500">Description</h5>
        <p class="p-1">{@html data.desc}</p>
    </div>
</main>

<style>
#start-watch{
	@apply border border-primary p-3 rounded-full text-lg items-center flex gap-1 text-gray-600;
}


#start-watch:hover{
   @apply bg-primary text-white;
}

#start-watch:active{
   @apply bg-primary/80;
}
</style>
