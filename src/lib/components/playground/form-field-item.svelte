<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Input } from '$lib/components/ui/input';

	import Trash2 from 'lucide-svelte/icons/trash-2';
	import Pencil from 'lucide-svelte/icons/pencil';
	import Grip from 'lucide-svelte/icons/grip';

	import type { FormField } from '$lib/types';
	import { form } from '$lib/state/form.svelte';
	import { dialog } from '$lib/state/dialog.svelte';

	type FormFieldItem = {
		field: FormField;
		index: number;
	};

	let { field, index }: FormFieldItem = $props();
</script>

<div class="mt-1.5 flex w-full items-center justify-start gap-1 rounded-xl border px-3 py-1.5">
	<Grip class="mr-2 cursor-grab" />
	<div class="grid w-full grid-cols-6 items-center gap-2">
		<div class="col-span-2">
			<Input
				value={field.label}
				on:change={(e) => form.updateField(index, { label: (e.target as HTMLInputElement).value })}
				placeholder="Enter label"
			/>
		</div>
		<div class="col-span-2">
			<Input
				value={field.description}
				on:change={(e) => form.updateField(index, { description: (e.target as HTMLInputElement).value })}
				placeholder="Enter description"
			/>
		</div>
		<div class="col-span-1 pl-6">
			<Checkbox
				checked={field.required}
				onCheckedChange={(checked) => form.updateField(index, { required: !!checked })}
			/>
		</div>
		<div class="col-span-1 pl-6">
			<Checkbox
				checked={field.disabled}
				onCheckedChange={(checked) => form.updateField(index, { disabled: !!checked })}
			/>
		</div>
	</div>

	<div class="flex flex-nowrap space-x-1">
		<Button
			variant="ghost"
			size="icon"
			on:click={() => {
				dialog.fieldIndex = index;
				dialog.field = field;
				dialog.isOpen = true;
			}}
		>
			<Pencil />
		</Button>
		<Button variant="ghost" size="icon" on:click={() => form.removeField(index)}>
			<Trash2 />
		</Button>
	</div>
</div>
