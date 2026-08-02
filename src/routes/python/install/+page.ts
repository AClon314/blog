import * as env from '$app/env/public';
import { codeToHtml } from 'shiki';

import type { PageLoad } from './$types';

const SHIKI_THEMES = {
    light: 'github-light-default',
    dark: 'github-dark-default',
} as const;

export const load: PageLoad = async () => {
    const CONDA_MIRROR = (env.CONDA_MIRROR ?? 'https://mirrors.tuna.tsinghua.edu.cn/anaconda').replace(/\/$/, '');
    const PYPI_MIRROR = (env.UV_DEFAULT_INDEX ?? 'http://mirrors.tuna.tsinghua.edu.cn/pypi/web/simple').replace(/\/$/, '');

    const config = {
        pixi: `
# Windows: %USERPROFILE%/.pixi/config.toml
# macOS/Linux: ~/.config/pixi/config.toml
default-channels=["main"]
[mirrors]
"https://conda.anaconda.org/main" = ["${CONDA_MIRROR}/pkgs/main"]
"https://conda.anaconda.org/msys2" = ["${CONDA_MIRROR}/pkgs/msys2"]
"https://conda.anaconda.org/conda-forge" = ["${CONDA_MIRROR}/cloud/anaconda"]
"https://conda.anaconda.org/pytorch" = ["${CONDA_MIRROR}/cloud/pytorch"]
"https://conda.anaconda.org/pytorch3d" = ["${CONDA_MIRROR}/cloud/pytorch3d"]
[pypi-config]
index-url="${PYPI_MIRROR.replace(/\/simple$/, '')}"
[repodata-config]
disable-sharded=true # avoid 404
disable-zstd=true # avoid EOF
[shell]
change-ps1=true
`.trim(),
        uv: `
# Windows: %APPDATA%/uv/uv.toml
# macOS/Linux: ~/.config/uv/uv.toml
[[index]]
url="${PYPI_MIRROR}"
`.trim()
    };

    const html = Object.fromEntries(
        await Promise.all(
            Object.entries(config).map(async ([k, v]) => [
                k,
                await codeToHtml(v, {
                    lang: 'toml',
                    themes: SHIKI_THEMES,
                }),
            ])
        )
    );

    return {
        config,
        html,
    };
};
