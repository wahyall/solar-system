# Audit SEO Heliora (pra-peluncuran)

| | |
|---|---|
| **Tanggal** | 19 Nov 2026 |
| **Jenis** | Full audit untuk situs yang belum live: teknis, on-page, keyword, celah konten, pesaing |
| **Situs** | `heliora.vercel.app` (rencana, belum di-deploy) |
| **Disusun dengan** | `marketing:seo-audit`, `search-first` |
| **Keterbatasan** | Tidak ada tool SEO (Ahrefs, Semrush, Search Console) yang terhubung. Volume dan kesulitan keyword adalah perkiraan kualitatif dari hasil pencarian web, bukan angka. Hubungkan Search Console setelah deploy agar data asli masuk. |

## 1. Ringkasan

Heliora adalah aplikasi satu halaman, jadi peluang SEO-nya sempit tapi jelas: satu halaman yang benar-benar menjawab niat "where are the planets right now" dan "solar system 3D". Kekuatan terbesarnya adalah produknya sendiri (cepat, cantik, jalan di HP). Kelemahannya, domain baru tanpa backlink, sementara kata generik seperti "online model of solar system" sudah dikuasai Solar System Scope sejak 2011. **Kesimpulan: fondasi teknis sekarang kuat, dan pertumbuhan pencarian akan datang dari backlink komunitas, bukan dari keyword generik.**

**Tiga prioritas**
1. Deploy, daftarkan ke Google Search Console, kirim sitemap.
2. Kumpulkan backlink pertama dari tempat yang relevan (repo GitHub publik, showcase three.js, Discourse three.js).
3. Setelah 4 minggu data Search Console, perbaiki judul dan deskripsi berdasarkan query yang benar-benar muncul.

## 2. Peluang keyword

Semua volume dan kesulitan berupa perkiraan (tinggi/sedang/rendah), dilihat dari siapa yang menempati halaman pertama.

| Keyword | Kesulitan | Peluang | Ranking sekarang | Intent | Konten yang cocok |
|---|---|---|---|---|---|
| where are the planets right now | Sedang | **Tinggi** | – (belum live) | Informasional | Beranda (judul dan H1 sudah memuatnya) |
| where are the planets now 3d | Sedang | **Tinggi** | – | Informasional | Beranda |
| solar system right now | Sedang | **Tinggi** | – | Informasional | Beranda |
| live solar system 3d | Rendah–sedang | **Tinggi** | – | Informasional | Beranda |
| planet positions today 3d | Sedang | **Tinggi** | – | Informasional | Beranda |
| solar system today | Sedang | Sedang | – | Informasional | Beranda |
| 3d solar system in browser | Sedang | Sedang | – | Informasional | Beranda, README GitHub |
| interactive solar system online | Tinggi | Sedang | – | Informasional | Beranda |
| three.js solar system | Sedang | **Tinggi (dev)** | – | Navigasi/belajar | README GitHub, tulisan teknis |
| webgl solar system shader | Rendah | Sedang (dev) | – | Belajar | Tulisan teknis atmosfer/cincin |
| realistic earth shader three.js | Sedang | Sedang (dev) | – | Belajar | Tulisan teknis (day/night, city lights) |
| saturn ring shadow shader | Rendah | Sedang (dev) | – | Belajar | Tulisan teknis |
| is venus visible tonight | Tinggi | Rendah | – | Informasional, butuh lokasi | Lewati: Heliora tidak menampilkan langit dari lokasi pengamat |
| planet alignment 2026 / 2027 | Tinggi, musiman | Sedang | – | Informasional | Post sosial saat momen, menautkan ke demo |
| solar system model | Tinggi | Rendah | – | Campuran (banyak barang fisik) | Lewati |
| online model of solar system | Tinggi | Rendah | – | Informasional | Lewati, dikuasai Solar System Scope |
| orrery online | Rendah–sedang | Sedang | – | Informasional | Sebut "orrery" di deskripsi README |
| how far is mars from earth today | Tinggi | Sedang | – | Informasional | Heliora menampilkan angka ini secara live; bisa dipakai di post sosial |
| how long does sunlight take to reach jupiter | Rendah–sedang | Sedang | – | Pertanyaan | Readout "Sunlight takes" sudah ada; bahan post |
| solar system simulator time travel | Rendah | Sedang | – | Informasional | Beranda (kontrol waktu) |

## 3. On-page

| Halaman | Masalah | Tingkat | Perbaikan | Status |
|---|---|---|---|---|
| `/` | Judul generik "Solar System Explorer", tanpa keyword | Tinggi | "Heliora · See where every planet is right now, in 3D" (52 karakter) | **Selesai** |
| `/` | Tidak ada meta description | Tinggi | Deskripsi 158 karakter dengan keyword dan ajakan | **Selesai** |
| `/` | Tidak ada H1 (hanya H2 di panel) | Tinggi | H1 statis di HTML untuk crawler, H1 `sr-only` di aplikasi | **Selesai** |
| `/` | Semua konten dirender JavaScript; HTML awal kosong | Sedang | Konten statis (H1 + paragraf) di dalam `#root`, diganti React saat mount | **Selesai** |
| `/` | Tidak ada canonical | Sedang | `<link rel="canonical">` ke `https://heliora.vercel.app/` | **Selesai** |
| `/` | Tidak ada Open Graph/Twitter card | Tinggi (untuk sosial) | Meta OG dan Twitter lengkap, gambar 1200×630 | **Selesai** (`public/og.png`) |
| `/` | Google Fonts dimuat lewat `@import` CSS (memblokir render) | Sedang | Pindah ke `<link rel="preconnect">` + stylesheet di `<head>` | **Selesai** |
| `/` | Favicon 404 | Sedang | Set ikon dari kit logo | **Selesai** (favicon.ico/.svg, apple-touch, ikon PWA) |
| Canvas | Tidak ada alternatif teks | Rendah | `aria-label` di canvas sudah ada, label planet adalah tombol nyata | Sudah ada |

