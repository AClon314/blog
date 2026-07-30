<script lang="ts">
	let { children } = $props();
</script>
<main class="bg-slate-50 text-slate-900">
	<div class="prose prose-slate prose-lg dark:prose-invert mx-auto min-h-screen max-w-4xl px-6 py-12 prose-pre:rounded-2xl prose-pre:bg-slate-950 prose-pre:text-slate-50">
		{@render children()}
	</div>
</main>
