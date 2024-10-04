<script lang="ts">
	import { form } from '$lib/state/form.svelte';
	import FormFieldItem from './form-field-item.svelte';
</script>

<div class="flex w-1/2 flex-col gap-1">
	{#if form.fields.length > 0}
		<div class="flex w-full text-sm font-medium">
			<div class="ml-12 mr-24 grid w-full grid-cols-6">
				<div class="col-span-2">Label</div>
				<div class="col-span-2">Description</div>
				<div class="col-span-1">Required</div>
				<div class="col-span-1">Disabled</div>
			</div>
		</div>

		{#each form.fields as field, index}
			<FormFieldItem {field} {index} />
		{/each}
	{/if}
</div>
