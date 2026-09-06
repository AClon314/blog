<script lang="ts">
  const highlights = [
    {
      title: "Python 安装",
      href: "/python/install",
      body: "环境、工具链和常见安装步骤。",
    },
  ];
</script>

<svelte:head>
  <title>Python Notes</title>
  <meta name="description" content="nolca's blog" />
</svelte:head>

<main class="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
  <section class="mx-auto flex min-h-screen w-full max-w-6xl items-center px-6 py-16">
    <div class="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
      <div class="space-y-8">
        <div
          class="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-700 dark:text-cyan-200"
        >
          <span class="h-2 w-2 rounded-full bg-cyan-300"></span>
          nolca
        </div>
        <div class="space-y-4">
          <h1
            class="max-w-2xl text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl dark:text-white"
          >
            gpen测试页面
          </h1>
          <p class="max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">兴趣不脱产。</p>
        </div>
        <div class="flex flex-wrap gap-3">
          <a
            class="rounded-full bg-cyan-400 px-5 py-3 font-medium text-slate-950 transition hover:bg-cyan-300"
            href="/python/install"
          >
            博客
          </a>
        </div>
      </div>

      <div
        class="grid gap-4 rounded-3xl border border-slate-200 bg-white/70 p-6 shadow-2xl shadow-cyan-950/30 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:shadow-cyan-950/30"
      >
        {#each highlights as item}
          <a
            class="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 dark:border-white/10 dark:bg-slate-900/70 dark:hover:border-cyan-400/30 dark:hover:bg-slate-900"
            href={item.href}
          >
            <div class="flex items-center justify-between gap-4">
              <h2
                class="text-lg font-medium text-slate-950 dark:text-white dark:group-hover:text-cyan-200"
              >
                {item.title}
              </h2>
              <span
                class="text-slate-500 transition dark:text-slate-400 dark:group-hover:text-cyan-300"
                >→</span
              >
            </div>
            <p class="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{item.body}</p>
          </a>
        {/each}
      </div>
    </div>
  </section>
</main>
