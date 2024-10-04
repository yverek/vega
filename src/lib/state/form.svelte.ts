import type { FormField } from '$lib/types';

export class Form {
	#fields = $state<FormField[]>([]);

	get fields() {
		return this.#fields;
	}

	addField(type: string) {
		const newField: FormField = {
			type,
			label: `New ${type}`,
			value: '',
			checked: true,
			name: `name_${this.#fields.length + 1}`,
			placeholder: 'Enter Placeholder',
			description: '',
			required: true,
			disabled: false,
			onChange: () => {},
			setValue: () => {},
			onSelect: () => {}
		};

		this.#fields.push(newField);
	}

	updateField(index: number, data: Partial<FormField>) {
		this.#fields[index] = {
			...this.#fields[index],
			...data
		};
	}

	removeField(index: number) {
		this.#fields = this.#fields.filter((_, i) => i !== index);
	}
}

export const form = new Form();
