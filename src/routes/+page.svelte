<script lang="ts">
	import { Separator } from '$lib/components/ui/separator';

	import { dialogState } from '$lib/state/dialog.svelte';

	import EditFieldDialog from '$lib/components/playground/edit-field-dialog.svelte';
	import FormFieldList from '$lib/components/playground/form-field-list.svelte';
	import FieldSelector from '$lib/components/playground/form-field-selector.svelte';
	import PreviewPanel from '$lib/components/playground/preview-panel.svelte';
</script>

<section class="flex flex-col">
	<FieldSelector />
	<Separator />

	<div class="my-8 flex gap-16">
		<FormFieldList />
		<PreviewPanel />
	</div>
</section>

{#if dialogState.isOpen}
	<EditFieldDialog />
{/if}
