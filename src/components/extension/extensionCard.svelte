<script lang="ts">
	import { Card } from 'stwui';
    export let extension = {};
</script>

<Card hoverable>
	<Card.Content slot="content">{extension.name}</Card.Content>
</Card>