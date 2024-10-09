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

type CheckboxField = BaseField & { type: 'checkbox'; defaultValue: boolean };
type ComboboxField = BaseField & { type: 'combobox'; defaultValue: string }; // TODO add data object
type DatepickerField = BaseField & { type: 'datepicker'; defaultValue: string }; // TODO add data object
type InputField = BaseField & { type: 'input'; defaultValue: string }; // TODO add data object
type SelectField = BaseField & { type: 'select'; defaultValue: string }; // TODO add data object
type SliderField = BaseField & { type: 'slider'; defaultValue: string }; // TODO add data object
type SwitchField = BaseField & { type: 'switch'; defaultValue: boolean };
type TextareaField = BaseField & { type: 'textarea'; defaultValue: string; min?: number; max?: number };

export type FormField =
	| CheckboxField
	| ComboboxField
	| DatepickerField
	| InputField
	| SelectField
	| SliderField
	| SwitchField
	| TextareaField;
