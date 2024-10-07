<script lang="ts">
	import type { SuperForm } from 'sveltekit-superforms';
	import type { SuperFormData } from 'sveltekit-superforms/client';
	import type { FormField } from '$lib/types';
	import * as Form from '$lib/components/ui/form';
	import * as Select from '$lib/components/ui/select';
	import { Input } from '$lib/components/ui/input';
	import type { FormSchema } from '$lib/state/form.svelte';

	type InputProps = {
		field: FormField;
		form: SuperForm<FormSchema>;
		formData: SuperFormData<FormSchema>;
	};
	let { field, form, formData }: InputProps = $props();

	let selectedEmail = $derived($formData.email ? { label: $formData.email, value: $formData.email } : undefined);
</script>

<Form.Field {form} name={field.name}>
	<Form.Control let:attrs>
		<Form.Label>{field.label}</Form.Label>

		<Select.Root
			selected={selectedEmail}
			onSelectedChange={(v) => v && ($formData[field.name] = v.value)}
			disabled={field.disabled}
		>
			<Select.Trigger {...attrs}>
				<Select.Value placeholder={field.placeholder} />
			</Select.Trigger>

			<Select.Content>
				<Select.Item value="m@example.com" label="m@example.com" />
				<Select.Item value="m@google.com" label="m@google.com" />
				<Select.Item value="m@support.com" label="m@support.com" />
			</Select.Content>
		</Select.Root>

		<input hidden bind:value={$formData[field.name]} name={attrs.name} />
	</Form.Control>

	{#if field.description}
		<Form.Description>{field.description}</Form.Description>
	{/if}
	<Form.FieldErrors />
</Form.Field>
