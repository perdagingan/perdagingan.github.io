---
author: Anam Fathonaya
pubDatetime: 2025-05-04T04:59:04.866Z
modDatetime: 2025-05-04T13:39:20.763Z
title: Dynamic OG image generation di postingan blog bertema AstroPaper
slug: dynamic-og-image-generation-in-astropaper-blog-posts
featured: false
draft: false
tags:
  - docs
  - release
description: Fitur baru di AstroPaper v1.4.0, memperkenalkan dynamic OG image generation untuk postingan blog.
---

Fitur baru di AstroPaper v1.4.0, memperkenalkan dynamic OG image generation untuk postingan blog.

## Rangkuman Isi

## Pendahuluan

OG image (gambar sosial) memainkan peranan penting dalam engagement media sosial. Jika kamu tidak tahu apa itu _OG image_, ia adalah gambar yang ditampilkan setiap kali kamu ingin share URL situs web ini di media sosial seperti Facebook, discord dll.

> Gambar sosial yang digunakan untuk Twitter secara teknis tidak disebut OG image.Namun, dalam posting ini, saya akan menggunakan istilah OG image untuk semua jenisnya.

## OG Image Default/statis (_the old way_)

AstroPaper sudah menyediakan cara untuk menambahkan OG image ke postingan blog. Penulis dapat menentukan OG image di frontMatter `ogimage`.Bahkan ketika penulis tidak mendefinisikan OG image di frontmatter, OG image default akan digunakan sebagai fallback (dalam hal ini `public/astropaper-og.jpg`). Tetapi masalahnya adalah bahwa OG image default bertipe statis, yang berarti setiap postingan blog yang tidak punya OG image di frontMatter akan selalu menggunakan OG image default yang sama meskipun setiap posting judul/konten berbeda.

## OG Image Dinamis

Menghasilkan OG image yang dinamis untuk setiap posting memungkinkan penulis untuk menghindari penentuan OG image untuk tiap postingan blog. Selain itu, ini akan mencegah _fallback_ OG image identik dengan semua posting blog.

Dalam Astropaper v1.4.0, paket [Satori](https://github.com/vercel/satori) digunakan untuk pembuatan OG image dinamis.

OG image dinamis akan dihasilkan pada _build time_ untuk postingan blog yang:

- Tidak menyertakan OG image di frontmatter
- Tidak ditkamui sebagai draft.

## Anatomi OG Image Dinamis Astropaper

OG image dinamis dari Astropaper termasuk _the blog post title_, _author name_ dan _site title_. Nama penulis _(author)_ dan judul situs akan diambil melalui `SITE.author` dan `SITE.title` dari ** "src/config.ts" ** file. Judul ini dihasilkan dari `title` frontmatter postingan blog.
! [Contoh tautan OG image Dinamis](https://user-images.githubusercontent.com/53733092/209704501-E9c2236a-3f4d-4c67-bab3-025aEebd6382.png)

### Menampilkan Karakter non-Latin

Judul dengan karakter non-latin tidak akan ditampilkan secara _proper_. Untuk mengatasi ini, kita harus mengganti `fontsconfig` di dalam` loadgooglefont.ts` dengan font pilihanmu.

```ts
// file: loadGoogleFont.ts

async function loadGoogleFonts(
  text: string
): Promise<
  Array<{ name: string; data: ArrayBuffer; weight: number; style: string }>
> {
  const fontsConfig = [
    {
      name: "Noto Sans JP",
      font: "Noto+Sans+JP",
      weight: 400,
      style: "normal",
    },
    {
      name: "Noto Sans JP",
      font: "Noto+Sans+JP:wght@700",
      weight: 700,
      style: "normal",
    },
    { name: "Noto Sans", font: "Noto+Sans", weight: 400, style: "normal" },
    {
      name: "Noto Sans",
      font: "Noto+Sans:wght@700",
      weight: 700,
      style: "normal",
    },
  ];
  // other codes
}
```

> Coba cek [_pull-request_ ini](https://github.com/satnaing/astro-paper/pull/318) untuk penjelasan lebih lanjut.

## Trade-off

Meskipun ini adalah fitur yang bagus untuk dimiliki, ia ada kelemahan. Setiap OG image membutuhkan waktu kira -kira satu detik untuk dihasilkan. Ini mungkin tidak terlihat pada awalnya, tetapi ketika jumlah postingan blog bertambah, kamu mungkin ingin menonaktifkan fitur ini. Karena setiap gambar OG membutuhkan waktu build untuk dihasilkan, jika terlalu banyak akan menambah _build time_ secara signifikan.

Misalnya: Jika satu OG image membutuhkan waktu satu detik untuk dihasilkan, maka 60 gambar akan memakan waktu sekitar satu menit, dan 600 gambar akan memakan waktu sekitar 10 menit. Bisa dibayangkan ya trade-off nya?

Topik yang mirip: [#428](https://github.com/satnaing/astro-paper/issues/428)
