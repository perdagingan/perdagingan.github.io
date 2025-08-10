---
author: Anam Fathonaya
pubDatetime: 2025-05-04T12:00:52.737Z
modDatetime: 2025-05-24T09:00:46.734Z
title: Pakai LaTeX di Astro? Disa Dong...
tags:
  - docs
description: Cari tau bagaimana pakai LaTeX equations di Blog berbasis Astro menggunakan Markdown, KaTex, dan plugin remark/rehype
---

Artikel ini akan mencontohkan caranya menggunakan LaTeX equations di dalam file Markdown untuk tema AstroPaper. LaTeX adalah _typesetting system_ yang umum digunakan untuk menulis persamaan matematika dan rumus-rumus saintifik

<figure>
  <img
    src="https://images.pexels.com/photos/22690748/pexels-photo-22690748/free-photo-of-close-up-of-complicated-equations-written-on-a-blackboard.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    alt="Free Close-up of complex equations on a chalkboard, showcasing chemistry and math symbols. Stock Photo"
  />
  <figcaption class="text-center">
    Photo by <a href="https://www.pexels.com/photo/close-up-of-complicated-equations-written-on-a-blackboard-22690748/">Vitaly Gariev</a>
  </figcaption>
</figure>

## Rangkuman Isi

## Langkah-langkah

Di bagian ini, kamu akan mendapatkan instruksi untuk menambahkan dukungan LaTeX di file Markdown-mu untuk tema AstroPaper.

1. Install plugin remark dan rehype dengan prompt:

   ```bash
   pnpm install rehype-katex remark-math katex
   ```

2. Perbarui konfigurasi Astro (`astro.config.ts`) untuk menggunakan plugin tersebut:

   ```ts
   // other imports
   import remarkMath from "remark-math";
   import rehypeKatex from "rehype-katex";

   export default defineConfig({
     // other configs
     markdown: {
       remarkPlugins: [
         remarkMath, // <- new plugin
         remarkToc,
         [remarkCollapse, { test: "Table of contents" }],
       ],
       rehypePlugins: [rehypeKatex], // <- new plugin
       shikiConfig: {
         // For more themes, visit https://shiki.style/themes
         themes: { light: "min-light", dark: "night-owl" },
         wrap: true,
       },
     },
     // other configs
   });
   ```

3. Import KaTeX CSS ke file main layout project Astro-mu `src/layouts/Layout.astro`

   ```astro
   ---
   import { SITE } from "@config";

   // astro code
   ---

   <!doctype html>
   <!-- others... -->
   <script is:inline src="/toggle-theme.js"></script>

   <link
     rel="stylesheet"
     href="https://cdn.jsdelivr.net/npm/katex@0.15.2/dist/katex.min.css"
   />

   <body>
     <slot />
   </body>
   ```

4. Langkah terakir, tambahkan text-color untuk `katex` di `src/styles/typography.css`.

   ```css
   @plugin '@tailwindcss/typography';

   @layer base {
     /* other classes */

     /* Katex text color */
     .prose .katex-display {
       @apply text-foreground;
     }

     /* ===== Code Blocks & Syntax Highlighting ===== */
     /* other classes */
   }
   ```

dan _voilà_, setup ini memungkinkanmu untuk menulis LaTeX _equations_ di file Markdown, yang mana akan dirender saat proses build. Setelah melakukan langkah-langkah di atas, seluruh persamaan LaTeX akan ditampilkan sebagaimana mestinya.

---

## Inline Equations

_Inline equations_ atau persamaan satu-baris ditulis diantara tkamu baca dollar `$...$`. Berikut contohnya:

1. Rumus dari teori relativitas Einstein: `$E = mc^2$`
2. Persamaan kuadrat: `$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$`
3. Pesamaan Euler: `$e^{i\pi} + 1 = 0$`

---

## Block Equations

Untuk persamaan yang lebih kompleks atau perlu beberapa baris untuk keterbacaan, gunakan tkamu baca dollar dobel `$$...$$`:

Integral Gauss:

```bash
$$ \int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi} $$
```
akan ditampilkan sebagai
$$ \int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi} $$

Definisi dari fungsi zeta Riemann:

```bash
$$ \zeta(s) = \sum_{n=1}^{\infty} \frac{1}{n^s} $$
```
akan ditampilkan sebagai
$$ \zeta(s) = \sum_{n=1}^{\infty} \frac{1}{n^s} $$

Persamaan Maxwell bentuk diferensial:

```bash
$$
\begin{aligned}
\nabla \cdot \mathbf{E} &= \frac{\rho}{\varepsilon_0} \\
\nabla \cdot \mathbf{B} &= 0 \\
\nabla \times \mathbf{E} &= -\frac{\partial \mathbf{B}}{\partial t} \\
\nabla \times \mathbf{B} &= \mu_0\left(\mathbf{J} + \varepsilon_0 \frac{\partial \mathbf{E}}{\partial t}\right)
\end{aligned}
$$
```
akan ditampilkan sebagai
$$
\begin{aligned}
\nabla \cdot \mathbf{E} &= \frac{\rho}{\varepsilon_0} \\
\nabla \cdot \mathbf{B} &= 0 \\
\nabla \times \mathbf{E} &= -\frac{\partial \mathbf{B}}{\partial t} \\
\nabla \times \mathbf{B} &= \mu_0\left(\mathbf{J} + \varepsilon_0 \frac{\partial \mathbf{E}}{\partial t}\right)
\end{aligned}
$$

---

## Menggunakan Simbol Matematika

LaTeX menyediakan cakupan yang luas untuk simbol-simbol matematika:

- Abjad Yunani: `$\alpha$`, `$\beta$`, `$\gamma$`, `$\delta$`, `$\epsilon$`, `$\pi$`
- Operator matematika: `$\sum$`, `$\prod$`, `$\int$`, `$\partial$`, `$\nabla$`
- Relasi: `$\leq$`, `$\geq$`, `$\approx$`, `$\sim$`, `$\propto$`
- Simbol logika: `$\forall$`, `$\exists$`, `$\neg$`, `$\wedge$`, `$\vee$`
