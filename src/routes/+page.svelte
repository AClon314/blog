<script lang="ts">
  const highlights = [
    {
      title: "Python 安装",
      href: "/python/install",
      body: "环境、工具链和常见安装步骤。",
    },
    {
      title: "SvelTeX Demo",
      href: "/sveltex-demo",
      body: "查看 Markdown、代码高亮和数学公式的渲染效果。",
    },
    {
      title: "演示页面",
      href: "/demo",
      body: "查看当前项目里的示例页面。",
    },
  ];
</script>

<svelte:head>
  <title>Python Notes</title>
  <meta name="description" content="Python notes and demos" />
</svelte:head>

<main class="min-h-screen bg-slate-950 text-slate-100">
  <section class="mx-auto flex min-h-screen w-full max-w-6xl items-center px-6 py-16">
    <div class="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
      <div class="space-y-8">
        <div
          class="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200"
        >
          <span class="h-2 w-2 rounded-full bg-cyan-300"></span>
          Python Notes
        </div>
        <div class="space-y-4">
          <h1 class="max-w-2xl text-5xl font-semibold tracking-tight text-white sm:text-6xl">
            把安装、包和示例收进一个清晰的首页
          </h1>
          <p class="max-w-xl text-lg leading-8 text-slate-300">
            现在主页不再是默认占位内容，而是一个带入口、带层次的起点页面。
          </p>
        </div>
        <div class="flex flex-wrap gap-3">
          <a
            class="rounded-full bg-cyan-400 px-5 py-3 font-medium text-slate-950 transition hover:bg-cyan-300"
            href="/python/install"
          >
            开始浏览
          </a>
          <a
            class="rounded-full border border-white/15 px-5 py-3 font-medium text-white transition hover:border-white/30 hover:bg-white/5"
            href="/demo"
          >
            看示例
          </a>
        </div>
      </div>

      <div
        class="grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-cyan-950/30 backdrop-blur"
      >
        {#each highlights as item}
          <a
            class="group rounded-2xl border border-white/10 bg-slate-900/70 p-5 transition hover:-translate-y-0.5 hover:border-cyan-400/30 hover:bg-slate-900"
            href={item.href}
          >
            <div class="flex items-center justify-between gap-4">
              <h2 class="text-lg font-medium text-white group-hover:text-cyan-200">
                {item.title}
              </h2>
              <span class="text-slate-500 transition group-hover:text-cyan-300">→</span>
            </div>
            <p class="mt-2 text-sm leading-6 text-slate-400">{item.body}</p>
          </a>
        {/each}
      </div>
    </div>
  </section>
</main>
