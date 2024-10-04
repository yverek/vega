<script lang="ts">
	import Highlight, { LineNumbers } from 'svelte-highlight';
	import typescript from 'svelte-highlight/languages/typescript';
	import githubDarkDimmed from 'svelte-highlight/styles/github-dark-dimmed';

	import * as Tabs from '$lib/components/ui/tabs';
	import { form } from '$lib/state/form.svelte';
	import type { FormField } from '$lib/types';
	import CopyButton from '../layout/copy-button.svelte';

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

	const checkboxComponent = ({ name, disabled }: FormField) => {
		const isDisabled = disabled ? '{disabled} ' : '';

		return `<Checkbox id="${name}" bind:checked={$formData.${name}} ${isDisabled}/>`;
	};

	const comboboxComponent = ({ type, name, disabled }: FormField) => {
		const isDisabled = disabled ? '{disabled} ' : '';

		let result = '<Popover.Root bind:open let:ids>';
		result += '\n        <Popover.Trigger asChild let:builder>';
		result +=
			'\n          <Button builders={[builder]} variant="outline" role="combobox" aria-expanded={open} class="w-[200px] justify-between">';
		result += '\n            {selectedValue}';
		result += '\n            <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />';
		result += '\n          </Button>';
		result += '\n        </Popover.Trigger>';
		result += '\n        <Popover.Content class="w-[200px] p-0">';
		result += '\n          <Command.Root>';
		result += '\n            <Command.Input placeholder="Search framework..." />';
		result += `\n            <Command.Empty>No framework found.</Command.Empty>`;
		result += `\n            <Command.Group>`;
		result += `\n              {#each frameworks as framework}`;
		result += `\n                <Command.Item value={framework.value} onSelect={(currentValue) => {`;
		result += `\n                    value = currentValue;`;
		result += `\n                    closeAndFocusTrigger(ids.trigger);`;
		result += `\n                  }}`;
		result += `\n                >`;
		result += `\n                  <Check class={cn("mr-2 h-4 w-4", value !== framework.value && "text-transparent")} />`;
		result += `\n                  {framework.label}`;
		result += `\n                </Command.Item>`;
		result += `\n              {/each}`;
		result += `\n            </Command.Group>`;
		result += `\n          </Command.Root>`;
		result += `\n        </Popover.Content>`;
		result += `\n      </Popover.Root>`;

		return result;
	};

	const datepickerComponent = ({ type, name, disabled }: FormField) => {
		const isDisabled = disabled ? '{disabled} ' : '';

		let result = '<Popover.Root openFocus>';
		result += '\n        <Popover.Trigger asChild let:builder>';
		result +=
			'\n          <Button variant="outline" class={cn("w-[280px] justify-start text-left font-normal", !value && "text-muted-foreground")} builders={[builder]}>';
		result += '\n          <CalendarIcon class="mr-2 h-4 w-4" />';
		result += '\n            {value ? df.format(value.toDate(getLocalTimeZone())) : "Select a date"}';
		result += '\n          </Button>';
		result += '\n        </Popover.Trigger>';
		result += '\n        <Popover.Content class="w-auto p-0">';
		result += '\n          <Calendar bind:value initialFocus />';
		result += '\n        </Popover.Content>';
		result += `\n      </Popover.Root>`;

		return result;
	};

	const inputComponent = ({ type, name, disabled }: FormField) => {
		const isDisabled = disabled ? '{disabled} ' : '';

		// TODO change type because is wrong!
		return `<Input {...attrs} type="${type}" bind:value={$formData.${name}} ${isDisabled}/>`;
	};

	const selectComponent = ({ name, placeholder, disabled }: FormField) => {
		const isDisabled = disabled ? '{disabled} ' : '';

		let result = `<Select.Root selected={selectedEmail} onSelectedChange={(v) => { v && ($formData.${name} = v.value)}}>`;
		result += '\n        <Select.Trigger {...attrs}>';
		result += '\n          <Select.Value placeholder="${placeholder}" />';
		result += '\n        </Select.Trigger>';
		result += '\n        <Select.Content>';
		result += '\n          <Select.Item value="m@example.com" label="m@example.com" />';
		result += '\n          <Select.Item value="m@google.com" label="m@google.com" />';
		result += '\n          <Select.Item value="m@support.com" label="m@support.com" />';
		result += '\n        </Select.Content>';
		result += '\n      </Select.Root>';
		result += `\n      <input hidden bind:value={$formData.${name}} name={attrs.name} />`;

		return result;
	};

	const sliderComponent = ({ name, disabled }: FormField) => {
		const isDisabled = disabled ? '{disabled} ' : '';

		// TODO change this values
		return `<Slider {...attrs} bind:value={$formData.${name}} max={100} step={1} ${isDisabled}/>`;
	};

	const switchComponent = ({ name, disabled }: FormField) => {
		const isDisabled = disabled ? '{disabled} ' : '';

		return `<Switch {...attrs} bind:checked={$formData.${name}} ${isDisabled}/>`;
	};

	const textareaComponent = ({ name, placeholder, disabled }: FormField) => {
		const isDisabled = disabled ? '{disabled} ' : '';

		return `<Textarea {...attrs} placeholder="${placeholder}" bind:value={$formData.${name}} ${isDisabled}/>`;
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

	const getFieldComponent = (field: FormField) => {
		const { name, description, label, type } = field;

		let result = `\n  <Form.Field {form} name="${name}">`;
		result += '\n    <Form.Control let:attrs>';
		result += `\n      <Form.Label>${label}</Form.Label>`;
		result += `\n      ${fieldToComponent[type](field)}`;
		result += '\n    </Form.Control>';
		if (description) result += `\n    <Description>${description}</Description>`;
		result += '\n    <Form.FieldErrors />';
		result += '\n  </Form.Field>';

		return result;
	};

	let pageCode = $derived.by(() => {
		let result = '<script lang="ts">\n';

		const imports = new Set([
			'  import { superForm } from "sveltekit-superforms";',
			'  import { zodClient } from "sveltekit-superforms/adapters";\n',
			'  import { schema } from "./schema";\n',
			'  import * as Form from "$lib/components/ui/form";'
		]);

		// 'checkbox' | 'combobox' | 'datepicker' | 'input' | 'select' | 'slider' | 'switch' | 'textarea'
		if (form.fields.some(({ type }) => type === 'checkbox'))
			imports.add('  import { Checkbox } from "$lib/components/ui/checkbox";');

		if (form.fields.some(({ type }) => type === 'combobox')) {
			imports.add('  import * as Command from "$lib/components/ui/command";');
			imports.add('  import * as Popover from "$lib/components/ui/popover";');
		}

		if (form.fields.some(({ type }) => type === 'datepicker')) {
			imports.add('  import { Calendar } from "$lib/components/ui/calendar";'); // or range calendar
			imports.add('  import * as Popover from "$lib/components/ui/popover";');
		}

		if (form.fields.some(({ type }) => type === 'input'))
			imports.add('  import { Input } from "$lib/components/ui/input";');

		if (form.fields.some(({ type }) => type === 'select'))
			imports.add('  import * as Select from "$lib/components/ui/select";');

		if (form.fields.some(({ type }) => type === 'slider'))
			imports.add('  import { Slider } from "$lib/components/ui/slider";');

		if (form.fields.some(({ type }) => type === 'switch'))
			imports.add('  import { Switch } from "$lib/components/ui/switch";');

		if (form.fields.some(({ type }) => type === 'textarea'))
			imports.add('  import { Textarea } from "$lib/components/ui/textarea";');

		result += Array.from(imports).join('\n') + '\n';

		result += '\n  let { data } = $props();\n';

		result += '\n  const form = superForm(data.form, {';
		result += '\n    validators: zodClient(schema),';
		result += '\n  });';

		result += '\n  const { form: formData, enhance } = form;';
		result += '\n<\/script>\n'; // prettier-ignore

		result += '\n<form method="POST" use:enhance>';
		result += form.fields.map((field) => getFieldComponent(field));
		result += '\n  <Form.Button>Submit</Form.Button>';
		result += '\n</form>';

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

		const zodFields = form.fields.map((field) => `  ${field.name}: ${fieldToZod[field.type](field)}`);

		result += `export const schema = z.object({\n${zodFields.join('')}});\n`;

		return result;
	});
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
			{#if form.fields.length > 0}
				FormPreview
			{:else}
				<div class="flex h-[50vh] items-center justify-center">
					<p>No form element selected yet.</p>
				</div>
			{/if}
		</Tabs.Content>
		<Tabs.Content value="code">
			{#if form.fields.length > 0}
				<Tabs.Root value="page" class="w-full">
					<Tabs.List class="mx-auto flex w-fit justify-center">
						<Tabs.Trigger value="page">+page.svelte</Tabs.Trigger>
						<Tabs.Trigger value="server">+page.server.ts</Tabs.Trigger>
						<Tabs.Trigger value="schema">schema.ts</Tabs.Trigger>
					</Tabs.List>
					<Tabs.Content value="page">
						<Highlight language={typescript} code={pageCode} let:highlighted>
							<CopyButton code={pageCode} />
							<LineNumbers {highlighted} hideBorder />
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
