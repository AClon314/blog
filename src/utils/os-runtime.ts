export type OsName = 'win' | 'mac' | 'linux' | 'all';
export type OsPreference = 'auto' | OsName;

interface OsState {
  preference: OsPreference;
  resolved: OsName;
}

type OsBinder = (root: ParentNode, state: OsState) => void;

const STORAGE_KEY = 'starlight-os';
const VALID_PREFERENCES = new Set<OsPreference>(['auto', 'win', 'mac', 'linux', 'all']);
const VALID_OS = new Set<OsName>(['win', 'mac', 'linux', 'all']);
const binders = new Map<string, OsBinder>();

let initialized = false;

function normalizePreference(value: unknown): OsPreference {
  return typeof value === 'string' && VALID_PREFERENCES.has(value as OsPreference)
    ? (value as OsPreference)
    : 'auto';
}

function normalizeOs(value: unknown): OsName {
  return typeof value === 'string' && VALID_OS.has(value as OsName) ? (value as OsName) : 'all';
}

function detectOs(): OsName {
  if (typeof navigator === 'undefined') return 'all';
  const source = `${navigator.userAgent} ${navigator.platform}`.toLowerCase();
  if (source.includes('win')) return 'win';
  if (source.includes('mac') || source.includes('darwin')) return 'mac';
  if (source.includes('linux') || source.includes('x11')) return 'linux';
  return 'all';
}

function resolveOsPreference(preference: OsPreference): OsName {
  return preference === 'auto' ? detectOs() : preference;
}

function getOsState(): OsState {
  const preference = normalizePreference(
    document.documentElement.dataset.osPreference ||
      (typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : 'auto')
  );
  const resolved = normalizeOs(document.documentElement.dataset.os);
  return {
    preference,
    resolved: resolved === 'all' && preference !== 'all' ? resolveOsPreference(preference) : resolved,
  };
}

function collectTargets(root: ParentNode, selector: string): HTMLElement[] {
  const matches: HTMLElement[] = [];
  if (root instanceof HTMLElement && root.matches(selector)) matches.push(root);
  matches.push(...Array.from(root.querySelectorAll<HTMLElement>(selector)));
  return matches;
}

function readScopedValue(root: HTMLElement, prefix: string, state: OsState): string {
  const resolvedKey = `${prefix}${state.resolved[0].toUpperCase()}${state.resolved.slice(1)}` as keyof DOMStringMap;
  const allKey = `${prefix}All` as keyof DOMStringMap;
  const winKey = `${prefix}Win` as keyof DOMStringMap;
  const macKey = `${prefix}Mac` as keyof DOMStringMap;
  const linuxKey = `${prefix}Linux` as keyof DOMStringMap;
  return (
    root.dataset[resolvedKey] ??
    root.dataset[allKey] ??
    root.dataset[winKey] ??
    root.dataset[macKey] ??
    root.dataset[linuxKey] ??
    ''
  );
}

function applyCodeTitleBinder(root: ParentNode, state: OsState): void {
  for (const scope of collectTargets(root, '[data-os-bind~="code-title"]')) {
    const title = scope.querySelector<HTMLElement>('.expressive-code .frame.has-title .title');
    if (!title) continue;
    title.textContent = readScopedValue(scope, 'title', state);
  }
}

binders.set('code-title', applyCodeTitleBinder);

function refreshOsBindings(root: ParentNode = document, state = getOsState()): void {
  for (const binder of binders.values()) binder(root, state);
}

function persistPreference(preference: OsPreference): void {
  if (typeof localStorage !== 'undefined') localStorage.setItem(STORAGE_KEY, preference);
}

function syncOsPickers(state: OsState): void {
  document.querySelectorAll('starlight-os-select select').forEach((select) => {
    if (select instanceof HTMLSelectElement) select.value = state.preference;
  });
}

function applyState(
  preference: OsPreference,
  options: { persist?: boolean; emit?: boolean; syncPickers?: boolean } = {}
): OsState {
  const state: OsState = {
    preference: normalizePreference(preference),
    resolved: resolveOsPreference(normalizePreference(preference)),
  };
  document.documentElement.dataset.osPreference = state.preference;
  document.documentElement.dataset.os = state.resolved;
  if (options.persist !== false) persistPreference(state.preference);
  if (options.syncPickers !== false) syncOsPickers(state);
  refreshOsBindings(document, state);
  if (options.emit !== false) {
    window.dispatchEvent(new CustomEvent('starlight-os-change', { detail: state }));
  }
  return state;
}

function setOsPreference(preference: OsPreference): OsState {
  return applyState(preference);
}

export function attachOsPicker(select: HTMLSelectElement): () => void {
  initOsRuntime();
  const sync = () => {
    select.value = getOsState().preference;
  };
  const onChange = () => {
    setOsPreference(select.value as OsPreference);
  };
  const onPageShow = (event: PageTransitionEvent) => {
    if (event.persisted) sync();
  };
  sync();
  select.addEventListener('change', onChange);
  window.addEventListener('starlight-os-change', sync as EventListener);
  window.addEventListener('pageshow', onPageShow);
  return () => {
    select.removeEventListener('change', onChange);
    window.removeEventListener('starlight-os-change', sync as EventListener);
    window.removeEventListener('pageshow', onPageShow);
  };
}

export function initOsRuntime(): void {
  if (initialized) return;
  initialized = true;
  applyState(getOsState().preference, { persist: false, emit: false });
  document.addEventListener('astro:after-swap', () => refreshOsBindings());
  document.addEventListener('astro:page-load', () => refreshOsBindings());
}
