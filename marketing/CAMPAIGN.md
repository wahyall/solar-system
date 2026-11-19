# Kampanye peluncuran: First Light

*"First light" adalah istilah astronomi untuk pengamatan pertama sebuah teleskop baru. Cocok untuk peluncuran Heliora.*

| | |
|---|---|
| **Disusun dengan** | `marketing:campaign-plan`, `marketing-psychology`, `search-first` (tanggal momen langit) |
| **Durasi** | 4 minggu setelah deploy (rencana: minggu 2–5 di roadmap, sekitar 30 Nov – 27 Des 2026) |
| **Anggaran** | Rp0. Biayanya waktu: ±4 jam/minggu |
| **Prasyarat** | Situs live di `heliora.vercel.app`, Vercel Analytics aktif, repo publik, logo dan OG siap |

## 1. Ringkasan
- **Ringkasan satu kalimat:** memperkenalkan Heliora sebagai cara tercepat melihat tata surya yang asli hari ini, lewat klip pendek, komunitas dev, dan satu momen langit (solstis).
- **Tujuan utama (SMART):** dalam 4 minggu, demo dibuka oleh pengunjung dari setidaknya 4 referrer berbeda (Threads, LinkedIn, satu platform video, satu komunitas dev), dan setiap minggu ada data yang tercatat. Angka kunjungan sengaja tidak ditargetkan karena belum ada baseline.
- **Tujuan sekunder:** cerita peluncuran yang bisa dipakai di CV, bintang GitHub pertama, dan 3 tanggapan dari kreator atau mitra yang dihubungi.

## 2. Audiens
| Segmen | Profil singkat | Ada di mana | Tahap |
|---|---|---|---|
| Recruiter / klien (utama) | Hiring manager atau lead teknis yang menilai kemampuan dari demo live, bukan screenshot | LinkedIn | Kesadaran → pertimbangan |
| Dev kreatif (kedua) | Pengguna three.js/WebGL yang penasaran tekniknya | Discourse three.js, r/threejs, Hacker News, GitHub | Kesadaran |
| Publik penasaran langit | Orang yang melihat sesuatu terang di langit dan ingin tahu | TikTok, Reels, Shorts, Threads | Kesadaran |

## 3. Pesan
**Pesan inti:** *See where every planet is right now, in 3D.*
(Versi Indonesia untuk caption lokal: *Lihat posisi setiap planet saat ini, dalam 3D.*)

| Pesan pendukung | Bukti |
|---|---|
| Posisinya asli, hari ini | Tanggal dan indikator Live terlihat di klip. Model cocok dengan almanak untuk oposisi Jupiter (11 Feb 2027) dan Mars (19 Feb 2027) |
| Indah, juga di HP | Klip terminator Bumi dengan lampu kota, bayangan cincin Saturnus, korona Matahari |
| Tanpa unduh, tanpa akun | Tautan langsung |
| Terbuka | Repo publik dan tulisan "how it's built" |

**Variasi per kanal:** LinkedIn reflektif dan teknis-ringan. Threads santai dan penasaran. Video: hook visual dalam 1 detik pertama, teks besar, tanpa perlu suara. Komunitas dev: teknis, rendah hati, mengundang kritik.

## 4. Strategi kanal
| Kanal | Kenapa | Format | Usaha |
|---|---|---|---|
| TikTok / Reels / Shorts | Jangkauan publik terbesar, visual adalah keunggulan Heliora | Klip 15–25 detik 9:16 | Sedang (rekam batch) |
| Threads | Audiens dev dan kreatif Indonesia aktif | Klip + thread 3–5 post | Rendah |
| LinkedIn | Tempat recruiter dan klien | Post cerita + 1 tulisan teknis | Sedang |
| Discourse three.js (Showcase) | Audiens paling relevan untuk dev, menghasilkan backlink | Post showcase dengan GIF dan penjelasan teknik | Rendah |
| r/threejs | Dev three.js | Post showcase, patuhi aturan subreddit | Rendah |
| Show HN | Dev umum, potensi lonjakan besar | Post "Show HN" + siap menjawab komentar selama 2–3 jam | Sedang |
| Email (manual) | Mitra dan kreator | 1–5 email personal (`OUTREACH-EMAILS.md`) | Rendah |
| Berbayar | – | – | Dilewati (Rp0) |

