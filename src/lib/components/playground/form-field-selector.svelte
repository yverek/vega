<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { form } from '$lib/state/form.svelte';

	type FieldTypes = { name: string };

	const fieldTypes: FieldTypes[] = [
		{ name: 'checkbox' },
		{ name: 'combobox' },
		{ name: 'datepicker' },
		{ name: 'input' },
		{ name: 'select' },
		{ name: 'slider' },
		{ name: 'switch' },
		{ name: 'textarea' }
	];
</script>

<div class="my-4 flex justify-center gap-3">
	{#each fieldTypes as { name }}
		<div class="flex items-center gap-1">
			<Button variant="outline" on:click={() => form.addField(name)} class="rounded-full" size="sm">
				{name}
			</Button>
		</div>
	{/each}
</div>
