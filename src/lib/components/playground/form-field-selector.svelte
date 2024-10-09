<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { fieldTypes } from '$lib/constants';
	import { formState } from '$lib/state/form.svelte';
</script>

<div class="mb-8 flex justify-center gap-3">
	{#each fieldTypes as field}
		<div class="flex items-center gap-1">
			<Button variant="outline" on:click={() => formState.addField(field)} class="text-md rounded-full" size="lg">
				{field}
			</Button>
		</div>
	{/each}
</div>
