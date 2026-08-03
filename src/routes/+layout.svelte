<script lang="ts">
	import type { PathnameWithSearchOrHash } from '$app/types';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { locales, localizeHref } from '$lib/paraglide/runtime';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();

	type NavItem = {
		title: string;
		href?: `/${string}`;
		children?: NavItem[];
	};

	const navigation: NavItem[] = [
		{ title: '首页', href: '/' },
		{
			title: 'Python',
			children: [{ title: '安装', href: '/python/install' }]
		}
	];

	const isActive = (href: string) =>
		page.url.pathname === href || (href !== '/' && page.url.pathname.startsWith(`${href}/`));

	const linkClass = (href: string) =>
		`block rounded-lg px-3 py-2 text-sm font-medium no-underline transition ${
			isActive(href)
				? 'bg-cyan-100 text-cyan-900 ring-1 ring-cyan-200'
				: 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
		}`;
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<!-- TODO: header to switch current OS -->

{#snippet navigationList(items: NavItem[], nested: boolean)}
	<ul
		class={nested
			? 'm-0 ml-3 mt-1 list-none space-y-1 border-l border-slate-200 p-0 pl-3'
			: 'm-0 list-none space-y-1 p-0'}
	>
		{#each items as item}
			<li>
				{#if item.href}
					<a
						class={linkClass(item.href)}
						aria-current={isActive(item.href) ? 'page' : undefined}
						href={item.href}
					>
						{item.title}
					</a>
				{:else}
					<div class="px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
						{item.title}
					</div>
				{/if}

				{#if item.children}
					{@render navigationList(item.children, true)}
				{/if}
			</li>
		{/each}
	</ul>
{/snippet}

<div class="min-h-screen bg-slate-100 text-slate-900 lg:grid lg:grid-cols-[18rem_minmax(0,1fr)]">
	<aside class="hidden border-r border-slate-200 bg-white/85 px-5 py-6 shadow-sm lg:sticky lg:top-0 lg:block lg:h-screen lg:overflow-y-auto">
		<nav aria-label="目录">
			{@render navigationList(navigation, false)}
		</nav>
	</aside>

	<div class="min-w-0">
		<header class="sticky top-0 z-20 border-b border-slate-200 bg-white/90 px-4 py-3 shadow-sm backdrop-blur lg:hidden">
			<details class="group">
				<summary class="flex cursor-pointer list-none items-center justify-between rounded-xl px-2 py-1 font-semibold text-slate-950">
					<span>Python Notes</span>
					<span class="text-sm text-slate-500 group-open:hidden">目录</span>
					<span class="hidden text-sm text-slate-500 group-open:inline">收起</span>
				</summary>

				<nav aria-label="移动端目录" class="mt-3">
					{@render navigationList(navigation, false)}
				</nav>
			</details>
		</header>

		{@render children()}
	</div>
</div>

<div style="display:none">
	{#each locales as locale (locale)}
		<a
			href={resolve(localizeHref(page.url.pathname, { locale }) as PathnameWithSearchOrHash)}
		>{locale}</a>
	{/each}
</div>
