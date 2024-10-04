<script lang="ts">
	import '../app.css';

	import { ModeWatcher } from 'mode-watcher';

	import { Toaster } from '$lib/components/ui/sonner';
	import Header from '$lib/components/layout/header.svelte';

	let { children } = $props();
</script>

<Toaster richColors closeButton position={'top-center'} />
<ModeWatcher />

<div class="mx-auto grid min-h-[100dvh] w-[95%] grid-rows-[auto_1fr_auto]">
	<Header />
	{@render children()}
</div>
