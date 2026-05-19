declare module "*.mjs";

interface ImportMetaEnv {
  readonly MIRROR_CONDA?: string;
  readonly UV_DEFAULT_INDEX?: `${string}/simple`;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
