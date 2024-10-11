<script lang="ts">
	import type { SuperForm } from 'sveltekit-superforms';
	import type { SwitchField } from '$lib/types';
	import * as Form from '$lib/components/ui/form';
	import { Switch } from '$lib/components/ui/switch';
	import type { FormSchema } from '$lib/state/form.svelte';

	type InputProps = {
		field: SwitchField;
		form: SuperForm<FormSchema>;
	};
	let { field, form }: InputProps = $props();
	const { form: formData } = form;
</script>

<Form.Field {form} name={field.name} class="flex flex-row items-center justify-between rounded-lg border p-4">
	<Form.Control let:attrs>
		<div class="space-y-0.5">
			<Form.Label>{field.label}</Form.Label>
			{#if field.description}
				<Form.Description>{field.description}</Form.Description>
			{/if}
		</div>
		<Switch {...attrs} includeInput bind:checked={$formData[field.name]} />
	</Form.Control>
</Form.Field>
