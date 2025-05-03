import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import { SITE } from "./src/config";
import {
  DEFAULT_LOCALE,
  LOCALES_TO_LANG,
  SUPPORTED_LOCALES,
} from "./src/i18n/config";

export default defineConfig({
  site: "https://perdagingan.github.io",
  outDir: "./dist",
  trailingSlash: "always",

  // Konfigurasi build khusus untuk GitHub Pages
  build: {
    format: "directory",
    inlineStylesheets: "always",
  },

  i18n: {
    locales: SUPPORTED_LOCALES,
    defaultLocale: DEFAULT_LOCALE,
  },

  integrations: [
    sitemap({
      filter: page => SITE.showArchives || !page.endsWith("/archives"),
      i18n: {
        defaultLocale: DEFAULT_LOCALE,
        locales: LOCALES_TO_LANG,
      },
    }),
  ],

  markdown: {
    remarkPlugins: [
      [
        remarkToc,
        {
          heading:
            "(table[ -]of[ -])?contents?|toc|محتويات|المحتويات|جدول المحتويات",
        },
      ],
      [remarkCollapse, { test: "Table of contents" }],
    ],
    shikiConfig: {
      themes: { light: "min-light", dark: "night-owl" },
      wrap: true,
    },
  },

  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
});