## 5. Kalender konten
| Minggu | Konten | Kanal | Catatan | Status |
|---|---|---|---|---|
| 0 (persiapan) | Rekam 4 klip: Bumi siang→malam, Saturnus + bayangan cincin, overview time-lapse 1 tahun/detik, Tour | – | Satu sesi ±1,5 jam. Rekam di 1080×1920 dengan jendela browser potret | Belum |
| 0 | Gambar OG, README dengan GIF, repo publik | GitHub | OG dan README dengan logo sudah jadi. GIF dan push repo belum | Sebagian |
| 1 | **Klip peluncuran** (Bumi siang→malam) + caption "planet-planet ini ada di posisi aslinya hari ini" | Video ×3, Threads | Satu-satunya CTA: buka tautan | Belum |
| 1 | **Post LinkedIn cerita**: kenapa membuat Heliora, satu hal yang dipelajari | LinkedIn | Draf di `CONTENT-DRAFTS.md` | Belum |
| 2 | Klip Saturnus + thread Threads "3 detail kecil yang membuat planet 3D terasa nyata" | Video, Threads | Visual, bukan kode | Belum |
| 2 | **Showcase Discourse three.js** + **tulisan teknis #1**: menghitung posisi planet dari elemen JPL di browser | Discourse, LinkedIn | Buka dengan GIF, tutup dengan tautan demo dan repo | Belum |
| 3 | **Momen solstis 21 Des**: klip Bumi dengan kutub selatan menghadap Matahari, caption "hari ini siang terpanjang di belahan selatan" | Semua kanal | Diverifikasi di Heliora (kemiringan sumbu asli) | Belum |
| 3 | Email ke Solar System Scope (terima kasih + tautan) | Email | `OUTREACH-EMAILS.md` | Belum |
| 4 | **r/threejs + Show HN** (hari berbeda, Selasa–Kamis pagi waktu AS) | Reddit, HN | Siapkan diri untuk menjawab komentar | Belum |
| 4 | Klip overview time-lapse + **rangkuman "1 bulan Heliora: angka dan pelajaran"** | Semua kanal, LinkedIn | Angka asli dari Vercel Analytics, apa pun hasilnya | Belum |
| Cadangan | 20% slot kosong untuk momen tak terduga (komentar viral, permintaan fitur) | – | – | – |

**Ketergantungan:** deploy → semua. Logo → OG + README → Discourse/HN/Reddit (preview tautan harus rapi). Analytics → rangkuman minggu 4.

## 6. Aset yang dibutuhkan
| Aset | Isi | Prioritas | Kapan |
|---|---|---|---|
| Situs live + OG 1200×630 | Logo + Bumi di terminator | Wajib | Minggu 0 |
| 4 klip 9:16 | Lihat kalender | Wajib | Minggu 0 |
| GIF 8 detik untuk README dan Discourse | Fly-to Saturnus | Wajib | Minggu 0 |
| README publik | Logo, demo, fitur, how it works, kredit | Wajib | Minggu 0 |
| Post LinkedIn cerita | `CONTENT-DRAFTS.md` | Wajib | Minggu 1 |
| Tulisan teknis #1 | `CONTENT-DRAFTS.md` (kerangka) | Wajib | Minggu 2 |
| Post Discourse, Reddit, Show HN | `CONTENT-DRAFTS.md` | Wajib | Minggu 2–4 |
| Teaser 30 detik horizontal | Untuk LinkedIn dan README | Opsional | Minggu 1 |
| Email outreach | `OUTREACH-EMAILS.md` | Opsional | Minggu 3 |

## 7. Metrik
| KPI | Jenis | Sumber | Frekuensi |
|---|---|---|---|
| Pengunjung unik demo per minggu | Utama (north star) | Vercel Analytics | Mingguan |
| Jumlah referrer berbeda | Utama untuk kampanye ini | Vercel Analytics | Mingguan |
| Completion rate klip (rata-rata) | Sekunder | Insight TikTok, Instagram, YouTube | Mingguan |
| Bintang GitHub | Sekunder | GitHub | Mingguan |
| Kunjungan profil LinkedIn | Sekunder | LinkedIn analytics | Mingguan |
| DM, tawaran, undangan | Hasil akhir | Catatan manual | Mingguan |

## 8. Anggaran
Rp0. Semua alat gratis: Vercel Hobby, Search Console, CapCut, perekam layar bawaan OS. Tidak ada cadangan biaya. Waktu adalah anggarannya: ±16 jam selama 4 minggu.

## 9. Risiko dan mitigasi
| Risiko | Mitigasi |
|---|---|
| Klip pertama sepi | Normal untuk akun baru. Nilai setelah 4 klip, jangan ganti strategi di minggu pertama |
| Kritik akurasi atau skala ("jaraknya salah") | Jawab terbuka: arah dan tanggal asli, jarak dikompresi supaya planet terlihat. Tautkan sumber JPL. Ini *pratfall effect*: kekurangan yang diakui menambah kepercayaan |
| Show HN tenggelam | Wajar. Jangan posting ulang, cukup sekali. Nilai kampanye dari total referrer, bukan dari satu tempat |
| Demo berat di HP lama | Sebut "paling bagus di laptop" di caption. Catat keluhan sebagai bahan perbaikan performa |
| Waktu habis untuk editing | Rekam langsung dari Tour dan time-lapse, edit minimal (potong + teks) |

## 10. Langkah berikutnya
1. Pilih konsep logo, lalu kit, OG dan README dibuat.
2. Deploy, aktifkan Analytics, daftarkan Search Console. *(Kamu.)*
3. Push repo publik. *(Kamu, setelah README siap.)*
4. Sesi rekam batch 4 klip.
5. Mulai minggu 1. Laporan pertama Jumat setelah minggu 1 dengan [template](REPORT-TEMPLATE.md).

**Psikologi yang dipakai secara jujur:** *activation energy* (satu tautan, tanpa akun), *peak-end rule* (klip berakhir di momen terindah), *mere exposure* (warna dan tanda brand yang sama di setiap klip), *pratfall effect* (akui batasan skala), *curse of knowledge* (post teknis dibuka dengan visual dan satu kalimat awam), *theory of constraints* (fokus distribusi, bukan menambah fitur). Tanpa angka palsu, tanpa urgensi buatan.
