<script >
	import { page } from '$app/stores';
	import { details } from '../../store/store';
	import Details from './../../components/main/details.svelte';

    let selected = $details;
</script>



 <main class="overflow-x-hidden overflow-y-auto w-full h-full">
	<Details  {selected}/>
 </main>
