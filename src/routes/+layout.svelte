<script>
	import '../app.pcss';
	import {  Layout } from 'stwui';
	import Sidebar from '../components/sidebar.svelte';
</script>

<Layout class="h-screen overflow-hidden dark:bg-gray-700 dark:text-gray-200">
	<Layout.Content expandedWidth="12rem">
		<Layout.Content.Sidebar class="flex items-center justify-center h-full bg-gray-100 dark:bg-gray-700">
			<Sidebar />
		</Layout.Content.Sidebar>
		<Layout class="flex flex-col items-center overflow-auto justify-center min-h-[48px]">

			<Layout.Content>
				<Layout.Content.Body class="min-h-[200px]"><slot /></Layout.Content.Body>
			</Layout.Content>
		</Layout>
	</Layout.Content>
</Layout>
