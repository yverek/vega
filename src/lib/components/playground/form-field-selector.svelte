<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { form } from '$lib/state/form.svelte';
	import type { fieldTypes } from '$lib/types';

	const fields: fieldTypes[] = [
		'checkbox',
		'combobox',
		'datepicker',
		'input',
		'select',
		'slider',
		'switch',
		'textarea'
	];
</script>

<div class="my-10 flex justify-center gap-3">
	{#each fields as field}
		<div class="flex items-center gap-1">
			<Button variant="outline" on:click={() => form.addField(field)} class="text-md rounded-full" size="lg">
				{field}
			</Button>
		</div>
	{/each}
</div>
