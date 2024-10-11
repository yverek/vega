<script lang="ts">
	import type { SuperForm } from 'sveltekit-superforms';
	import type { InputField } from '$lib/types';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import type { FormSchema } from '$lib/state/form.svelte';

	type InputProps = {
		field: InputField;
		form: SuperForm<FormSchema>;
	};
	let { field, form }: InputProps = $props();
	const { form: formData } = form;
</script>

<Form.Field {form} name={field.name}>
	<Form.Control let:attrs>
		<Form.Label>{field.label}</Form.Label>
		<Input {...attrs} bind:value={$formData[field.name]} disabled={field.disabled} />
	</Form.Control>
	{#if field.description}
		<Form.Description>{field.description}</Form.Description>
	{/if}
	<Form.FieldErrors />
</Form.Field>
