import type { BaseField, FieldTypes, FormField } from '$lib/types';
import type { Infer, SuperValidated } from 'sveltekit-superforms';
import { z, type ZodTypeAny } from 'zod';

type ZodSchema = Record<string, z.ZodTypeAny>;

export class FormState {
	#fields = $state<FormField[]>([]);
	#schema = $state<ZodSchema>({});
	#zodSchema = $derived.by(() => {
		console.log('dioemrdaaa');
		return z.object(this.#schema);
	});

	#fieldToZod = {
		checkbox: (field: FormField) => this.zodBoolean(field),
		combobox: (field: FormField) => this.zodString(field),
		datepicker: (field: FormField) => this.zodDate(field),
		input: (field: FormField) => this.zodString(field),
		select: (field: FormField) => this.zodString(field),
		slider: (field: FormField) => this.zodNumber(field),
		switch: (field: FormField) => this.zodBoolean(field),
		textarea: (field: FormField) => this.zodString(field)
	};

	get fields() {
		return this.#fields;
	}

	set fields(fields: FormField[]) {
		this.#fields = fields;
	}

	get schema() {
		return this.#schema;
	}

	set schema(schema: ZodSchema) {
		this.#schema = schema;
	}

	get zodSchema() {
		return this.#zodSchema;
	}

	zodBoolean(field: FormField) {
		let code: ZodTypeAny = z.boolean();

		if (!field.required) code = code.optional();
		if (field.value) code = code.default(field.value);

		return code;
	}

	zodNumber(field: FormField) {
		// console.log('🚀 ~ FormState ~ field:', field);
		// const isRequired = field.required ? `{ required_error: "${field.label} is required" }` : '';

		// let res = `z.number(${isRequired}),\n`;

		// TODO add options like min(), max() ecc

		return z.number();
	}

	zodString(field: FormField) {
		// console.log('🚀 ~ FormState ~ field:', field);
		// const isRequired = field.required ? `{ required_error: "${field.label} is required" }` : '';

		// let res = `z.string(${isRequired}),\n`;

		// TODO add options like url(), ip() ecc

		return z.string().min(2).max(5);
	}

	zodDate(field: FormField) {
		// console.log('🚀 ~ FormState ~ field:', field);
		// const isRequired = field.required ? `{ required_error: "${field.label} is required" }` : '';

		// let res = `z.date(${isRequired}),\n`;

		// TODO add options like url(), ip() ecc

		return z.date().default(new Date());
	}

	addField(type: FieldTypes) {
		const id = window.crypto.getRandomValues(new Uint32Array(1))[0];

		let newField!: FormField;

		const baseField: BaseField = {
			id,
			label: `New ${type}`,
			name: `${type}_${id}`,
			// placeholder: `Enter ${type} placeholder`,
			description: '',
			required: true,
			disabled: false
		};

		if (type === 'checkbox') newField = { ...baseField, type: 'checkbox', value: false };

		if (type === 'combobox') newField = { ...baseField, type: 'combobox', value: '' };

		if (type === 'datepicker')
			newField = {
				...baseField,
				type: 'datepicker',
				value: ''
			};

		if (type === 'input') newField = { ...baseField, type: 'input', value: '', typeAttribute: 'text' };

		if (type === 'select') {
			newField = {
				...baseField,
				type: 'select',
				value: '',
				values: [
					{ label: 'Label 1', value: 'Value 1' },
					{ label: 'Label 2', value: 'Value 2' },
					{ label: 'Label 3', value: 'Value 3' }
				]
			};
		}

		if (type === 'slider') newField = { ...baseField, type: 'slider', value: 50, min: 0, max: 100, step: 1 };

		if (type === 'switch') newField = { ...baseField, type: 'switch', value: false };

		if (type === 'textarea') newField = { ...baseField, type: 'textarea', value: '' };

		this.#fields.push(newField);
		this.#schema[newField.name] = this.#fieldToZod[type](newField);
		console.log('🚀 ~ FormState ~ this.#schema:', this.#schema);
	}

	updateField(oldName: string, data: FormField) {
		const index = this.#fields.map((f) => f.name).indexOf(oldName);

		this.#fields[index] = {
			...this.#fields[index],
			...data
		};

		delete this.#schema[oldName];
		this.#schema[data.name] = this.#fieldToZod[data.type](data);
		console.log('🚀 ~ FormState ~ this.#schema:', this.#schema);
	}

	removeField(name: string) {
		this.#fields = this.#fields.filter((f) => f.name !== name);
		delete this.#schema[name];
	}
}

export const formState = new FormState();

export type FormSchema = Infer<typeof formState.zodSchema>;
export type ValidatedFormSchema = SuperValidated<FormSchema>;
