<script lang="ts">
	import { typescript } from 'svelte-highlight/languages';

	import * as Tabs from '$lib/components/ui/tabs';
	import { formState } from '$lib/state/form.svelte';
	import { codeState } from '$lib/state/code.svelte';
	import CodeBlock from '$lib/components/playground/code-block.svelte';
</script>

{#if formState.fields.length > 0}
	<Tabs.Root value="page" class="w-full">
		<Tabs.List class="mx-auto flex w-fit justify-center">
			<Tabs.Trigger value="page">+page.svelte</Tabs.Trigger>
			<Tabs.Trigger value="server">+page.server.ts</Tabs.Trigger>
			<Tabs.Trigger value="schema">schema.ts</Tabs.Trigger>
		</Tabs.List>
		<Tabs.Content value="page">
			<CodeBlock language={typescript} code={codeState.page} />
		</Tabs.Content>
		<Tabs.Content value="server">
			<CodeBlock language={typescript} code={codeState.server} />
		</Tabs.Content>
		<Tabs.Content value="schema">
			<CodeBlock language={typescript} code={codeState.schema} />
		</Tabs.Content>
	</Tabs.Root>
{:else}
	<div class="flex h-[50vh] items-center justify-center">
		<p>No form element selected yet.</p>
	</div>
{/if}
