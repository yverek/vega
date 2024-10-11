<script lang="ts">
	import type { SuperForm } from 'sveltekit-superforms';
	import type { SliderField } from '$lib/types';
	import * as Form from '$lib/components/ui/form';
	import { Slider } from '$lib/components/ui/slider';
	import type { FormSchema } from '$lib/state/form.svelte';

	type InputProps = {
		field: SliderField;
		form: SuperForm<FormSchema>;
	};
	let { field, form }: InputProps = $props();
	const { form: formData } = form;
</script>

<Form.Field {form} name={field.name}>
	<Form.Control let:attrs>
		<Form.Label>{field.label}</Form.Label>
		<!-- <Slider {...attrs} value={[$formData[field.name]]} min={0} max={100} step={1} /> -->
	</Form.Control>
	{#if field.description}
		<Form.Description>{field.description}</Form.Description>
	{/if}
	<Form.FieldErrors />
</Form.Field>
