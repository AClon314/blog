import { sveltex } from '@nvl/sveltex';

export default await sveltex(
    {
        markdownBackend: 'unified',
        codeBackend: 'shiki',
        mathBackend: 'mathjax',
    },
    {
        markdown: {
            // Markdown options
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
