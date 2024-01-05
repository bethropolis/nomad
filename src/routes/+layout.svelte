<script>
	import '../app.pcss';
	import {  Layout } from 'stwui';
	import Sidebar from '../components/sidebar.svelte';
	import Footer from '../components/footer.svelte';
</script>

<Layout class="h-screen overflow-hidden">
	<Layout.Content expandedWidth="12rem">
		<Layout.Content.Sidebar class="flex items-center justify-center h-full bg-gray-100"
			><Sidebar />
		</Layout.Content.Sidebar>
		<Layout class="flex flex-col items-center overflow-auto justify-center min-h-[48px]">

			<Layout.Content>
				<Layout.Content.Body class="min-h-[200px]"><slot /></Layout.Content.Body>
			</Layout.Content>

			<Layout.Footer class="static  bg-white text-slate-800 z-0 max-h-[64px]">
				<Footer />
			</Layout.Footer>
		</Layout>
	</Layout.Content>
</Layout>
