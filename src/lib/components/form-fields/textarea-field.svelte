<script lang="ts">
	import type { SuperForm } from 'sveltekit-superforms';
	import type { SuperFormData } from 'sveltekit-superforms/client';
	import type { FormField } from '$lib/types';
	import * as Form from '$lib/components/ui/form';
	import { Textarea } from '$lib/components/ui/textarea';
	import type { FormSchema } from '$lib/state/form.svelte';

	type InputProps = {
		field: FormField;
		form: SuperForm<FormSchema>;
	};
	let { field, form }: InputProps = $props();
	const { form: formData } = form;
</script>

<Form.Field {form} name={field.name}>
	<Form.Control let:attrs>
		<Form.Label>{field.label}</Form.Label>
		<Textarea
			{...attrs}
			placeholder={field.placeholder}
			class="resize-none"
			bind:value={$formData[field.name]}
			disabled={field.disabled}
		/>
		{#if field.description}
			<Form.Description>{field.description}</Form.Description>
		{/if}
	</Form.Control>
	<Form.FieldErrors />
</Form.Field>
