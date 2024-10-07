<script lang="ts">
	import SuperDebug, { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import Highlight, { LineNumbers } from 'svelte-highlight';
	import typescript from 'svelte-highlight/languages/typescript';
	import githubDarkDimmed from 'svelte-highlight/styles/github-dark-dimmed';

	import * as Form from '$lib/components/ui/form';
	import * as Tabs from '$lib/components/ui/tabs';
	import { formSchema, formState, type FormSchema, type ValidatedFormSchema } from '$lib/state/form.svelte';
	import type { FormField } from '$lib/types';
	import CopyButton from '../layout/copy-button.svelte';
	import InputField from '../components/input-field.svelte';
	import CheckboxField from '../components/checkbox-field.svelte';
	import ComboboxField from '../components/combobox-field.svelte';
	import DatepickerField from '../components/datepicker-field.svelte';
	import SelectField from '../components/select-field.svelte';
	import SliderField from '../components/slider-field.svelte';
	import SwitchField from '../components/switch-field.svelte';
	import TextareaField from '../components/textarea-field.svelte';

	const zodBoolean = (field: FormField) => {
		const isRequired = field.required ? `{ required_error: "${field.label} is required" }` : '';

		return `z.boolean(${isRequired}),\n`;
	};

	const zodNumber = (field: FormField) => {
		const isRequired = field.required ? `{ required_error: "${field.label} is required" }` : '';

		let res = `z.number(${isRequired}),\n`;

		// TODO add options like min(), max() ecc

		return res;
	};

	const zodString = (field: FormField) => {
		const isRequired = field.required ? `{ required_error: "${field.label} is required" }` : '';

		let res = `z.string(${isRequired}),\n`;

		// TODO add options like url(), ip() ecc

		return res;
	};

	const zodDate = (field: FormField) => {
		const isRequired = field.required ? `{ required_error: "${field.label} is required" }` : '';

		let res = `z.date(${isRequired}),\n`;

		// TODO add options like url(), ip() ecc

		return res;
	};

	const fieldToZod = {
		checkbox: (field: FormField) => zodBoolean(field),
		combobox: (field: FormField) => zodString(field),
		datepicker: (field: FormField) => zodDate(field),
		input: (field: FormField) => zodString(field),
		select: (field: FormField) => zodString(field),
		slider: (field: FormField) => zodNumber(field),
		switch: (field: FormField) => zodBoolean(field),
		textarea: (field: FormField) => zodString(field)
	};

	const checkboxComponent = ({ name, label, description, disabled }: FormField) => {
		let result = '';
		const isDisabled = disabled ? 'disabled ' : '';

		result += `  <Form.Field {form} name="${name}" class="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">\n`;
		result += `    <Form.Control let:attrs>\n`;
		result += `      <Checkbox {...attrs} bind:checked={$formData.${name}} ${isDisabled}/>\n`;
		result += `      <div class="space-y-1 leading-none">\n`;
		result += `        <Form.Label>${label}</Form.Label>\n`;
		if (description) result += `        <Form.Description>${description}</Form.Description>\n`;
		result += `      </div>\n`;
		result += `      <input name={attrs.name} value={$formData.${name}} hidden />\n`;
		result += `    </Form.Control>\n`;
		result += `    <Form.FieldErrors />\n`;
		result += `  </Form.Field>\n`;

		return result;
	};

	const comboboxComponent = ({ name, label, description, disabled }: FormField) => {
		let result = '';

		// TODO this component is almost done, the last thing to do is to add {label, value} array to schema.ts
		// TODO add button in dialog to build this array with user data
		result += `  <Form.Field {form} name="${name}" class="flex flex-col">\n`;
		result += `    <Popover.Root bind:open let:ids>\n`;
		result += `      <Form.Control let:attrs>\n`;
		result += `        <Form.Label>${label}</Form.Label>\n`;
		result += `        <Popover.Trigger\n`;
		result += `          {...attrs}\n`;
		result += `          role="combobox"\n`;
		result += `          class={cn(\n`;
		result += `            buttonVariants({ variant: 'outline' }),\n`;
		result += `            'w-[200px] justify-between',\n`;
		result += `            !$formData.${name} && 'text-muted-foreground'\n`;
		result += `          )}\n`;
		if (disabled) result += `          disabled\n`;
		result += `        >\n`;
		result += `          {languages.find((f) => f.value === $formData.${name})?.label ?? "Select language"}\n`;
		result += `          <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />\n`;
		result += `        </Popover.Trigger>\n`;
		result += `        <input hidden value={$formData.${name}} name={attrs.name} />\n`;
		result += `      </Form.Control>\n`;
		result += `      <Popover.Content class="w-[200px] p-0">\n`;
		result += `        <Command.Root>\n`;
		result += `          <Command.Input autofocus placeholder="Search language..." class="h-9" />\n`;
		result += `          <Command.Empty>No language found.</Command.Empty>\n`;
		result += `          <Command.Group>\n`;
		result += `            {#each languages as language}\n`;
		result += `              <Command.Item value={language.label} onSelect={() => {\n`;
		result += `                  $formData.${name} = language.value;\n`;
		result += `                  closeAndFocusTrigger(ids.trigger);\n`;
		result += `                }}\n`;
		result += `              >\n`;
		result += `                {language.label}\n`;
		result += `                <Check class={cn("ml-auto h-4 w-4", language.value !== $formData.${name} && "text-transparent")} />\n`;
		result += `              </Command.Item>\n`;
		result += `            {/each}\n`;
		result += `          </Command.Group>\n`;
		result += `        </Command.Root>\n`;
		result += `      </Popover.Content>\n`;
		result += `    </Popover.Root>\n`;
		if (description) result += `    <Form.Description>${description}</Form.Description>\n`;
		result += `    <Form.FieldErrors />\n`;
		result += `  </Form.Field>\n`;

		return result;
	};

	const datepickerComponent = ({ name, label, description, disabled }: FormField) => {
		let result = '';

		result += `  <Form.Field {form} name="${name}" class="flex flex-col">\n`;
		result += `    <Form.Control let:attrs>\n`;
		result += `      <Form.Label>${label}</Form.Label>\n`;
		result += `      <Popover.Root>\n`;
		result += `        <Popover.Trigger\n`;
		result += `          {...attrs}\n`;
		result += `          class={cn(\n`;
		result += `            buttonVariants({ variant: 'outline' }),\n`;
		result += `            'w-[280px] justify-start pl-4 text-left font-normal',\n`;
		result += `            !value && 'text-muted-foreground'\n`;
		result += `          )}\n`;
		if (disabled) result += `          disabled\n`;
		result += `        >\n`;
		result += `          {value ? df.format(value.toDate(getLocalTimeZone())) : "Pick a date"}\n`;
		result += `          <CalendarIcon class="ml-auto h-4 w-4 opacity-50" />\n`;
		result += `        </Popover.Trigger>\n`;
		result += `        <Popover.Content class="w-auto p-0" side="top">\n`;
		result += `          <Calendar\n`;
		result += `            {value}\n`;
		result += `            bind:placeholder\n`;
		result += `            minValue={new CalendarDate(1900, 1, 1)}\n`;
		result += `            maxValue={today(getLocalTimeZone())}\n`;
		result += `            calendarLabel="Date of birth"\n`;
		result += `            initialFocus\n`;
		result += `            onValueChange={(v) => ($formData.dob = v ? v.toString() : '')}\n`;
		result += `          />\n`;
		result += `        </Popover.Content>\n`;
		result += `      </Popover.Root>\n`;
		if (description) result += `      <Form.Description>${description}</Form.Description>\n`;
		result += `      <Form.FieldErrors />\n`;
		result += `      <input hidden value={$formData.${name}} name={attrs.name} />\n`;
		result += `    </Form.Control>\n`;
		result += `  </Form.Field>\n`;

		return result;
	};

	const inputComponent = ({ name, label, description, disabled }: FormField) => {
		let result = '';
		const isDisabled = disabled ? 'disabled ' : '';

		// TODO add type="${type}" to this field
		result += `  <Form.Field {form} name="${name}">\n`;
		result += `    <Form.Control let:attrs>\n`;
		result += `      <Form.Label>${label}</Form.Label>\n`;
		result += `      <Input {...attrs} bind:value={$formData.${name}} ${isDisabled}/>\n`;
		result += `    </Form.Control>\n`;
		if (description) result += `    <Form.Description>${description}</Form.Description>\n`;
		result += `    <Form.FieldErrors />\n`;
		result += `  </Form.Field>\n`;

		return result;
	};

	const selectComponent = ({ name, label, description, placeholder, disabled }: FormField) => {
		let result = '';

		// TODO replace 3 select item with each loops from user input
		result += `  <Form.Field {form} name="${name}">\n`;
		result += `    <Form.Control let:attrs>\n`;
		result += `      <Form.Label>${label}</Form.Label>\n`;
		result += `      <Select.Root\n`;
		result += `        selected={selectedEmail}\n`;
		result += `        onSelectedChange={(v) => v && ($formData.${name} = v.value)}\n`;
		if (disabled) result += `        disabled\n`;
		result += `      >\n`;
		result += `        <Select.Trigger {...attrs}>\n`;
		result += `          <Select.Value placeholder="${placeholder}" />\n`;
		result += `        </Select.Trigger>\n`;
		result += `        <Select.Content>\n`;
		result += `          <Select.Item value="m@example.com" label="m@example.com" />\n`;
		result += `          <Select.Item value="m@google.com" label="m@google.com" />\n`;
		result += `          <Select.Item value="m@support.com" label="m@support.com" />\n`;
		result += `        </Select.Content>\n`;
		result += `      </Select.Root>\n`;
		result += `      <input hidden bind:value={$formData.${name}} name={attrs.name} />\n`;
		result += `    </Form.Control>\n`;
		if (description) result += `    <Form.Description>${description}</Form.Description>\n`;
		result += `    <Form.FieldErrors />\n`;
		result += `  </Form.Field>\n`;

		return result;
	};

	const sliderComponent = ({ name, label, description, disabled }: FormField) => {
		let result = '';
		const isDisabled = disabled ? 'disabled ' : '';

		// TODO replace min, max, step values from user input
		// TODO this must be fixed because bind:values doesn't work properly
		result += `  <Form.Field {form} name="${name}">\n`;
		result += `    <Form.Control let:attrs>\n`;
		result += `      <Form.Label>${label}</Form.Label>\n`;
		result += `      <Slider {...attrs} value={[$formData.${name}]} min={0} max={100} step={1} ${isDisabled}/>\n`;
		result += `    </Form.Control>\n`;
		if (description) result += `    <Form.Description>${description}</Form.Description>\n`;
		result += `    <Form.FieldErrors />\n`;
		result += `  </Form.Field>\n`;

		return result;
	};

	const switchComponent = ({ name, label, description, disabled }: FormField) => {
		let result = '';
		const isDisabled = disabled ? 'disabled ' : '';

		result += `  <Form.Field {form} name="${name}" class="flex flex-row items-center justify-between rounded-lg border p-4">\n`;
		result += `    <Form.Control let:attrs>\n`;
		result += `      <div class="space-y-0.5">\n`;
		result += `        <Form.Label>${label}</Form.Label>\n`;
		if (description) result += `        <Form.Description>${description}</Form.Description>\n`;
		result += `      </div>\n`;
		result += `      <Switch {...attrs} includeInput bind:checked={$formData.${name}} ${isDisabled}/>\n`;
		result += `    </Form.Control>\n`;
		result += `  </Form.Field>\n`;

		return result;
	};

	const textareaComponent = ({ name, label, description, placeholder, disabled }: FormField) => {
		let result = '';

		result += `  <Form.Field {form} name="bio">\n`;
		result += `    <Form.Control let:attrs>\n`;
		result += `      <Form.Label>${label}</Form.Label>\n`;
		result += `      <Textarea\n`;
		result += `        {...attrs}\n`;
		if (placeholder) result += `        placeholder="${placeholder}"\n`;
		result += `        class="resize-none"\n`;
		result += `        bind:value={$formData.${name}}\n`;
		if (disabled) result += `        disabled\n`;
		result += `      />\n`;
		if (description) result += `      <Form.Description>${description}</Form.Description>\n`;
		result += `    </Form.Control>\n`;
		result += `    <Form.FieldErrors />\n`;
		result += `  </Form.Field>\n`;

		return result;
	};

	const fieldToComponent = {
		checkbox: (field: FormField) => checkboxComponent(field),
		combobox: (field: FormField) => comboboxComponent(field),
		datepicker: (field: FormField) => datepickerComponent(field),
		input: (field: FormField) => inputComponent(field),
		select: (field: FormField) => selectComponent(field),
		slider: (field: FormField) => sliderComponent(field),
		switch: (field: FormField) => switchComponent(field),
		textarea: (field: FormField) => textareaComponent(field)
	};

	let pageCode = $derived.by(() => {
		let result = '<script lang="ts">\n';

		const imports = new Set([
			'  import { superForm } from "sveltekit-superforms";',
			'  import { zodClient } from "sveltekit-superforms/adapters";\n',
			'  import { schema } from "./schema";\n',
			'  import * as Form from "$lib/components/ui/form";'
		]);

		const code = new Set([
			'  let { data } = $props();\n',
			'  const form = superForm(data.form, {',
			'    validators: zodClient(schema),',
			'  });',
			'  const { form: formData, enhance } = form;\n'
		]);

		if (formState.fields.some(({ type }) => type === 'checkbox'))
			imports.add('  import { Checkbox } from "$lib/components/ui/checkbox";');

		if (formState.fields.some(({ type }) => type === 'combobox')) {
			imports.add('  import * as Command from "$lib/components/ui/command";');
			imports.add('  import * as Popover from "$lib/components/ui/popover";');
			imports.add('  import { buttonVariants } from "$lib/components/ui/button";');
			imports.add('  import { cn } from "$lib/utils";');
			imports.add('  import ChevronsUpDown from "lucide-svelte/icons/chevrons-up-down";');
			imports.add('  import Check from "lucide-svelte/icons/check";');
			imports.add('  import { tick } from "svelte"');

			code.add('  let open = $state(false);\n');
			code.add('  // We want to refocus the trigger button when the user selects an item from the list');
			code.add('  // so users can continue navigating the rest of the form with the keyboard.');
			code.add('  function closeAndFocusTrigger(triggerId: string) {');
			code.add('    open = false;');
			code.add('    tick().then(() => document.getElementById(triggerId)?.focus());');
			code.add('  }\n');
		}

		if (formState.fields.some(({ type }) => type === 'datepicker')) {
			imports.add('  import { Calendar } from "$lib/components/ui/calendar";'); // or range calendar
			imports.add('  import * as Popover from "$lib/components/ui/popover";');
			imports.add('  import { buttonVariants } from "$lib/components/ui/button";');
			imports.add('  import { cn } from "$lib/utils";');
			imports.add('  import CalendarIcon from "lucide-svelte/icons/calendar";');
			imports.add(
				'  import { CalendarDate, DateFormatter, getLocalTimeZone, parseDate, today } from "@internationalized/date";'
			);

			code.add('  const df = new DateFormatter("en-US", { dateStyle: "long" });');
			code.add('  let placeholder = $state(today(getLocalTimeZone()));');
			code.add('  let value = $derived($formData.dob ? parseDate($formData.dob) : undefined);\n');
		}

		if (formState.fields.some(({ type }) => type === 'input'))
			imports.add('  import { Input } from "$lib/components/ui/input";');

		if (formState.fields.some(({ type }) => type === 'select')) {
			imports.add('  import * as Select from "$lib/components/ui/select";');

			code.add(
				`  let selectedEmail = $derived($formData.email ? { label: $formData.email, value: $formData.email } : undefined);\n`
			);
		}

		if (formState.fields.some(({ type }) => type === 'slider'))
			imports.add('  import { Slider } from "$lib/components/ui/slider";');

		if (formState.fields.some(({ type }) => type === 'switch'))
			imports.add('  import { Switch } from "$lib/components/ui/switch";');

		if (formState.fields.some(({ type }) => type === 'textarea'))
			imports.add('  import { Textarea } from "$lib/components/ui/textarea";');

		result += Array.from(imports).join('\n') + '\n\n';
		result += Array.from(code).join('\n');
		result += '<\/script>\n\n'; // prettier-ignore

		result += '<form method="POST" class="min-w-[500px] space-y-4" use:enhance>\n';
		result += formState.fields.map((field) => fieldToComponent[field.type](field)).join('');
		result += '  <Form.Button>Submit</Form.Button>\n';
		result += '</form>\n';

		return result;
	});

	let serverCode = $derived.by(() => {
		const imports = new Set([
			'import { superValidate } from "sveltekit-superforms";',
			'import { zod } from "sveltekit-superforms/adapters";',
			'import type { PageServerLoad } from "./$types";',
			'import { schema } from "./schema";'
		]);

		let result = Array.from(imports).join('\n') + '\n';

		result += '\nexport const load: PageServerLoad = async () => {';
		result += '\n  return {';
		result += '\n    form: await superValidate(zod(schema)),';
		result += '\n  };';
		result += '\n};\n';

		return result;
	});

	let schemaCode = $derived.by(() => {
		let result = 'import { z } from "zod";\n\n';

		const zodFields = formState.fields.map((field) => `  ${field.name}: ${fieldToZod[field.type](field)}`);

		result += `export const schema = z.object({\n${zodFields.join('')}});\n`;

		return result;
	});

	type FormPreviewProps = { form: ValidatedFormSchema };
	let { form }: FormPreviewProps = $props();

	const previewForm = superForm(form, {
		validators: zodClient(formSchema),
		onSubmit: ({ formData }) => {
			console.log('🚀 ~ formData:', formData);
		}
	});
	const { form: formData, enhance } = previewForm;
</script>

<svelte:head>
	{@html githubDarkDimmed}
</svelte:head>

<div class="flex h-full w-1/2 justify-center rounded-xl">
	<Tabs.Root value="code" class="w-full">
		<Tabs.List class="mx-auto flex w-fit justify-center">
			<Tabs.Trigger value="preview">Preview</Tabs.Trigger>
			<Tabs.Trigger value="code">Code</Tabs.Trigger>
		</Tabs.List>
		<Tabs.Content value="preview">
			{#if formState.fields.length > 0}
				<form method="POST" class="mx-auto my-8 max-w-[500px] space-y-4" use:enhance>
					{#each formState.fields as field}
						{#if field.type === 'checkbox'}
							<CheckboxField {field} form={previewForm} {formData} />
						{:else if field.type === 'combobox'}
							<ComboboxField {field} form={previewForm} {formData} />
						{:else if field.type === 'datepicker'}
							<DatepickerField {field} form={previewForm} {formData} />
						{:else if field.type === 'input'}
							<InputField {field} form={previewForm} {formData} />
						{:else if field.type === 'select'}
							<SelectField {field} form={previewForm} {formData} />
						{:else if field.type === 'slider'}
							<SliderField {field} form={previewForm} {formData} />
						{:else if field.type === 'switch'}
							<SwitchField {field} form={previewForm} {formData} />
						{:else if field.type === 'textarea'}
							<TextareaField {field} form={previewForm} {formData} />
						{/if}
					{/each}
					<Form.Button>Submit</Form.Button>
					<SuperDebug data={formData} />
				</form>
			{:else}
				<div class="flex h-[50vh] items-center justify-center">
					<p>No form element selected yet.</p>
				</div>
			{/if}
		</Tabs.Content>
		<Tabs.Content value="code">
			{#if formState.fields.length > 0}
				<Tabs.Root value="page" class="w-full">
					<Tabs.List class="mx-auto flex w-fit justify-center">
						<Tabs.Trigger value="page">+page.svelte</Tabs.Trigger>
						<Tabs.Trigger value="server">+page.server.ts</Tabs.Trigger>
						<Tabs.Trigger value="schema">schema.ts</Tabs.Trigger>
					</Tabs.List>
					<Tabs.Content value="page">
						<Highlight language={typescript} code={pageCode} let:highlighted>
							<CopyButton code={pageCode} />
							<LineNumbers {highlighted} hideBorder wrapLines />
						</Highlight>
					</Tabs.Content>
					<Tabs.Content value="server">
						<Highlight language={typescript} code={serverCode} let:highlighted>
							<CopyButton code={serverCode} />
							<LineNumbers {highlighted} hideBorder />
						</Highlight>
					</Tabs.Content>
					<Tabs.Content value="schema">
						<Highlight language={typescript} code={schemaCode} let:highlighted>
							<CopyButton code={schemaCode} />
							<LineNumbers {highlighted} hideBorder />
						</Highlight>
					</Tabs.Content>
				</Tabs.Root>
			{:else}
				<div class="flex h-[50vh] items-center justify-center">
					<p>No form element selected yet.</p>
				</div>
			{/if}
		</Tabs.Content>
	</Tabs.Root>
</div>
