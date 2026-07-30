import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
    CONDA_MIRROR: { public: true, static: true },
    UV_DEFAULT_INDEX: { public: true, static: true },
});