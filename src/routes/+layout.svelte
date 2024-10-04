<script lang="ts">
	import Header from '$lib/components/layout/header.svelte';
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';

	let { children } = $props();
</script>

<ModeWatcher />

<div class="mx-16 grid min-h-[100dvh] grid-rows-[auto_1fr_auto]">
	<Header />
	{@render children()}
</div>
