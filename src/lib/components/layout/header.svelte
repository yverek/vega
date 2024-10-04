<script lang="ts">
	import Twitter from '$lib/icons/twitter.svelte';
	import Github from '$lib/icons/github.svelte';

	import ThemeSwitcher from '$lib/components/layout/theme-switcher.svelte';
	import { Button } from '$lib/components/ui/button';
</script>

<header class="mb-8 border-b border-gray-500 py-4 dark:border-gray-600">
	<nav class="flex justify-between">
		<a href="/" class="flex items-center gap-3">
			<img src="/svelte-logo.svg" class="size-9" alt="Svelte Form Builder logo" />
			<span class="text-xl font-bold text-black dark:text-white">Svelte Form Builder</span>
		</a>

		<div class="flex gap-2">
			<ThemeSwitcher />
			<Button href="https://github.com/yverek/svelte-form-builder" variant="outline" size="icon">
				<Github />
				<span class="sr-only">Github repo</span>
			</Button>
			<Button href="https://twitter.com/yverekk" variant="outline" size="icon">
				<Twitter />
				<span class="sr-only">Twitter account</span>
			</Button>
		</div>
	</nav>
</header>
