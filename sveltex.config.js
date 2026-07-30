import { sveltex } from '@nvl/sveltex';
import remarkGfm from 'remark-gfm';

export default await sveltex(
    {
        markdownBackend: 'unified',
        codeBackend: 'shiki',
        mathBackend: 'mathjax',
    },
    {
        markdown: {
            remarkPlugins: [remarkGfm],
        },
        code: {
            shiki: {
                themes: {
                    light: 'github-light-default',
                    dark: 'github-dark-default',
                },
            },
        },
        math: {
            // Math options
        },
        tex: {
            // Default LaTeX options
        },
        verbatim: {
            Code: {
                type: 'code',
                component: 'none',
            },
            // Content inside <TeX ref="...">...</TeX> will be compiled by the
            // local TeX distribution. For example, you can try the following:
            // "<TeX ref="example">\LaTeX</TeX>". Note that the "ref" attribute
            // is mandatory.
            TeX: {
                type: 'tex',
            },
        },
    },
);
