<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<div class="mx-16 grid min-h-[100dvh] grid-rows-[auto_1fr_auto]">
	{@render children()}
</div>