## 4. Teknis

| Cek | Status | Detail |
|---|---|---|
| `robots.txt` | Pass | `public/robots.txt`, mengizinkan semua, menunjuk sitemap |
| Sitemap XML | Pass | `public/sitemap.xml`, satu URL |
| Canonical | Pass | Ditetapkan ke domain Vercel |
| Structured data | Pass | JSON-LD `WebApplication` dengan `isAccessibleForFree`, `offers` gratis, `author` |
| HTTPS | Pass (setelah deploy) | Vercel otomatis HTTPS |
| Mobile | Pass | Viewport benar, diuji di 360, 375 dan 768 px, tanpa scroll horizontal |
| Kecepatan | Warning | Bundle JS 823 kB (226 kB gzip), tekstur ±6 MB total. Loading screen menahan tampilan sampai tekstur siap. Lihat aksi strategis #4 |
| Core Web Vitals | Belum diukur | LCP akan didominasi loading screen. Ukur setelah deploy dengan PageSpeed Insights |
| Manifest / ikon | Pass | `site.webmanifest` dengan ikon 192, 512 dan maskable |
| Analytics | Pass | Skrip Vercel Analytics hanya di build produksi. Perlu diaktifkan di dashboard Vercel |
| Indeksasi JS | Warning | Google merender JS, tapi konten statis di `#root` tetap jadi jaminan |
| Tautan rusak | Pass | Tautan kredit dan sumber mengarah ke URL yang sudah diperiksa saat riset |

## 5. Pesaing

| Dimensi | Heliora | Solar System Scope | NASA Eyes | TheSkyLive |
|---|---|---|---|---|
| Fokus keyword (dari judul) | "where every planet is right now, in 3D" | "Online Model of Solar System and Night Sky" | "NASA's Eyes" (merek) | Data objek per tanggal dan lokasi |
| Kedalaman konten | Satu halaman + README | Model + ensiklopedia "Spacepedia" | Suite belasan aplikasi | Ribuan halaman objek dan tanggal |
| Backlink | Belum ada | Sangat kuat (sejak 2011, loop atribusi tekstur) | Domain NASA | Kuat |
| Teknis | Ringan, satu halaman | Model web perlu desktop | Berat, real-time | Halaman ringan berisi iklan |
| Pemenang untuk "where are the planets right now" | Belum tahu | – | NASA Eyes (sering disebut) | – |

**Pelajaran:** jangan menantang pesaing di kedalaman konten. Menang di kecepatan menuju momen "wah", dan biarkan komunitas yang menautkan.

## 6. Celah konten

| Topik | Kenapa penting | Format | Prioritas | Usaha |
|---|---|---|---|---|
| "Cara saya menghitung posisi planet di browser" (JPL elements) | Banyak demo memakai orbit palsu. Ini pembeda yang bisa dibuktikan | Tulisan LinkedIn + README bagian "How it works" | Tinggi | Setengah hari |
| Shader atmosfer, terminator Bumi, bayangan cincin | Kata kunci dev dengan kompetisi rendah, bahan backlink | Tulisan teknis + GIF | Tinggi | Setengah hari per topik |
| Momen astronomi (konjungsi, oposisi, solstis) | Lonjakan pencarian musiman | Post sosial dengan klip dari Heliora | Sedang | 30 menit per momen |
| Halaman per tanggal (`?date=`) | Membuat tautan yang bisa dibagikan untuk setiap momen | Fitur kecil (lihat rencana peluncuran) | Sedang | Sehari |

## 7. Rencana aksi

**Quick win (minggu ini)**
| Aksi | Dampak | Usaha | Ketergantungan |
|---|---|---|---|
| Semua perbaikan on-page dan teknis di atas | Tinggi | Selesai | – |
| Deploy ke Vercel dengan nama proyek `heliora` | Tinggi | 15 menit | Akun Vercel (kamu) |
| Search Console: verifikasi domain, kirim sitemap | Tinggi | 15 menit | Deploy |
| Aktifkan Vercel Analytics | Sedang | 2 menit | Deploy |
| Repo GitHub publik dengan topik `threejs`, `solar-system`, `webgl`, `orrery`, `react` | Sedang | 10 menit | Push (perlu persetujuanmu) |

**Investasi strategis (kuartal ini)**
| Aksi | Dampak | Usaha | Ketergantungan |
|---|---|---|---|
| 1. Post showcase di Discourse three.js (kategori Showcase) | Tinggi: backlink relevan dan trafik dev | 1 jam | Deploy, klip |
| 2. Dua tulisan teknis (posisi JPL; shader Bumi/atmosfer) | Tinggi | 1 hari | Klip/GIF |
| 3. Tautan per tanggal `?date=` | Sedang | 1 hari | Perubahan kode |
| 4. Kecilkan muatan awal: tekstur WebP/KTX2, code-split addon three | Sedang (CWV) | 1 hari | Pengukuran PageSpeed dulu |
| 5. Review Search Console setelah 4 minggu, ubah judul sesuai query asli | Sedang | 1 jam | Data 4 minggu |
