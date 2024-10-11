import { fieldTypes } from './constants';

export type FieldTypes = (typeof fieldTypes)[number];

export type BaseField = {
	id: number;
	name: string;
	label: string;
	required: boolean;
	disabled: boolean;
	description?: string;
};

export type CheckboxField = BaseField & {
	type: 'checkbox';
	value: boolean;
};

export type ComboboxField = BaseField & {
	type: 'combobox';
	value: string;
};

export type DatepickerField = BaseField & {
	type: 'datepicker';
	value: string;
};

export type InputField = BaseField & {
	type: 'input';
	value: string;
	placeholder?: string;
	typeAttribute: 'email' | 'password' | 'number' | 'text' | 'url'; // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
};

export type SelectField = BaseField & {
	type: 'select';
	value: string;
	placeholder?: string;
	values: { label: string; value: string }[];
};

export type SliderField = BaseField & {
	type: 'slider';
	value: number;
	min: number;
	max: number;
	step: number;
};

export type SwitchField = BaseField & {
	type: 'switch';
	value: boolean;
};

export type TextareaField = BaseField & {
	type: 'textarea';
	value: string;
	placeholder?: string;
	min?: number;
	max?: number;
};

export type FormField =
	| CheckboxField
	| ComboboxField
	| DatepickerField
	| InputField
	| SelectField
	| SliderField
	| SwitchField
	| TextareaField;
