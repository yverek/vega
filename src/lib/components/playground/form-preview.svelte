<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import Highlight from 'svelte-highlight';
	import { json } from 'svelte-highlight/languages';

	import {
		CheckboxField,
		ComboboxField,
		DatepickerField,
		InputField,
		SelectField,
		SliderField,
		SwitchField,
		TextareaField
	} from '$lib/components/form-fields';
	import { Button } from '$lib/components/ui/button';

	import { formState } from '$lib/state/form.svelte';

	let submittedForm = $state('');

	const previewForm = superForm(
		{},
		{
			validators: zodClient(formState.zodSchema),
			SPA: true,
			onUpdated: ({ form }) => {
				if (!form.valid) return;

				submittedForm = JSON.stringify(form.data, null, 2);
			}
		}
	);
	const { enhance } = previewForm;
</script>

{#if formState.fields.length > 0}
	<form method="POST" class="mx-auto my-8 max-w-[500px] space-y-4" use:enhance>
		{#each formState.fields as field}
			{#if field.type === 'checkbox'}
				<CheckboxField {field} form={previewForm} />
			{:else if field.type === 'combobox'}
				<ComboboxField {field} form={previewForm} />
			{:else if field.type === 'datepicker'}
				<DatepickerField {field} form={previewForm} />
			{:else if field.type === 'input'}
				<InputField {field} form={previewForm} />
			{:else if field.type === 'select'}
				<SelectField {field} form={previewForm} />
			{:else if field.type === 'slider'}
				<SliderField {field} form={previewForm} />
			{:else if field.type === 'switch'}
				<SwitchField {field} form={previewForm} />
			{:else if field.type === 'textarea'}
				<TextareaField {field} form={previewForm} />
			{/if}
		{/each}
		<Button type="submit">Submit</Button>
	</form>

	{#if submittedForm}
		<Highlight language={json} code={submittedForm} class="mx-auto mt-10 w-[500px]" />
	{/if}
{:else}
	<div class="flex h-[50vh] items-center justify-center">
		<p>No form element selected yet.</p>
	</div>
{/if}
