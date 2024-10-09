<script lang="ts">
	import githubDarkDimmed from 'svelte-highlight/styles/github-dark-dimmed';

	import * as Tabs from '$lib/components/ui/tabs';
	import FormPreview from '$lib/components/playground/form-preview.svelte';
	import CodePreview from '$lib/components/playground/code-preview.svelte';
</script>

<svelte:head>
	{@html githubDarkDimmed}
</svelte:head>

<div class="flex h-full w-1/2 justify-center rounded-xl">
	<Tabs.Root value="preview" class="w-full">
		<Tabs.List class="mx-auto flex w-fit justify-center">
			<Tabs.Trigger value="preview">Preview</Tabs.Trigger>
			<Tabs.Trigger value="code">Code</Tabs.Trigger>
		</Tabs.List>
		<Tabs.Content value="preview">
			<FormPreview />
		</Tabs.Content>
		<Tabs.Content value="code">
			<CodePreview />
		</Tabs.Content>
	</Tabs.Root>
</div>

<style>
	:global(pre > code, #copy-button ~ div) {
		@apply rounded-md;
	}
</style>
