import { defineEnvVars } from "@sveltejs/kit/env";

const defaultOS = () => {
  if (process.platform === "win32") return "windows";
  if (process.platform === "darwin") return "macos";
  return "linux";
};

export const variables = defineEnvVars({
  OS: {
    public: true,
    static: true,
    schema: (v) => v ?? defaultOS(),
  },
  CONDA_MIRROR: {
    public: true,
    static: true,
    schema: (v) => v ?? "https://mirrors.tuna.tsinghua.edu.cn/anaconda",
  },
  UV_DEFAULT_INDEX: {
    public: true,
    static: true,
    schema: (v) => v ?? "http://mirrors.tuna.tsinghua.edu.cn/pypi/web/simple",
  },
});
