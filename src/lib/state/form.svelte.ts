import type { fieldTypes, FormField } from '$lib/types';

export class Form {
	#fields = $state<FormField[]>([]);

	get fields() {
		return this.#fields;
	}

	set fields(fields: FormField[]) {
		this.#fields = fields;
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
	}

	updateField(data: Partial<Omit<FormField, 'id'>> & Pick<FormField, 'id'>) {
		const index = this.#fields.map((f) => f.id).indexOf(data.id);

		this.#fields[index] = {
			...this.#fields[index],
			...data
		};
	}

	removeField(id: number) {
		this.#fields = this.#fields.filter((f) => f.id !== id);
	}
}

export const form = new Form();
