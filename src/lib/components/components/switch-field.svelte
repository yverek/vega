<script lang="ts">
	import type { SuperForm } from 'sveltekit-superforms';
	import type { SuperFormData } from 'sveltekit-superforms/client';
	import type { FormField } from '$lib/types';
	import * as Form from '$lib/components/ui/form';
	import { Switch } from '$lib/components/ui/switch';
	import type { FormSchema } from '$lib/state/form.svelte';

	type InputProps = {
		field: FormField;
		form: SuperForm<FormSchema>;
		formData: SuperFormData<FormSchema>;
	};
	let { field, form, formData }: InputProps = $props();
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
