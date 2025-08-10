import type { APIRoute } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";
import { getPath } from "@/utils/getPath.ts";
import { generateOgImageForPost } from "@/utils/generateOgImages.ts";
import { SITE } from "@/config.ts";

export async function getStaticPaths() {
  if (!SITE.dynamicOgImage) {
    return [];
  }

  const posts = await getCollection("blog").then(p =>
    p.filter(({ data }) => !data.draft && !data.ogImage)
  );

  return posts.map(post => ({
    params: { slug: getPath(post.id, post.filePath, false) },
    props: post,
  }));
}

export const GET: APIRoute = async ({ props }: { props: unknown }) => {
  if (!SITE.dynamicOgImage) {
    return new Response(null, {
      status: 404,
      statusText: "Not found",
    });
  }

  const arrayBuffer = await generateOgImageForPost(props as CollectionEntry<"blog">);
  return new Response(arrayBuffer, {
    headers: { "Content-Type": "image/png" },
  });
};
