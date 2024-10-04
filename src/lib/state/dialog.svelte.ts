import type { FormField } from '$lib/types';

export class Dialog {
	#field = $state({} as FormField);
	#fieldIndex = $state(0);
	#isOpen = $state(false);

	get isOpen() {
		return this.#isOpen;
	}

	set isOpen(value: boolean) {
		this.#isOpen = value;
	}

	get field() {
		return this.#field;
	}

	set field(field: FormField) {
		this.#field = field;
	}

	get fieldIndex() {
		return this.#fieldIndex;
	}

	set fieldIndex(index: number) {
		this.#fieldIndex = index;
	}
}

export const dialog = new Dialog();
