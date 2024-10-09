<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Input } from '$lib/components/ui/input';

	import Trash2 from 'lucide-svelte/icons/trash-2';
	import Pencil from 'lucide-svelte/icons/pencil';
	import Grip from 'lucide-svelte/icons/grip';

	import type { FormField } from '$lib/types';
	import { formState } from '$lib/state/form.svelte';
	import { dialogState } from '$lib/state/dialog.svelte';

	type FormFieldItem = { field: FormField };
	let { field }: FormFieldItem = $props();
</script>

<div class="mt-1.5 flex w-full items-center justify-start gap-1 rounded-xl border px-3 py-1.5">
	<Grip class="mr-2 cursor-grab" />
	<div class="grid w-full grid-cols-6 items-center gap-2">
		<div class="col-span-2">
			<Input
				value={field.name}
				on:change={(e) => formState.updateField(field.name, { ...field, name: (e.target as HTMLInputElement).value })}
				placeholder="Enter name"
			/>
		</div>
		<div class="col-span-2">
			<Input
				value={field.label}
				on:change={(e) => formState.updateField(field.name, { ...field, label: (e.target as HTMLInputElement).value })}
				placeholder="Enter label"
			/>
		</div>
		<div class="col-span-1 pl-6">
			<Checkbox
				checked={field.required}
				onCheckedChange={(checked) => formState.updateField(field.name, { ...field, required: !!checked })}
			/>
		</div>
		<div class="col-span-1 pl-6">
			<Checkbox
				checked={field.disabled}
				onCheckedChange={(checked) => formState.updateField(field.name, { ...field, disabled: !!checked })}
			/>
		</div>
	</div>

	<div class="flex flex-nowrap space-x-1">
		<Button
			variant="ghost"
			size="icon"
			on:click={() => {
				dialogState.field = field;
				dialogState.isOpen = true;
			}}
		>
			<Pencil />
		</Button>
		<Button variant="ghost" size="icon" on:click={() => formState.removeField(field.name)}>
			<Trash2 />
		</Button>
	</div>
</div>
