<script lang="ts">
	import type { SuperForm } from 'sveltekit-superforms';
	import type { SuperFormData } from 'sveltekit-superforms/client';
	import type { FormField } from '$lib/types';
	import * as Form from '$lib/components/ui/form';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import type { FormSchema } from '$lib/state/form.svelte';

	type InputProps = {
		field: FormField;
		form: SuperForm<FormSchema>;
	};
	let { field, form }: InputProps = $props();
	const { form: formData } = form;
</script>

<Form.Field {form} name={field.name} class="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
	<Form.Control let:attrs>
		<Checkbox {...attrs} bind:checked={$formData[field.name]} disabled={field.disabled} />
		<div class="space-y-1 leading-none">
			<Form.Label>{field.label}</Form.Label>
			{#if field.description}
				<Form.Description>{field.description}</Form.Description>
			{/if}
		</div>
		<input name={attrs.name} value={$formData[field.name]} hidden />
	</Form.Control>
	<Form.FieldErrors />
</Form.Field>
