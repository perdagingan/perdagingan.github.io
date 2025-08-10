import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { SITE } from "@/config.ts";

export const BLOG_PATH = "src/data/blog";

const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: `./${BLOG_PATH}` }),
  schema: ({ image }: { image: any }) =>
    z.object({
      author: z.string().default(SITE.author),
      pubDatetime: z.date(),
      modDatetime: z.date().optional().nullable(),
      title: z.string(),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      tags: z.array(z.string()).default(["others"]),
      ogImage: image().or(z.string()).optional(),
      description: z.string(),
      canonicalURL: z.string().optional(),
      hideEditPost: z.boolean().optional(),
      timezone: z.string().optional(),
  // Optional Qur'an verse embedding controls
  quranVerses: z.union([z.string(), z.array(z.string())]).optional(),
  quranShowTransliteration: z.boolean().optional(),
  quranShowTranslation: z.boolean().optional(),
  quranTranslationIds: z.union([z.number(), z.array(z.number())]).optional(),
  quranSurahNameLanguage: z.string().optional(),
  quranClient: z.boolean().optional(),
    }),
});

export const collections = { blog };
