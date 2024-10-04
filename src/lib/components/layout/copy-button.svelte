<script lang="ts">
	import Clipboard from 'lucide-svelte/icons/clipboard';
	import ClipboardCheck from 'lucide-svelte/icons/clipboard-check';

	import { Button } from '$lib/components/ui/button';

	type CopyButtonProps = { code: string };
	let { code }: CopyButtonProps = $props();

	let isCopying = $state(false);
</script>

<div class="relative">
	<Button
		class="absolute right-2 top-2 z-[100] size-6"
		variant="secondary"
		size="icon"
		on:click={() => {
			isCopying = true;
			navigator.clipboard.writeText(code);
			setTimeout(() => (isCopying = false), 1000);
		}}
	>
		{#if isCopying}
			<ClipboardCheck class="size-4" />
		{:else}
			<Clipboard class="size-4" />
		{/if}
	</Button>
</div>
