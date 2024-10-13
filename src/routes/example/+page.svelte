<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	import { schema } from './schema';

	import * as Form from '$lib/components/ui/form';
	import { Checkbox } from '$lib/components/ui/checkbox';

	let { data } = $props();

	const form = superForm(data.form, {
		validators: zodClient(schema)
	});
	const { form: formData, enhance } = form;
</script>

<form method="POST" class="min-w-[500px] space-y-4" use:enhance>
	<Form.Field {form} name="tos" class="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
		<Form.Control let:attrs>
			<Checkbox {...attrs} bind:checked={$formData.tos} />
			<div class="space-y-1 leading-none">
				<Form.Label>New checkbox</Form.Label>
			</div>
			<input name={attrs.name} value={$formData.tos} hidden />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button>Submit</Form.Button>
</form>
