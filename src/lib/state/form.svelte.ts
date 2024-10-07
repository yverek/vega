import type { fieldTypes, FormField } from '$lib/types';
import type { Infer, SuperValidated } from 'sveltekit-superforms';
import { z } from 'zod';

type ZodSchema = Record<string, z.ZodTypeAny>;

export class FormState {
	#fields = $state<FormField[]>([]);
	#schema = $state<ZodSchema>({});
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

	zodBoolean(field: FormField) {
		console.log('🚀 ~ FormState ~ field:', field);
		// const isRequired = field.required ? `{ required_error: "${field.label} is required" }` : '';

		return z.boolean();
	}

	zodNumber(field: FormField) {
		console.log('🚀 ~ FormState ~ field:', field);
		// const isRequired = field.required ? `{ required_error: "${field.label} is required" }` : '';

		// let res = `z.number(${isRequired}),\n`;

		// TODO add options like min(), max() ecc

		return z.number();
	}

	zodString(field: FormField) {
		console.log('🚀 ~ FormState ~ field:', field);
		// const isRequired = field.required ? `{ required_error: "${field.label} is required" }` : '';

		// let res = `z.string(${isRequired}),\n`;

		// TODO add options like url(), ip() ecc

		return z.string();
	}

	zodDate(field: FormField) {
		console.log('🚀 ~ FormState ~ field:', field);
		// const isRequired = field.required ? `{ required_error: "${field.label} is required" }` : '';

		// let res = `z.date(${isRequired}),\n`;

		// TODO add options like url(), ip() ecc

		return z.date();
	}

	addField(type: fieldTypes) {
		const randomValue = window.crypto.getRandomValues(new Uint32Array(1))[0];

		const newField: FormField = {
			id: randomValue,
			type: type,
			label: `New ${type}`,
			value: '',
			checked: true,
			name: `${type}_${randomValue}`,
			placeholder: `Enter ${type} placeholder`,
			description: '',
			required: true,
			disabled: false,
			onChange: () => {},
			setValue: () => {},
			onSelect: () => {}
		};

		this.#fields.push(newField);
		this.#schema[newField.name] = this.#fieldToZod[type](newField);
	}

	updateField(data: FormField) {
		const index = this.#fields.map((f) => f.name).indexOf(data.name);

		this.#fields[index] = {
			...this.#fields[index],
			...data
		};

		this.#schema[data.name] = this.#fieldToZod[data.type](data);
	}

	removeField(name: string) {
		this.#fields = this.#fields.filter((f) => f.name !== name);
		delete this.#schema[name];
	}
}

export const formState = new FormState();

export const formSchema = z.object(formState.schema);
export type FormSchema = Infer<typeof formSchema>;
export type ValidatedFormSchema = SuperValidated<FormSchema>;
