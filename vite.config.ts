import { paraglideVitePlugin } from "@inlang/paraglide-js";
import tailwindcss from "@tailwindcss/vite";
import adapter from "@sveltejs/adapter-cloudflare";
import { sveltekit } from "@sveltejs/kit/vite";
import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv } from "vite";
import sveltexPreprocessor from "./sveltex.config.js";

export default defineConfig(({ mode }) => {
  const { allowedHost } = loadEnv(mode, process.cwd(), "");
  return {
    server: allowedHost ? { allowedHosts: [allowedHost] } : undefined,
    resolve: {
      alias: {
        $lib: fileURLToPath(new URL("./src/lib", import.meta.url)),
      },
    },
    plugins: [
      tailwindcss(),
      sveltekit({
        extensions: [".svelte", ".sveltex"],
        preprocess: [sveltexPreprocessor],
        compilerOptions: {
          // Force runes mode for the project, except for libraries. Can be removed in svelte 6.
          runes: ({ filename }) =>
            filename.split(/[/\\]/).includes("node_modules") ? undefined : true,
          experimental: { async: true },
        },

        // adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
        // If your environment is not supported, or you settled on a specific environment, switch out the adapter.
        // See https://svelte.dev/docs/kit/adapters for more information about adapters.
        adapter: adapter(),
        experimental: { remoteFunctions: true },
      }),

      paraglideVitePlugin({
        project: "./project.inlang",
        outdir: "./src/lib/paraglide",
        emitTsDeclarations: true,
      }),
    ],
  };
});
