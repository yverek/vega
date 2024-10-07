<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	import { dialogState } from '$lib/state/dialog.svelte';
	import { formState } from '$lib/state/form.svelte';
</script>

<Dialog.Root open={dialogState.isOpen} onOutsideClick={() => (dialogState.isOpen = false)}>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Edit {dialogState.field.type} field</Dialog.Title>
			<Dialog.Description>Make changes to your field here. Click save when you're done.</Dialog.Description>
		</Dialog.Header>
		<div class="grid gap-4 py-4">
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="type" class="text-right">Type</Label>
				<Input id="type" value={dialogState.field.type} class="col-span-3" disabled />
			</div>
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="name" class="text-right">Name</Label>
				<Input
					id="name"
					value={dialogState.field.name}
					class="col-span-3"
					on:change={(e) => formState.updateField({ ...dialogState.field, name: (e.target as HTMLInputElement).value })}
				/>
			</div>
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="label" class="text-right">Label</Label>
				<Input
					id="label"
					value={dialogState.field.label}
					class="col-span-3"
					on:change={(e) =>
						formState.updateField({ ...dialogState.field, label: (e.target as HTMLInputElement).value })}
				/>
			</div>
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="description" class="text-right">Description</Label>
				<Input
					id="description"
					value={dialogState.field.description}
					class="col-span-3"
					on:change={(e) =>
						formState.updateField({ ...dialogState.field, description: (e.target as HTMLInputElement).value })}
				/>
			</div>
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="required" class="text-right">Required</Label>
				<Checkbox
					id="required"
					checked={dialogState.field.required}
					onCheckedChange={(checked) => formState.updateField({ ...dialogState.field, required: checked as boolean })}
				/>
			</div>
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="disabled" class="text-right">Disabled</Label>
				<Checkbox
					id="disabled"
					checked={dialogState.field.disabled}
					onCheckedChange={(checked) => formState.updateField({ ...dialogState.field, disabled: checked as boolean })}
				/>
			</div>
		</div>
		<Dialog.Footer>
			<Button on:click={() => (dialogState.isOpen = false)}>Save changes</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
