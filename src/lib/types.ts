export type fieldTypes = 'checkbox' | 'combobox' | 'datepicker' | 'input' | 'select' | 'slider' | 'switch' | 'textarea';

export type FormField = {
	type: fieldTypes;
	name: string;
	label: string;
	value: string | boolean | Date | number;
	checked: boolean;
	setValue: (value: string | boolean) => void;
	placeholder?: string;
	required: boolean;
	disabled: boolean;
	description?: string;
	onChange: (value: string | boolean | Date) => void;
	onSelect: (value: string | boolean | Date) => void;
};
