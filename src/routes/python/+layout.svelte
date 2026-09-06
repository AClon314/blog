<script lang="ts">
  let { children } = $props();
</script>

<main class="bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
  <div
    class="prose prose-slate prose-lg dark:prose-invert prose-pre:rounded-2xl prose-pre:bg-slate-100 prose-pre:text-slate-50 dark:prose-pre:bg-slate-900 mx-auto min-h-screen max-w-4xl px-6 py-12"
  >
    {@render children()}
  </div>
</main>
