import type { FormField } from '$lib/types';

export class DialogState {
	#field = $state({} as FormField);
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
}

export const dialogState = new DialogState();
