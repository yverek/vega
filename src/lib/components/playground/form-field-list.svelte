<script lang="ts">
	import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action';

	import { formState } from '$lib/state/form.svelte';
	import FormFieldItem from './form-field-item.svelte';
</script>

<div class="flex w-1/2 flex-col gap-1">
	{#if formState.fields.length > 0}
		<div class="flex w-full text-sm font-medium">
			<div class="ml-12 mr-24 grid w-full grid-cols-6">
				<div class="col-span-2">Name</div>
				<div class="col-span-2">Label</div>
				<div class="col-span-1">Required</div>
				<div class="col-span-1">Disabled</div>
			</div>
		</div>

		<section
			use:dndzone={{ items: formState.fields, flipDurationMs: 300, dropTargetStyle: {} }}
			on:consider={(e) => (formState.fields = e.detail.items)}
			on:finalize={(e) => (formState.fields = e.detail.items)}
		>
			{#each formState.fields as field (field.id)}
				<div animate:flip={{ duration: 300 }}>
					<FormFieldItem {field} />
				</div>
			{/each}
		</section>
	{/if}
</div>
