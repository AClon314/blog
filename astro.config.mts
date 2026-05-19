import { loadEnv } from "vite";
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import type { StarlightUserConfig } from '@astrojs/starlight/types';
import starlightSiteGraph from 'starlight-site-graph'
import starlightFullViewMode from 'starlight-fullview-mode'
import starlightLlmsTxt from 'starlight-llms-txt'

const slConfig = {
  title: "知识库",
  social: [
    {
      icon: "github",
      label: "GitHub",
      href: "https://github.com/withastro/starlight",
    },
  ],
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
    },
  },
  customCss: [
    './src/styles/index.css',
  ],
  plugins: [
    starlightLlmsTxt(),
    starlightSiteGraph(),
    starlightFullViewMode()
  ],
} satisfies StarlightUserConfig;

// https://astro.build/config
export default defineConfig({
  server: ({ command }) => {
    const env = loadEnv(command, process.cwd(), "");
    const allowedHosts = env.HOST ? [env.HOST] : undefined;
    console.log(`[astro.config] command=${command}\tHOST=${env.HOST ?? ""}\t`);

    return {
      host: true,
      allowedHosts,
      port: 8444,
    };
  },
  site: 'https://example.com/',
  integrations: [
    starlight(slConfig),
  ],
});
