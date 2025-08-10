import { Resvg } from "@resvg/resvg-js";
import { type CollectionEntry } from "astro:content";
import postOgImage from "./og-templates/post.js";
import siteOgImage from "./og-templates/site.js";

function svgBufferToPngArrayBuffer(svg: string): ArrayBuffer {
  const resvg = new Resvg(svg);
  const pngData = resvg.render();
  const buf = pngData.asPng(); // Buffer or Uint8Array-like
  // Ensure we return a plain ArrayBuffer for fetch Response typing
  if (buf instanceof Uint8Array) {
    const slice = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
    // Ensure plain ArrayBuffer by copying (avoids SharedArrayBuffer type issues)
    const copy = new Uint8Array(slice.byteLength);
    copy.set(new Uint8Array(slice));
    return copy.buffer;
  }
  // Fallback: construct a Uint8Array then return its buffer
  const u8 = new Uint8Array(buf as any);
  return u8.buffer;
}

export async function generateOgImageForPost(post: CollectionEntry<"blog">): Promise<ArrayBuffer> {
  const svg = await postOgImage(post);
  return svgBufferToPngArrayBuffer(svg);
}

export async function generateOgImageForSite(): Promise<ArrayBuffer> {
  const svg = await siteOgImage();
  return svgBufferToPngArrayBuffer(svg);
}
