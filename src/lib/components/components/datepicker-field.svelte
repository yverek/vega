<script lang="ts">
	import type { SuperForm } from 'sveltekit-superforms';
	import type { SuperFormData } from 'sveltekit-superforms/client';
	import { CalendarDate, DateFormatter, getLocalTimeZone, parseDate, today } from '@internationalized/date';
	import type { FormField } from '$lib/types';
	import * as Form from '$lib/components/ui/form';
	import { Calendar } from '$lib/components/ui/calendar';
	import * as Popover from '$lib/components/ui/popover';
	import { buttonVariants } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';
	import CalendarIcon from 'lucide-svelte/icons/calendar';
	import type { FormSchema } from '$lib/state/form.svelte';

	type InputProps = {
		field: FormField;
		form: SuperForm<FormSchema>;
		formData: SuperFormData<FormSchema>;
	};
	let { field, form, formData }: InputProps = $props();

	const df = new DateFormatter('en-US', { dateStyle: 'long' });
	let placeholder = $state(today(getLocalTimeZone()));
	let value = $derived($formData.dob ? parseDate($formData.dob) : undefined);
</script>

<Form.Field {form} name={field.name} class="flex flex-col">
	<Form.Control let:attrs>
		<Form.Label>{field.label}</Form.Label>
		<Popover.Root>
			<Popover.Trigger
				{...attrs}
				class={cn(
					buttonVariants({ variant: 'outline' }),
					'w-[280px] justify-start pl-4 text-left font-normal',
					!value && 'text-muted-foreground'
				)}
				disabled={field.disabled}
			>
				{value ? df.format(value.toDate(getLocalTimeZone())) : 'Pick a date'}
				<CalendarIcon class="ml-auto h-4 w-4 opacity-50" />
			</Popover.Trigger>
			<Popover.Content class="w-auto p-0" side="top">
				<Calendar
					{value}
					bind:placeholder
					minValue={new CalendarDate(1900, 1, 1)}
					maxValue={today(getLocalTimeZone())}
					calendarLabel="Date of birth"
					initialFocus
					onValueChange={(v) => ($formData[field.name] = v ? v.toString() : '')}
				/>
			</Popover.Content>
		</Popover.Root>
		{#if field.description}
			<Form.Description>{field.description}</Form.Description>
		{/if}
		<Form.FieldErrors />
		<input hidden value={$formData[field.name]} name={attrs.name} />
	</Form.Control>
</Form.Field>
