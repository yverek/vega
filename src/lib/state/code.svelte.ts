import { formState } from './form.svelte';
import type { FormField } from '$lib/types';

export class CodeState {
	#page = $derived(this.#buildPageCode());
	#schema = $derived(this.#buildSchemaCode());
	#server = this.#buildServerCode();
	#fieldToString = {
		checkbox: (field: FormField) => this.#checkboxToString(field),
		combobox: (field: FormField) => this.#comboboxToString(field),
		datepicker: (field: FormField) => this.#datepickerToString(field),
		input: (field: FormField) => this.#inputToString(field),
		select: (field: FormField) => this.#selectToString(field),
		slider: (field: FormField) => this.#sliderToString(field),
		switch: (field: FormField) => this.#switchToString(field),
		textarea: (field: FormField) => this.#textareaToString(field)
	};
	#fieldToComponent = {
		checkbox: (field: FormField) => this.#checkboxToComponent(field),
		combobox: (field: FormField) => this.#comboboxToComponent(field),
		datepicker: (field: FormField) => this.#datepickerToComponent(field),
		input: (field: FormField) => this.#inputToComponent(field),
		select: (field: FormField) => this.#selectToComponent(field),
		slider: (field: FormField) => this.#sliderToComponent(field),
		switch: (field: FormField) => this.#switchToComponent(field),
		textarea: (field: FormField) => this.#textareaToComponent(field)
	};

	get page() {
		return this.#page;
	}

	get server() {
		return this.#server;
	}

	get schema() {
		return this.#schema;
	}

	#checkboxToString({ name, required, defaultValue }: FormField) {
		let code = `  ${name}: z.boolean()`;

		if (!required) code += '.optional()';
		if (defaultValue) code += `.default(${defaultValue})`;

		return code;
	}

	#comboboxToString({ name, required, defaultValue }: FormField) {
		// TODO implement this
		let code = `  ${name}: z.string()`;

		if (!required) code += '.optional()';
		if (defaultValue) code += `.default(${defaultValue})`;

		return code;
	}

	#datepickerToString({ name, required, defaultValue }: FormField) {
		// TODO implement this
		let code = `  ${name}: z.string()`;

		if (!required) code += '.optional()';
		if (defaultValue) code += `.default(${defaultValue})`;

		return code;
	}

	#inputToString({ name, required, defaultValue }: FormField) {
		// TODO implement this
		let code = `  ${name}: z.string()`;

		if (!required) code += '.optional()';
		if (defaultValue) code += `.default(${defaultValue})`;

		return code;
	}

	#selectToString({ name, required, defaultValue }: FormField) {
		// TODO implement this
		let code = `  ${name}: z.string()`;

		if (!required) code += '.optional()';
		if (defaultValue) code += `.default(${defaultValue})`;

		return code;
	}

	#sliderToString({ name, required, defaultValue }: FormField) {
		// TODO implement this
		let code = `  ${name}: z.string()`;

		if (!required) code += '.optional()';
		if (defaultValue) code += `.default(${defaultValue})`;

		return code;
	}

	#switchToString({ name, required, defaultValue }: FormField) {
		// TODO implement this
		let code = `  ${name}: z.boolean()`;

		if (!required) code += '.optional()';
		if (defaultValue) code += `.default(${defaultValue})`;

		return code;
	}

	#textareaToString({ name, required, defaultValue }: FormField) {
		// TODO implement this
		let code = `  ${name}: z.string()`;

		if (!required) code += '.optional()';
		if (defaultValue) code += `.default(${defaultValue})`;

		return code;
	}

	#checkboxToComponent({ name, label, description, disabled }: FormField) {
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
	}

	#comboboxToComponent({ name, label, description, disabled }: FormField) {
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
	}

	#datepickerToComponent({ name, label, description, disabled }: FormField) {
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
	}

	#inputToComponent({ name, label, description, disabled }: FormField) {
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
	}

	#selectToComponent({ name, label, description, placeholder, disabled }: FormField) {
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
	}

	#sliderToComponent({ name, label, description, disabled }: FormField) {
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
	}

	#switchToComponent({ name, label, description, disabled }: FormField) {
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
	}

	#textareaToComponent({ name, label, description, placeholder, disabled }: FormField) {
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
	}

	#buildSchemaCode() {
		const zodFields = formState.fields.map((f) => this.#fieldToString[f.type](f)).join(',\n');

		return `import { z } from "zod";\n\nexport const schema = z.object({\n${zodFields}\n});`;
	}

	#buildServerCode() {
		const imports = new Set([
			'import { superValidate } from "sveltekit-superforms";',
			'import { zod } from "sveltekit-superforms/adapters";',
			'import type { PageServerLoad } from "./$types";',
			'import { schema } from "./schema";',
			'',
			'export const load: PageServerLoad = async () => {',
			'  return {',
			'    form: await superValidate(zod(schema)),',
			'  };',
			'};'
		]);

		return Array.from(imports).join('\n') + '\n';
	}

	#buildPageCode() {
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
		result += '</script>\n\n';

		result += '<form method="POST" class="min-w-[500px] space-y-4" use:enhance>\n';
		result += formState.fields.map((field) => this.#fieldToComponent[field.type](field)).join('');
		result += '  <Form.Button>Submit</Form.Button>\n';
		result += '</form>\n';

		return result;
	}
}

export const codeState = new CodeState();
