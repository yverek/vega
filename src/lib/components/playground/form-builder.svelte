<script lang="ts">
	import { Separator } from '$lib/components/ui/separator';

	import { dialog } from '$lib/state/dialog.svelte';

	import EditFieldDialog from './edit-field-dialog.svelte';
	import FormFieldList from './form-field-list.svelte';
	import FieldSelector from './form-field-selector.svelte';
	import FormPreview from './form-preview.svelte';
</script>

<section class="flex flex-col">
	<FieldSelector />
	<Separator />

	<div class="my-8 flex gap-16">
		<FormFieldList />
		<FormPreview />
	</div>
</section>

{#if dialog.isOpen}
	<EditFieldDialog />
{/if}
