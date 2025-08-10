---
author: Anam Fathonaya
pubDatetime: 2022-09-25T15:20:35Z
title: Menyesuaikan skema warna tema AstroPaper
featured: false
draft: false
tags:
  - color-schemes
  - docs
description:
  Bagaimana kamu dapat mengaktifkan/menonaktifkan mode terang & gelap;dan menyesuaikan skema warna dari tema astropaper.
---

Postingan ini akan menjelaskan bagaimana kamu dapat mengaktifkan/menonaktifkan mode Light & Dark untuk situs web. Selain itu, kamu akan belajar bagaimana kamu dapat menyesuaikan skema warna dari seluruh situs web.

## Rangkuman Isi

## Mengaktifkan/menonaktifkan light & dark mode

Tema Astropaper akan mencakup mode terang dan gelap secara default. Dengan kata lain, akan ada dua skema warna \ _ satu untuk mode cahaya dan satu lagi untuk mode gelap. Perilaku default ini dapat dinonaktifkan di objek konfigurasi situs dari file `src/config.ts`.

```js
// file: src/config.ts
export const SITE = {
  website: "https://astro-paper.pages.dev/",
  author: "Anam Fathonaya",
  desc: "A minimal, responsive and SEO-friendly Astro blog theme.",
  title: "AstroPaper",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true, // true by default
  postPerPage: 3,
};
```

Untuk menonaktifkan mode `light & dark mode` atur nilai `SITE.lightAndDarkMode` ke `false`.

## Memilih skema warna

Secara bawaan, jika kita disable `SITE.lightAndDarkMode`, Kita hanya akan mendapatkan skema prefers-warna sistem.

Dengan demikian, untuk memilih skema warna primer alih-alih lebih suka skema warna _preferred_, kita harus menetapkan skema warna dalam variabel `primarycolorscheme` di dalam `publik/sakelar-theme.js`.

```js
/* file: public/toggle-theme.js */
const primaryColorScheme = ""; // "light" | "dark"

// Get theme data from local storage
const currentTheme = localStorage.getItem("theme");

// other codes etc...
```

Variabel **primaryColorScheme** dapat menampung dua nilai \ _ `"light"`, `"dark"`. Anda dapat meninggalkan string kosong (default) jika Anda tidak ingin menentukan skema warna utama.

- `""` - Sistem prefers-color-scheme. (default)
- `"light"` - Gunakan mode cahaya sebagai skema warna primer.
- `"dark"` - Gunakan mode gelap sebagai skema warna primer.

<details><summary>Mengapa 'primaryColorsCheme' tidak ada di dalam config.ts?</summary>

> Untuk menghindari warna flickering berkedip-kedip pada halaman ulang halaman, kita harus menempatkan kode javascript sakelar sakelar sedini mungkin ketika halaman dimuat.Ini memecahkan masalah berkedip-kedip, tetapi sebagai trade-off, kami tidak dapat menggunakan impor ESM lagi.

[Click here](https://docs.astro.build/en/reference/directives-reference/#isinline) to know more about Astro's `is:inline` script.

</details>

## Customize color schemes

Both light & dark color schemes of AstroPaper theme can be customized. You can do this in `src/styles/base.css` file.

```css
/* file: src/styles/base.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root,
  html[data-theme="light"] {
    --color-fill: 251, 254, 251;
    --color-text-base: 40, 39, 40;
    --color-accent: 0, 108, 172;
    --color-card: 230, 230, 230;
    --color-card-muted: 205, 205, 205;
    --color-border: 236, 233, 233;
  }
  html[data-theme="dark"] {
    --color-fill: 47, 55, 65;
    --color-text-base: 230, 230, 230;
    --color-accent: 26, 217, 217;
    --color-card: 63, 75, 90;
    --color-card-muted: 89, 107, 129;
    --color-border: 59, 70, 85;
  }
  /* other styles */
}
```

In AstroPaper theme, `:root` and `html[data-theme="light"]` selectors are used as the light color scheme and `html[data-theme="dark"]` is used the dark color scheme. If you want to customize your custom color scheme, you have to specify your light color scheme inside `:root`,`html[data-theme="light"]` and dark color scheme inside `html[data-theme="dark"]`.

Colors are declared in CSS custom property (CSS Variable) notation. Color property values are written in rgb values. (Note: instead of `rgb(40, 39, 40)`, only specify `40, 39, 40`)

Here is the detail explanation of color properties.

| Color Property       | Definition & Usage                                         |
| -------------------- | ---------------------------------------------------------- |
| `--color-fill`       | Primary color of the website. Usually the main background. |
| `--color-text-base`  | Secondary color of the website. Usually the text color.    |
| `--color-accent`     | Accent color of the website. Link color, hover color etc.  |
| `--color-card`       | Card, scrollbar and code background color (like `this`).   |
| `--color-card-muted` | Card and scrollbar background color for hover state etc.   |
| `--color-border`     | Border color. Especially used in horizontal row (hr)       |

Here is an example of changing the light color scheme.

```css
@layer base {
  /* lobster color scheme */
  :root,
  html[data-theme="light"] {
    --color-fill: 246, 238, 225;
    --color-text-base: 1, 44, 86;
    --color-accent: 225, 74, 57;
    --color-card: 220, 152, 145;
    --color-card-muted: 233, 119, 106;
    --color-border: 220, 152, 145;
  }
}
```

> Check out some [predefined color schemes](https://astro-paper.pages.dev/posts/predefined-color-schemes/) AstroPaper has already crafted for you.
