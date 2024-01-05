
<script lang="ts">
	import { Card, Media } from 'stwui';

    export let title = '';
    export let cover = '';
</script>

<Card>
	<Card.Cover slot="cover">
		<img
			src={cover}
			alt="cover"
			class="object-cover object-center w-full aspect-1 h-[300px]"
		/>
		<Card.Cover.Overlay class="top-[unset] h-24">
			<Media class="absolute bottom-0 left-0 right-0 px-4 py-5">
				<Media.Content>
					<Media.Content.Description>{title}</Media.Content.Description>
				</Media.Content>
			</Media>
		</Card.Cover.Overlay>
	</Card.Cover>
</Card>