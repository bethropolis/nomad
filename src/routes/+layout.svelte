<script>
	import '../app.pcss';
	import { Layout } from 'stwui';
	import Sidebar from '../components/sidebar.svelte';
</script>

<Layout class="h-screen w-screen overflow-hidden dark:bg-gray-700 dark:text-gray-200">
	<Layout.Content>
		<Layout.Content.Sidebar
			class="flex items-center justify-center h-full bg-gray-100 dark:bg-gray-700 w-16"
		>
			<Sidebar />
		</Layout.Content.Sidebar>
		<Layout class="flex flex-col items-center  justify-center min-w-0 min-h-[48px]">
			<Layout.Content>
				<Layout.Content.Body class="min-h-[200px]"><slot /></Layout.Content.Body>
			</Layout.Content>
		</Layout>
	</Layout.Content>
</Layout>
