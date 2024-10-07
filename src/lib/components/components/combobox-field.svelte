<script lang="ts">
	import { tick } from 'svelte';

	import ChevronsUpDown from 'lucide-svelte/icons/chevrons-up-down';
	import Check from 'lucide-svelte/icons/check';

	import type { FormField } from '$lib/types';
	import * as Form from '$lib/components/ui/form';
	import * as Command from '$lib/components/ui/command';
	import * as Popover from '$lib/components/ui/popover';

	import { buttonVariants } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';
	import type { SuperForm } from 'sveltekit-superforms';
	import type { SuperFormData } from 'sveltekit-superforms/client';
	import type { FormSchema } from '$lib/state/form.svelte';

	type InputProps = {
		field: FormField;
		form: SuperForm<FormSchema>;
		formData: SuperFormData<FormSchema>;
	};
	let { field, form, formData }: InputProps = $props();

	let open = $state(false);

	const languages = [
		{ label: 'English', value: 'en' },
		{ label: 'French', value: 'fr' },
		{ label: 'German', value: 'de' },
		{ label: 'Spanish', value: 'es' },
		{ label: 'Portuguese', value: 'pt' },
		{ label: 'Russian', value: 'ru' },
		{ label: 'Japanese', value: 'ja' },
		{ label: 'Korean', value: 'ko' },
		{ label: 'Chinese', value: 'zh' }
	] as const;

	// We want to refocus the trigger button when the user selects an item from the list
	// so users can continue navigating the rest of the form with the keyboard.
	function closeAndFocusTrigger(triggerId: string) {
		open = false;

		tick().then(() => document.getElementById(triggerId)?.focus());
	}
</script>

<Form.Field {form} name={field.name} class="flex flex-col">
	<Popover.Root bind:open let:ids>
		<Form.Control let:attrs>
			<Form.Label>{field.label}</Form.Label>
			<Popover.Trigger
				{...attrs}
				role="combobox"
				class={cn(
					buttonVariants({ variant: 'outline' }),
					'w-[200px] justify-between',
					!$formData[field.name] && 'text-muted-foreground'
				)}
				disabled={field.disabled}
			>
				{languages.find((f) => f.value === $formData[field.name])?.label ?? 'Select language'}
				<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
			</Popover.Trigger>
			<input hidden value={$formData[field.name]} name={attrs.name} />
		</Form.Control>

		<Popover.Content class="w-[200px] p-0">
			<Command.Root>
				<Command.Input autofocus placeholder="Search language..." class="h-9" />
				<Command.Empty>No language found.</Command.Empty>
				<Command.Group>
					{#each languages as language}
						<Command.Item
							value={language.label}
							onSelect={() => {
								$formData[field.name] = language.value;
								closeAndFocusTrigger(ids.trigger);
							}}
						>
							{language.label}
							<Check class={cn('ml-auto h-4 w-4', language.value !== $formData[field.name] && 'text-transparent')} />
						</Command.Item>
					{/each}
				</Command.Group>
			</Command.Root>
		</Popover.Content>
	</Popover.Root>
	{#if field.description}
		<Form.Description>{field.description}</Form.Description>
	{/if}
	<Form.FieldErrors />
</Form.Field>
