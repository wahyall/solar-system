# Teardown (Quick): Solar System Scope

Ditarik 2026-11-19 dengan `reverse-engineer-marketing` mode **Quick**. Tidak ada tool data berbayar (anggaran Rp0), jadi tidak ada kurva trafik, tidak ada data keyword, dan tahap 3 (masuk ke produk) tidak dijalankan. Tidak ada afiliasi dengan Solar System Scope.

## Ringkasan
Solar System Scope (solarsystemscope.com) adalah model tata surya dan langit malam gratis di browser sejak 2011. Mereka menghasilkan uang dari versi desktop berbayar (USD 9,80), aplikasi mobile dengan pembelian dalam aplikasi, dan merchandise. Selama 24 bulan terakhir posisinya tidak berubah. Mereka juga pembuat tekstur planet CC BY 4.0 yang dipakai di seluruh dunia, termasuk oleh Heliora.

## Temuan

| Temuan | Label | Bukti |
|---|---|---|
| Judul halaman: "Solar System Scope - Online Model of Solar System and Night Sky" | Observed | [Arsip 2024-11](https://web.archive.org/web/20241104052446/https://www.solarsystemscope.com/) |
| Meta description: "Online 3D simulation of the Solar System and night sky in real-time…" tidak berubah 24 bulan | Observed | `teardown.mjs hero`, 24 snapshot |
| Satu-satunya skrip pemasaran yang terlihat: Google Tag Manager, sudah ada sejak awal jendela | Observed | `teardown.mjs stack` |
| Tidak ada pixel iklan di arsip | Observed (bukan bukti mereka tidak beriklan) | `teardown.mjs stack` |
| Tekstur planet gratis dengan lisensi CC BY 4.0 yang mewajibkan atribusi | Observed | [halaman textures](https://www.solarsystemscope.com/textures/) |
| Tekstur menjadi loop backlink: setiap proyek yang memakainya menautkan balik | Inferred, dari kewajiban atribusi; jumlah backlink tidak diperiksa | – |
| CTA utama: "Start online model", lalu unduhan desktop dan toko aplikasi | Observed | [beranda](https://www.solarsystemscope.com/) |
| Pengambilan langsung beranda dan sitemap gagal (ECONNRESET), dipakai salinan arsip | Catatan metode | – |

## Celah dibanding Heliora

| Tahap funnel | Solar System Scope | Heliora | Celah |
|---|---|---|---|
| Akuisisi: pencarian | Memiliki kata "online model of solar system" dan "night sky" sejak 2011 | Domain baru, belum terindeks | Jangan rebut kata generik. Ambil sudut "where are the planets right now" dan "solar system today" |
| Akuisisi: rujukan | Loop atribusi tekstur | Belum ada | Heliora bisa membuat loop sendiri: tautan "lihat langit tanggal X" yang bisa dibagikan |
| Aktivasi | Langsung masuk model, perlu desktop dengan WebGL | Langsung jalan, juga di HP | Keunggulan Heliora: mobile |
| Pendapatan | Desktop berbayar, IAP, merchandise | Gratis, proyek portofolio | Bukan pertarungan Heliora |

## Lima play (diteruskan ke skill pelaksana)

1. **Tautan per tanggal yang bisa dibagikan** (`?date=2026-12-21`). Setiap tautan yang dibagikan membuka langit tanggal itu, jadi jadi loop rujukan. Skill: perubahan kode kecil, lalu `marketing-loops`. Usaha: sehari. Metrik: kunjungan dengan parameter `date`.
2. **Konten "posisi planet hari ini" di momen astronomi** (konjungsi, solstis, gerhana). Skill: `social` / `marketing:draft-content`. Usaha: per momen 30 menit. Metrik: kunjungan di hari momen.
3. **Showcase dan komunitas three.js / WebGL** (repo publik, Discourse three.js, r/threejs, Show HN). Skill: `community-marketing`. Usaha: seminggu. Metrik: bintang GitHub, referrer.
4. **Atribusi balik ke Solar System Scope dan NASA JPL dengan sopan** (sudah ada di situs dan README). Ini membuka peluang co-marketing ringan, misalnya minta dimuat di halaman showcase pengguna tekstur. Skill: `co-marketing`. Usaha: satu email. Metrik: tautan balik.
5. **Halaman judul dan deskripsi yang jelas untuk kata "where are the planets now"**. Skill: `marketing:seo-audit`. Usaha: satu jam (sudah termasuk dalam pekerjaan SEO teknis).

**Play yang dilewati:** aplikasi mobile berbayar dan versi desktop (bukan tujuan portofolio), iklan berbayar (Rp0).

**Mulai minggu ini:** play 1 (tautan per tanggal), karena sekaligus menjadi bahan konten untuk play 2.

## Catatan metode
- Sumber: Wayback Machine lewat `teardown.mjs` (`detect`, `site`, `hero`, `stack`), WebFetch beranda dan halaman textures, 2026-11-19.
- Diblokir: pengambilan langsung beranda (ECONNRESET), sitemap kosong.
- Biaya data: Rp0. Tidak ada akun dibuat, tidak ada demo dipesan.
- Klaim Inferred: loop backlink tekstur (jumlahnya tidak diperiksa).
