declare module "*.mjs";

interface ImportMetaEnv {
  readonly CONDA_MIRROR?: string;
  readonly UV_DEFAULT_INDEX?: `${string}/simple`;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  StarlightThemeProvider?: {
    updatePickers: (theme?: string) => void;
  };
}
