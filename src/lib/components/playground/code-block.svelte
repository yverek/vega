<script lang="ts">
	import Highlight, { LineNumbers } from 'svelte-highlight';
	import type { LanguageType } from 'svelte-highlight/languages';
	import CopyButton from '$lib/components/layout/copy-button.svelte';

	type CodePreviewProps = {
		language: LanguageType<string>;
		code: string;
	};
	let { language, code }: CodePreviewProps = $props();
</script>

<Highlight {language} {code} let:highlighted>
	<CopyButton {code} />
	<LineNumbers {highlighted} hideBorder wrapLines />
</Highlight>
