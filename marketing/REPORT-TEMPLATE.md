# Template laporan performa Heliora

Disusun dengan `marketing:performance-report`. **Belum ada data** karena situs belum live, jadi file ini berisi definisi metrik, cara membuat baseline, dan template yang tinggal diisi. Laporan performa lengkap pertama dibuat setelah 4 minggu data.

## Sumber data
| Sumber | Metrik | Cara ambil |
|---|---|---|
| Vercel Analytics | Pengunjung unik, page views, referrer, negara, perangkat | Dashboard proyek → Analytics. Bisa diekspor |
| Google Search Console | Impresi, klik, CTR, posisi rata-rata, query | Performance → Search results |
| TikTok / Instagram / YouTube | Views, rata-rata durasi tonton, completion, klik profil | Insight per video |
| Threads | Views, balasan, repost | Insight per post |
| LinkedIn | Impresi post, kunjungan profil | Analytics post dan profil |
| GitHub | Bintang, fork, trafik repo (14 hari) | Insights → Traffic |
| Catatan manual | DM, tawaran kerja, undangan | Tabel di laporan |

## Definisi
| Metrik | Definisi | Kenapa penting |
|---|---|---|
| Pengunjung unik demo / minggu | Pengunjung unik Vercel Analytics, Senin–Minggu | North star: apakah orang benar-benar membuka karyamu |
| Referrer berbeda | Jumlah domain asal dengan ≥ 5 kunjungan dalam seminggu | Diversifikasi kanal |
| Completion rate klip | Views yang selesai ÷ total views | Kualitas hook dan durasi |
| CTR pencarian | Klik ÷ impresi (Search Console) | Kualitas judul dan deskripsi |
| Returning visitors | Pengunjung yang kembali | Apakah momen langit membawa orang kembali |
| Hasil akhir | DM relevan, tawaran, undangan | Tujuan sebenarnya |

**Aturan jujur:** jangan menyimpulkan dari satu post. Metrik dengan kurang dari 50 kunjungan per minggu ditandai "terlalu sedikit untuk disimpulkan". Bandingkan minggu dengan minggu, bukan hari dengan hari.

## Cara membuat baseline (setelah 4 minggu)
1. Hitung rata-rata 4 minggu untuk setiap metrik di atas. Itu baseline.
2. Tandai minggu dengan lonjakan (Show HN, momen langit) dan hitung baseline kedua tanpa minggu itu. Yang kedua adalah baseline "normal".
3. Target kuartal berikutnya: baseline normal × kenaikan yang wajar (pilih sendiri setelah melihat datanya), ditulis sebagai rentang, bukan angka tunggal.

## Template mingguan (salin setiap Jumat)

```
Minggu ke-__ (tanggal __ – __)

| Metrik                         | Minggu ini | Minggu lalu | Perubahan | Status |
|--------------------------------|-----------|-------------|-----------|--------|
| Pengunjung unik demo           |           |             |           |        |
| Referrer berbeda (≥5 kunjungan)|           |             |           |        |
| Referrer teratas               |           |             |           |        |
| Klip terbaik (views / completion)|         |             |           |        |
| Impresi Search Console         |           |             |           |        |
| Bintang GitHub (total)         |           |             |           |        |
| Kunjungan profil LinkedIn      |           |             |           |        |
| DM / tawaran / undangan        |           |             |           |        |

Berhasil (dengan angka):
Perlu perbaikan (dengan angka):
Dugaan penyebab:
Coba minggu depan (satu hal):
Usulan baris Learnings untuk .agents/product-marketing.md (kalau ada pola ≥2 minggu):
```

## Template bulanan / 4 minggu
1. Ringkasan (3–5 kalimat): metrik utama dan arahnya, satu kemenangan, satu kekhawatiran.
2. Tabel metrik vs. bulan lalu (dan vs. baseline setelah ada).
3. Per kanal: apa yang berhasil dan apa yang tidak, dengan dugaan penyebab.
4. Rekomendasi di matriks dampak × usaha:

| | Usaha rendah | Usaha tinggi |
|---|---|---|
| **Dampak tinggi** | Kerjakan dulu | Rencanakan bulan depan |
| **Dampak rendah** | Kalau sempat | Tunda |

5. Tiga prioritas bulan depan dan satu eksperimen (dengan kriteria berhenti).
