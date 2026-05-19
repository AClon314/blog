---
title: "如何编写知识库"
description: "将本项目的各种引用与运行时代码，烘培并导出为一整个markdown文件"
when: "bun run build"
tags:
  - markdown
  - ai
uri: ""
---

## how

### 1.做什么

按 ---yaml_frontmatter--- -> [^why_h2]##how -> ##why 三大段编写

:::note[提示]

https://starlight.astro.js.cn/guides/authoring-content/#expressive-code-features

注意，starlight不支持微软文档的写法，如：

> [!NOTE]
> 用引用来编写新手需要注意的额外提醒
> 需要 Microsoft 的拓展markdown语法，支持 [!NOTE] [!TIP] [!IMPORTANT] [!CAUTION] [!WARNING] [!ERROR]

:::

### 2.支持的拓展语法

[`src/components/Phon.astro`](src/components/Phon.astro): 仅在 `.mdx` 中可用。先在文件里 `import Phon from '/src/components/Phon.astro'`，再写 `<Phon pairs="脚注 footnote" />`。规律为 `pairs="A a B b"` -> `<ruby>A<rt>a</rt>B<rt>b</rt></ruby>`

## why

集中解释为什么；若需要注音语法，请改用 `.mdx` 并显式导入 `Phon` 组件。

[^why_h2]: 保留h1标签，从h2开始编码。防止之后需要h1时需要大量改动文件。
