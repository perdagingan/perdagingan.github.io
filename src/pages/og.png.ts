import type { APIRoute } from "astro";
import { generateOgImageForSite } from "@/utils/generateOgImages.ts";

export const GET: APIRoute = async () => {
  const arrayBuffer = await generateOgImageForSite();
  return new Response(arrayBuffer, {
    headers: { "Content-Type": "image/png" },
  });
};
