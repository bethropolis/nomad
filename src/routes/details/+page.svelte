<script >
	import Details from '../../components/details/details.svelte';
	import { sessionDB } from '../../store/session';

    let selected = sessionDB.getItem('details');
</script>



 <main class="overflow-x-hidden overflow-y-auto w-full h-full">
	<Details  {selected}/>
 </main>
