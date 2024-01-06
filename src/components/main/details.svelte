<script>
import controler from '$lib/controler';
import DetailsBody from './detailsBody.svelte';

/**
 * @typedef {Object} SelectedPackage
 * @property {string} package - The selected package
 * @property {string} url - The shows url
 */


/**
 * @type {SelectedPackage}
 */
export let selected;


const getDetails = async () => {
  if (selected.package) {
    return controler.detail({ ...selected });
  }
};
</script>

{#if selected}
	{#await getDetails()}
		<p>Loading...</p>
	{:then data}
		<DetailsBody {data} />
	{/await}
{/if}
