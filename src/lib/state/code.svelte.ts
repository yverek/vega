import { formState } from './form.svelte';
import type {
	CheckboxField,
	ComboboxField,
	DatepickerField,
	InputField,
	SelectField,
	SliderField,
	SwitchField,
	TextareaField
} from '$lib/types';

export class CodeState {
	#page = $derived(this.#buildPageCode());
	#schema = $derived(this.#buildSchemaCode());
	#server = this.#buildServerCode();

	get page() {
		return this.#page;
	}

	get server() {
		return this.#server;
	}

	get schema() {
		return this.#schema;
	}

	#checkbox = {
		toComponent: ({ name, label, description, disabled }: CheckboxField) => {
			const code = [
				`  <Form.Field {form} name="${name}" class="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">`,
				`    <Form.Control let:attrs>`,
				`      <Checkbox`,
				`        {...attrs}`,
				`        bind:checked={$formData.${name}}`,
				disabled && `        disabled`,
				`      />`,
				`      <div class="space-y-1 leading-none">`,
				`        <Form.Label>${label}</Form.Label>`,
				description && `        <Form.Description>${description}</Form.Description>`,
				`      </div>`,
				`      <input name={attrs.name} value={$formData.${name}} hidden />`,
				`    </Form.Control>`,
				`    <Form.FieldErrors />`,
				`  </Form.Field>`
			];

			return code.filter((v) => v).join('\n');
		},
		toSchema: ({ name, required, value }: CheckboxField) => {
			let code = `  ${name}: z.boolean()`;

			if (!required) code += '.optional()';
			if (value) code += `.default(${value})`;

			return code;
		}
	};

	#combobox = {
		toComponent: ({ name, label, description, disabled }: ComboboxField) => {
			// TODO this component is almost done, the last thing to do is to add {label, value} array to schema.ts
			// TODO add button in dialog to build this array with user data
			const code = [
				`  <Form.Field {form} name="${name}" class="flex flex-col">`,
				`    <Popover.Root bind:open let:ids>`,
				`      <Form.Control let:attrs>`,
				`        <Form.Label>${label}</Form.Label>`,
				`        <Popover.Trigger`,
				`          {...attrs}`,
				`          role="combobox"`,
				`          class={cn(`,
				`            buttonVariants({ variant: 'outline' }),`,
				`            'w-[200px] justify-between',`,
				`            !$formData.${name} && 'text-muted-foreground'`,
				`          )}`,
				disabled && `          disabled`,
				`        >`,
				`          {languages.find((f) => f.value === $formData.${name})?.label ?? "Select language"}`,
				`          <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />`,
				`        </Popover.Trigger>`,
				`        <input hidden value={$formData.${name}} name={attrs.name} />`,
				`      </Form.Control>`,
				`      <Popover.Content class="w-[200px] p-0">`,
				`        <Command.Root>`,
				`          <Command.Input autofocus placeholder="Search language..." class="h-9" />`,
				`          <Command.Empty>No language found.</Command.Empty>`,
				`          <Command.Group>`,
				`            {#each languages as language}`,
				`              <Command.Item value={language.label} onSelect={() => {`,
				`                  $formData.${name} = language.value;`,
				`                  closeAndFocusTrigger(ids.trigger);`,
				`                }}`,
				`              >`,
				`                {language.label}`,
				`                <Check class={cn("ml-auto h-4 w-4", language.value !== $formData.${name} && "text-transparent")} />`,
				`              </Command.Item>`,
				`            {/each}`,
				`          </Command.Group>`,
				`        </Command.Root>`,
				`      </Popover.Content>`,
				`    </Popover.Root>`,
				description && `    <Form.Description>${description}</Form.Description>`,
				`    <Form.FieldErrors />`,
				`  </Form.Field>`
			];

			return code.filter((v) => v).join('\n');
		},
		toSchema: ({ name, required, value }: ComboboxField) => {
			// TODO implement this
			let code = `  ${name}: z.string()`;

			if (!required) code += '.optional()';
			if (value) code += `.default(${value})`;

			return code;
		}
	};

	#datepicker = {
		toComponent: ({ name, label, description, disabled }: DatepickerField) => {
			const code = [
				`  <Form.Field {form} name="${name}" class="flex flex-col">`,
				`    <Form.Control let:attrs>`,
				`      <Form.Label>${label}</Form.Label>`,
				`      <Popover.Root>`,
				`        <Popover.Trigger`,
				`          {...attrs}`,
				`          class={cn(`,
				`            buttonVariants({ variant: 'outline' }),`,
				`            'w-[280px] justify-start pl-4 text-left font-normal',`,
				`            !value && 'text-muted-foreground'`,
				`          )}`,
				disabled && `          disabled`,
				`        >`,
				`          {value ? df.format(value.toDate(getLocalTimeZone())) : "Pick a date"}`,
				`          <CalendarIcon class="ml-auto h-4 w-4 opacity-50" />`,
				`        </Popover.Trigger>`,
				`        <Popover.Content class="w-auto p-0" side="top">`,
				`          <Calendar`,
				`            {value}`,
				`            bind:placeholder`,
				`            minValue={new CalendarDate(1900, 1, 1)}`,
				`            maxValue={today(getLocalTimeZone())}`,
				`            calendarLabel="${label}"`,
				`            initialFocus`,
				`            onValueChange={(v) => ($formData.${name} = v ? v.toString() : '')}`,
				`          />`,
				`        </Popover.Content>`,
				`      </Popover.Root>`,
				description && `      <Form.Description>${description}</Form.Description>`,
				`      <Form.FieldErrors />`,
				`      <input hidden value={$formData.${name}} name={attrs.name} />`,
				`    </Form.Control>`,
				`  </Form.Field>`
			];

			return code.filter((v) => v).join('\n');
		},
		toSchema: ({ name, required, value }: DatepickerField) => {
			// TODO implement this
			let code = `  ${name}: z.string()`;

			if (!required) code += '.optional()';
			if (value) code += `.default(${value})`;

			return code;
		}
	};

	#input = {
		toComponent: ({ name, label, placeholder, description, disabled, typeAttribute }: InputField) => {
			const code = [
				`  <Form.Field {form} name="${name}">`,
				`    <Form.Control let:attrs>`,
				`      <Form.Label>${label}</Form.Label>`,
				`      <Input`,
				`        {...attrs}`,
				`        type="${typeAttribute}"`,
				placeholder && `        placeholder="${placeholder}"`,
				`        bind:value={$formData.${name}}`,
				disabled && `        disabled`,
				`      />`,
				`    </Form.Control>`,
				description && `    <Form.Description>${description}</Form.Description>`,
				`    <Form.FieldErrors />`,
				`  </Form.Field>`
			];

			return code.filter((v) => v).join('\n');
		},
		toSchema: ({ name, required, value }: InputField) => {
			// TODO implement this
			let code = `  ${name}: z.string()`;

			if (!required) code += '.optional()';
			if (value) code += `.default(${value})`;

			return code;
		}
	};

	#select = {
		toComponent: ({ name, label, placeholder, description, disabled, values }: SelectField) => {
			const selectContent = values.map((v) => `          <Select.Item value="${v.value}" label="${v.label}" />`);

			const code = [
				`  <Form.Field {form} name="${name}">`,
				`    <Form.Control let:attrs>`,
				`      <Form.Label>${label}</Form.Label>`,
				`      <Select.Root`,
				`        selected={selected${name}Value}`,
				`        onSelectedChange={(v) => v && ($formData.${name} = v.value)}`,
				disabled && `        disabled`,
				`      >`,
				`        <Select.Trigger {...attrs}>`,
				placeholder && `          <Select.Value placeholder="${placeholder}" />`,
				`        </Select.Trigger>`,
				`        <Select.Content>`,
				...selectContent,
				`        </Select.Content>`,
				`      </Select.Root>`,
				`      <input hidden bind:value={$formData.${name}} name={attrs.name} />`,
				`    </Form.Control>`,
				description && `    <Form.Description>${description}</Form.Description>`,
				`    <Form.FieldErrors />`,
				`  </Form.Field>`
			];

			return code.filter((v) => v).join('\n');
		},
		toSchema: ({ name, required, value }: SelectField) => {
			// TODO implement this
			let code = `  ${name}: z.string()`;

			if (!required) code += '.optional()';
			if (value) code += `.default(${value})`;

			return code;
		}
	};

	#slider = {
		toComponent: ({ name, label, description, disabled, min, max, step }: SliderField) => {
			// TODO this must be fixed because bind:values doesn't work properly
			const code = [
				`  <Form.Field {form} name="${name}">`,
				`    <Form.Control let:attrs>`,
				`      <Form.Label>${label}</Form.Label>`,
				`      <Slider`,
				`        {...attrs}`,
				`        min={${min}} max={${max}} step={${step}}`,
				`        value={[$formData.${name}]}`,
				disabled && `        disabled`,
				`      />`,
				`    </Form.Control>`,
				description && `    <Form.Description>${description}</Form.Description>`,
				`    <Form.FieldErrors />`,
				`  </Form.Field>`
			];

			return code.filter((v) => v).join('\n');
		},
		toSchema: ({ name, required, value }: SliderField) => {
			// TODO implement this
			let code = `  ${name}: z.string()`;

			if (!required) code += '.optional()';
			if (value) code += `.default(${value})`;

			return code;
		}
	};

	#switch = {
		toComponent: ({ name, label, description, disabled }: SwitchField) => {
			const code = [
				`  <Form.Field {form} name="${name}" class="flex flex-row items-center justify-between rounded-lg border p-4">`,
				`    <Form.Control let:attrs>`,
				`      <div class="space-y-0.5">`,
				`        <Form.Label>${label}</Form.Label>`,
				description && `        <Form.Description>${description}</Form.Description>`,
				`      </div>`,
				`      <Switch `,
				`        {...attrs}`,
				`        includeInput`,
				`        bind:checked={$formData.${name}}`,
				disabled && `        disabled aria-readonly`,
				`      />`,
				`    </Form.Control>`,
				`  </Form.Field>`
			];

			return code.filter((v) => v).join('\n');
		},
		toSchema: ({ name, required, value }: SwitchField) => {
			// TODO implement this
			let code = `  ${name}: z.boolean()`;

			if (!required) code += '.optional()';
			if (value) code += `.default(${value})`;

			return code;
		}
	};

	#textarea = {
		toComponent: ({ name, label, placeholder, disabled, description }: TextareaField) => {
			const code = [
				`  <Form.Field {form} name="${name}">`,
				`    <Form.Control let:attrs>`,
				`      <Form.Label>${label}</Form.Label>`,
				`      <Textarea`,
				`        {...attrs}`,
				placeholder && `        placeholder="${placeholder}`,
				`        class="resize-none"`,
				`        bind:value={$formData.${name}}`,
				disabled && `        disabled`,
				`      />`,
				description && `      <Form.Description>${description}</Form.Description>`,
				`    </Form.Control>`,
				`    <Form.FieldErrors />`,
				`  </Form.Field>`
			];

			return code.filter((v) => v).join('\n');
		},
		toSchema: ({ name, required, value }: TextareaField) => {
			// TODO implement this
			let code = `  ${name}: z.string()`;

			if (!required) code += '.optional()';
			if (value) code += `.default(${value})`;

			return code;
		}
	};

	#generate = {
		schemaList: () => {
			const code = formState.fields.map((field) => {
				let res = '';

				switch (field.type) {
					case 'checkbox':
						res = this.#checkbox.toSchema(field);
						break;
					case 'combobox':
						res = this.#combobox.toSchema(field);
						break;
					case 'datepicker':
						res = this.#datepicker.toSchema(field);
						break;
					case 'input':
						res = this.#input.toSchema(field);
						break;
					case 'select':
						res = this.#select.toSchema(field);
						break;
					case 'slider':
						res = this.#slider.toSchema(field);
						break;
					case 'switch':
						res = this.#switch.toSchema(field);
						break;
					case 'textarea':
						res = this.#textarea.toSchema(field);
						break;
					default:
						console.error('Invalid field type!');
						break;
				}

				return res;
			});

			return code.join(',\n');
		},
		fieldList: () => {
			const code = formState.fields.map((field) => {
				let res = '';

				switch (field.type) {
					case 'checkbox':
						res = this.#checkbox.toComponent(field);
						break;
					case 'combobox':
						res = this.#combobox.toComponent(field);
						break;
					case 'datepicker':
						res = this.#datepicker.toComponent(field);
						break;
					case 'input':
						res = this.#input.toComponent(field);
						break;
					case 'select':
						res = this.#select.toComponent(field);
						break;
					case 'slider':
						res = this.#slider.toComponent(field);
						break;
					case 'switch':
						res = this.#switch.toComponent(field);
						break;
					case 'textarea':
						res = this.#textarea.toComponent(field);
						break;
					default:
						console.error('Invalid field type!');
						break;
				}

				return res;
			});

			return code.join('\n');
		},
		importList: () => {
			const imports = new Set([
				'  import { superForm } from "sveltekit-superforms";',
				'  import { zodClient } from "sveltekit-superforms/adapters";\n',
				'  import { schema } from "./schema";\n',
				'  import * as Form from "$lib/components/ui/form";'
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
			}

			if (formState.fields.some(({ type }) => type === 'input'))
				imports.add('  import { Input } from "$lib/components/ui/input";');

			if (formState.fields.some(({ type }) => type === 'select'))
				imports.add('  import * as Select from "$lib/components/ui/select";');

			if (formState.fields.some(({ type }) => type === 'slider'))
				imports.add('  import { Slider } from "$lib/components/ui/slider";');

			if (formState.fields.some(({ type }) => type === 'switch'))
				imports.add('  import { Switch } from "$lib/components/ui/switch";');

			if (formState.fields.some(({ type }) => type === 'textarea'))
				imports.add('  import { Textarea } from "$lib/components/ui/textarea";');

			return Array.from(imports).join('\n');
		},
		scriptCode: () => {
			// TODO add name value to code
			const code = new Set([
				'  let { data } = $props();\n',
				'  const form = superForm(data.form, {',
				'    validators: zodClient(schema),',
				'  });',
				'  const { form: formData, enhance } = form;'
			]);

			if (formState.fields.some(({ type }) => type === 'combobox')) {
				code.add('\n  /** combobox code */');
				code.add('  let open = $state(false);\n'); // TODO this should  be open${name}
				code.add('  // We want to refocus the trigger button when the user selects an item from the list');
				code.add('  // so users can continue navigating the rest of the form with the keyboard.');
				code.add('  function closeAndFocusTrigger(triggerId: string) {');
				code.add('    open = false;');
				code.add('    tick().then(() => document.getElementById(triggerId)?.focus());');
				code.add('  }');
				code.add('  /** end combobox code */');
			}

			if (formState.fields.some(({ type }) => type === 'datepicker')) {
				code.add('\n  /** datepicker code */');
				code.add('  const df = new DateFormatter("en-US", { dateStyle: "long" });');
				code.add('  let placeholder = $state(today(getLocalTimeZone()));');
				code.add('  let value = $derived($formData.dob ? parseDate($formData.dob) : undefined);');
				code.add('  /** end datepicker code */');
			}

			if (formState.fields.some(({ type }) => type === 'select')) {
				code.add('\n  /** select code */');
				code.add(
					`  let selectedEmail = $derived($formData.email ? { label: $formData.email, value: $formData.email } : undefined);`
				);
				code.add('  /** end select code */');
			}

			return Array.from(code).join('\n');
		}
	};

	#buildSchemaCode() {
		const code = [
			`import { z } from "zod";`,
			``,
			`export const schema = z.object({`,
			this.#generate.schemaList(),
			`});`,
			``
		];

		return code.join('\n');
	}

	#buildServerCode() {
		const code = [
			`import { superValidate } from "sveltekit-superforms";`,
			`import { zod } from "sveltekit-superforms/adapters";`,
			`import type { PageServerLoad } from "./$types";`,
			`import { schema } from "./schema";`,
			``,
			`export const load: PageServerLoad = async () => {`,
			`  return {`,
			`    form: await superValidate(zod(schema)),`,
			`  };`,
			`};`,
			``,
			`export const actions: Actions = {`,
			`  default: async ({ request }) => {`,
			`    const form = await superValidate(request, zod(schema));`,
			`    if (!form.valid) {`,
			`      return fail(400, { form });`,
			`    }`,
			``,
			`    console.log(form);`,
			``,
			`    return message(form, 'Form posted successfully!');`,
			`  }`,
			`};`,
			``
		];

		return code.join('\n');
	}

	#buildPageCode() {
		const code = [
			`<script lang="ts">`,
			this.#generate.importList(),
			``,
			this.#generate.scriptCode(),
			`</script>`,
			``,
			`<form method="POST" class="min-w-[500px] space-y-4" use:enhance>`,
			this.#generate.fieldList(),
			`  <Form.Button>Submit</Form.Button>`,
			`</form>`,
			``
		];

		return code.join('\n');
	}
}

export const codeState = new CodeState();
