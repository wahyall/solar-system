# Heliora: rencana marketing v1

| | |
|---|---|
| **Produk** | Heliora, tata surya 3D live di browser (`heliora.vercel.app`, belum di-deploy) |
| **Tujuan** | Portofolio dan reputasi: dilihat recruiter, klien, dan komunitas dev/3D |
| **Anggaran** | Rp0, dikerjakan sendiri, 3–5 jam per minggu |
| **Kanal** | Threads, LinkedIn, TikTok / Instagram Reels / YouTube Shorts, plus komunitas dev (repo publik) |
| **Disusun dengan** | `marketing-plan` (13 bagian, AARRR), `marketing-ideas`, `marketing-loops`, `marketing-psychology`, `marketing:campaign-plan`, `marketing:performance-report`, `product-marketing`, `search-first` |
| **Dokumen terkait** | [Konteks produk](../.agents/product-marketing.md) · [Kampanye First Light](CAMPAIGN.md) · [Audit SEO](SEO-AUDIT.md) · [Competitive brief](COMPETITIVE-BRIEF.md) · [Draf konten](CONTENT-DRAFTS.md) · [Email outreach](OUTREACH-EMAILS.md) · [Kemitraan dan komunitas](PARTNERSHIPS.md) · [Review dewan](COUNCIL-REVIEW.md) · [Template laporan](REPORT-TEMPLATE.md) · [Brand review](BRAND-REVIEW.md) |
| **Status** | Draf untuk direview per bagian (lihat catatan di akhir) |

---

## 1. Ringkasan (bisa dibaca dalam 60 detik)

Heliora menjual satu momen: **membuka tautan dan melihat tata surya yang asli, hari ini, dalam 5 detik, dengan render sinematik, bahkan di HP.** Semua planet ada di posisi sebenarnya (data NASA JPL). Modelnya cukup akurat sampai tanggal oposisi Jupiter (11 Feb 2027) dan Mars (19 Feb 2027) cocok dengan almanak. Itu bukti yang bisa ditunjukkan, bukan diklaim.

**Tiga taruhan**
1. **Satu klip pendek per minggu** (15–25 detik, direkam langsung dari mode Tour dan Explore), dipasang di Shorts, Reels, TikTok dan Threads. Satu rekaman untuk empat tempat.
2. **Kalender momen langit.** Solstis 21 Des 2026, perihelion Bumi ±4 Jan 2027, oposisi Jupiter 11 Feb dan Mars 19 Feb 2027. Setiap momen memberi alasan alami untuk posting, dan Heliora bisa memperlihatkan geometrinya secara nyata.
3. **Repo publik + satu tulisan teknis per dua minggu** di LinkedIn dan komunitas three.js. Di sinilah recruiter teknis dan dev melihat cara berpikir, dan dari sini backlink pertama datang.

**Prioritas 90 hari:** deploy dan analytics (minggu 1), kampanye peluncuran "First Light" (minggu 2–5), lalu momen oposisi Februari sebagai puncak kedua (minggu 12).

**Hasil 12 bulan yang realistis:** 40+ klip, 15+ tulisan teknis, satu repo dengan README yang dirujuk komunitas, cerita peluncuran untuk CV, dan angka kunjungan nyata dari Vercel Analytics serta Search Console. Target angka sengaja tidak dipasang sebelum ada data 4 minggu (§13).

---

## 2. Kerangka strategis

**Heliora dalam satu kalimat:** tata surya 3D live di browser yang memperlihatkan di mana setiap planet berada saat ini.

**Kategori yang diklaim:** bukan "simulator" (itu milik NASA Eyes dan Solar System Scope), tapi **"langit hari ini, dalam 3D"**. Sudut ini tidak dimiliki pesaing mana pun (lihat [competitive brief](COMPETITIVE-BRIEF.md)).

**Untuk siapa**
| Audiens | Pekerjaan yang dibereskan Heliora |
|---|---|
| Recruiter, klien, studio (tujuan utama) | "Tunjukkan bahwa orang ini bisa membuat 3D real-time yang rapi" |
| Dev kreatif / komunitas three.js | "Tunjukkan teknik yang lebih dari bola bertekstur yang berputar" |
| Publik yang penasaran langit | "Di mana planet-planet sekarang? Itu Venus?" |

**Dua bingkai, satu produk** (hasil [review dewan](COUNCIL-REVIEW.md)):
- Publik dan video: *"See where every planet is right now, in 3D."*
- LinkedIn, README, recruiter: *"Real-time graphics, real data, shipped."*

Ukuran keberhasilan utama mengikuti audiens yang bisa mempekerjakan atau merekomendasikan: DM, tawaran, bintang repo. Publik dilayani lewat momen langit.

**Logika bisnis:** gratis, tanpa akun, tanpa iklan. Imbal baliknya reputasi: DM, tawaran kerja, dan koneksi. Karena itu "konversi" di rencana ini berarti **membuka demo**, dan untuk dev, **memberi bintang repo**.

**Gerbang kualitas pasar (ukuran × frekuensi masalah)**
| | Frekuensi rendah | Frekuensi tinggi |
|---|---|---|
| **Masalah besar** | | |
| **Masalah kecil** | **Heliora di sini.** Rasa penasaran soal planet muncul sesekali, terutama saat ada momen langit | |

Konsekuensinya: Heliora tidak akan jadi kebiasaan harian, dan itu tidak apa-apa untuk proyek portofolio. Rencana ini menunggangi **lonjakan momen** (kalender langit) dan menjadikan **repo serta tulisan** sebagai aset yang terus menghasilkan. Yang sengaja tidak dicoba: retensi harian, notifikasi, dan komunitas pengguna sendiri.

**Suara brand (tidak bisa ditawar):** tenang, presisi, hangat, crafted. Tunjukkan dulu, baru jelaskan. Selalu jujur soal batasan: jarak dikompresi, rentang 1800–2050. Jangan pakai: "revolutionary", "next-level", "to scale", "akurat sampai detik". Detail di [konteks produk](../.agents/product-marketing.md).

---

## 3. Kondisi sekarang (dinilai dari materi yang ada)

**Tim:** satu orang (kamu): developer, desainer, marketer, dan penerbit. Profil T-shaped: dalam di grafis web, lebar di produk.

**Anggaran:** Rp0/bulan. Biaya alat: Vercel Hobby (gratis), Google Search Console (gratis), Vercel Analytics (gratis di Hobby).

**Fase:** pra-peluncuran, belum ada pengguna. Fase pertumbuhan SaaS tidak berlaku. Yang setara adalah tahap "0 → orang pertama tahu".

**Sudah ada (dan patut diakui)**
| Aset | Status | Nilai marketing |
|---|---|---|
| Aplikasi live 3D dengan posisi JPL, mode Tour dan Explore, kontrol waktu | Jadi, terverifikasi di 360/768/1440 px | Inti semua konten. Fitur Tour dan time-lapse adalah alat produksi video |
| SEO teknis (judul, deskripsi, OG, JSON-LD, robots, sitemap) | Terpasang | Siap diindeks begitu deploy |
| Konteks produk, competitive brief, audit SEO, teardown pesaing | Ditulis | Fondasi semua draf |
| Atribusi lisensi (Solar System Scope, JPL) | Terpasang di UI | Syarat lisensi, sekaligus pintu kemitraan |
| Proyek sebelumnya: Lumiroom | Live | Pola brand dan peluncuran yang sudah teruji, juga audiens yang sama |

**Selesai sejak draf pertama:** kit logo "First Light" (`brand/`), ikon web, gambar OG, README dengan logo.

**Macet**
| Masalah | Biaya kalau dibiarkan | Aksi |
|---|---|---|
| Belum di-deploy | Semua marketing berhenti di sini | Deploy ke Vercel (15 menit, kamu) |
| Node.js crash di mesin ini | Tidak bisa pakai npm, bergantung pada Bun | Perbaiki atau instal ulang Node |
| Repo belum di-push | Tidak ada backlink dev | Push setelah README dan logo jadi (perlu persetujuanmu) |

**Skor rubrik 17 bagian** (0–5, dinilai dari materi)
| # | Bagian | Skor | Catatan |
|---|---|---|---|
| 1 | Positioning | 4 | Jelas dan khas. Tinggal diuji di depan orang |
| 2 | Riset pelanggan | 1 | Belum ada pengguna. Bahasa pelanggan masih dugaan |
| 3 | Beranda | 4 | Aplikasinya adalah berandanya. Momen "wah" cepat |
| 4 | Halaman produk | N/A | Satu halaman |
| 5 | Halaman konversi | 1 | Belum ada tautan per momen (`?date=`) |
| 6 | Perbandingan pesaing | 2 | Ada di dokumen internal, belum di publik (sengaja) |
| 7 | Konten | 1 | Belum ada tulisan atau klip |
| 8 | Onboarding | 3 | Tanpa akun, scroll hint, label. Belum diuji ke pengguna |
| 9 | Email lifecycle | 0 | Sengaja tidak ada. Email hanya untuk outreach manual |
| 10 | Materi "sales" | 1 | Portofolio: belum ada one-pager atau case study |
| 11 | Pesan | 4 | Suara terdokumentasi |
| 12 | Harga | N/A | Gratis |
| 13 | CRO | 0 | Belum ada data |
| 14 | Peluncuran | 1 | Belum diluncurkan. Pola Lumiroom bisa dipakai ulang |
| 15 | Iklan | 0 | Rp0, sengaja |
| 16 | SEO | 1 | Fondasi teknis lengkap, domain baru |
| 17 | Internasional | 2 | Bahasa Inggris (global). Konten bisa dwibahasa |
| | **Total** | **25 / 75** (dua N/A) | |

**Bentuknya:** "produk kuat, distribusi nol". Hambatannya bukan kualitas, tapi **jumlah orang yang tahu Heliora ada** (theory of constraints). Semua waktu 90 hari pertama diarahkan ke distribusi.

---

## 4. Akuisisi: orang asing menjadi tahu

| Kanal | Status | Langkah 90 hari | Langkah 12 bulan | Skill / alat |
|---|---|---|---|---|
| Short-form video (TikTok, Reels, Shorts) | Rencana | 1 klip/minggu dari Tour dan Explore | Seri "langit bulan ini" | `video`, `social`, alat rekam layar |
| Threads | Rencana | Klip + 1 thread visual/minggu | Konsisten, ikut momen langit | `social`, `marketing:draft-content` |
| LinkedIn | Rencana | Post peluncuran + 1 tulisan teknis/2 minggu | Seri "how it's built" | `linkedin-post-writer` (+ humanizer) |
| Komunitas dev (Discourse three.js, r/threejs, Show HN) | Rencana | Satu post showcase per tempat, mematuhi aturan masing-masing | Balas komentar, update besar saja | `community-marketing` |
| SEO | Fondasi terpasang | Deploy, Search Console, sitemap | Optimasi judul dari query asli setelah 4 minggu | `marketing:seo-audit` |
| GitHub | Rencana | Repo publik, topik, README rapi | Release notes per fitur | `andino-git-skills` |
| Momen langit | Rencana | Solstis, perihelion, oposisi Feb | Kalender tahunan | Loop B (§6 di bawah) |
| Kemitraan dan kreator | Rencana | Email ke Solar System Scope, 3–5 kreator sains | Kolaborasi kalau ada respons | `co-marketing`, `influencer-marketing` |
| Iklan berbayar | Dilewati | – | Hanya kalau ada anggaran | – |

**Mekanisme dan indikator** (tidak ada langkah "posting lalu berharap"):
- Klip → indikator: completion rate dan klik ke bio. Batalkan format kalau 4 klip berturut-turut di bawah median akun.
- Komunitas → indikator: referrer dari discourse.threejs.org, reddit.com dan news.ycombinator.com di Vercel Analytics.
- SEO → indikator: impresi Search Console untuk "planets right now" dan kata sejenisnya.

---

## 5. Aktivasi: pengunjung mendapat momen bernilai

**Definisi aktivasi:** pengunjung melihat planet bergerak atau terbang ke satu planet dalam 30 detik pertama.

| Langkah | Status | Perbaikan |
|---|---|---|
| Halaman terbuka dengan konfigurasi hari ini, indikator Live | Ada | – |
| Scroll hint dan tab Tour/Explore | Ada | Uji ke 3 orang awam: apakah mereka menemukan Explore tanpa diberi tahu? |
| Loading screen dengan persentase | Ada | Kurangi muatan awal: tekstur WebP, code-split (lihat audit SEO) |
| HP | Ada, diuji di 360/375 px | Caption menyebut "paling bagus di laptop" untuk HP lama |
| Tautan per tanggal `?date=YYYY-MM-DD` | **Belum** | Fitur kecil berdampak besar: setiap momen langit punya tautan sendiri |

**Psikologi:** *activation energy* (tanpa akun, langsung jalan), *peak-end rule* (Tour berakhir di Neptunus, momen akhirnya harus indah), *curse of knowledge* (uji dengan orang non-teknis).

---

## 6. Retensi: orang kembali

Heliora bukan produk harian (lihat §2). Retensi dirancang sebagai **"kembali saat ada momen"**, bukan kebiasaan.
- Pengikut sosial adalah daftar retensinya: setiap momen langit, mereka diingatkan lewat klip.
- Tidak ada email lifecycle, push, atau akun. Sengaja, karena tidak sebanding dengan waktu yang ada.
- Indikator: pengunjung kembali (returning visitors) di Vercel Analytics, terutama di hari momen.

**Loop yang dijalankan manual** (format sembilan bagian dari `marketing-loops`; dijalankan sendiri, tidak dijadwalkan otomatis, karena setiap post kamu terbitkan sendiri)

### Loop A: satu rekaman, empat tempat
| Bagian | Isi |
|---|---|
| Cek | Setiap Senin |
| Bertindak jika | Ada klip yang belum dipakai di semua kanal |
| Tujuan | Konsistensi distribusi (mere exposure) |
| Skill | `social`, `marketing:draft-content`, `video` |
| Langkah | 1) Ambil klip dari stok, atau rekam satu (Tour, time-lapse 1 bulan/detik, atau fly-to). 2) Tulis hook ±8 kata + caption per kanal. 3) Posting atau jadwalkan sendiri di 4 kanal |
| Cek sendiri | Bisa dimengerti tanpa suara? Tanggal dan "Live" terlihat? |
| Status | Tabel stok klip (nama file, tanggal rekam, kanal yang sudah dipakai) |
| Berhenti | Minggu sibuk → lewati. Lebih baik bolos seminggu daripada post jelek |
| Output | 4 post, catatan di tabel stok |

### Loop B: kalender momen langit
| Bagian | Isi |
|---|---|
| Cek | Setiap Senin pertama tiap bulan |
| Bertindak jika | Ada momen dalam 30 hari ke depan yang bisa ditampilkan Heliora (solstis, ekuinoks, oposisi, konjungsi, perihelion) |
| Tujuan | Menunggangi lonjakan pencarian dan percakapan |
| Skill | `search-first` (verifikasi tanggal), `marketing:draft-content` |
| Langkah | 1) Cek 2 sumber almanak untuk tanggal. 2) Cek dengan model Heliora (skrip kecil seperti di §1). 3) Siapkan klip dan caption 3 hari sebelumnya. 4) Posting di hari H |
| Cek sendiri | Dua sumber sepakat dan model Heliora cocok. Jangan posting momen yang tidak terlihat di model (misalnya hujan meteor) |
| Status | Daftar momen yang sudah dipakai |
| Berhenti | Tidak ada momen → tidak ada post |
| Output | Draf dan klip momen |

### Loop C: review mingguan
| Bagian | Isi |
|---|---|
| Cek | Setiap Jumat, ±20 menit |
| Bertindak jika | Selalu (ini loop heartbeat) |
| Tujuan | Belajar dari data, bukan perasaan |
| Skill | `marketing:performance-report` |
| Langkah | Isi [template laporan](REPORT-TEMPLATE.md): satu hal yang berhasil, satu yang gagal, satu yang dicoba minggu depan |
| Cek sendiri | Jangan menyimpulkan dari satu post. Lihat pola 3–4 minggu |
| Status | Satu file laporan per minggu |
| Berhenti | Kalau setelah 8 minggu tidak ada yang membaca angkanya, ubah jadi bulanan. Matikan manual kapan saja |
| Output | Laporan mingguan, plus usulan Learnings di konteks produk |

**Sengaja tidak dibuat:** social listening harian, loop iklan, dan loop email.

---

## 7. Referral: pengguna membawa pengguna

| Mekanisme | Status | Rencana |
|---|---|---|
| Tautan per tanggal yang bisa dibagikan | Belum | Bulan 1: `?date=` + tombol "Copy link to this date". Setiap tautan adalah undangan |
| Screenshot bertanda Heliora | Belum | Bulan 2: tombol tangkap layar dengan wordmark kecil di sudut. Setiap gambar yang dibagikan membawa nama Heliora |
| Bintang dan fork GitHub | Belum | Repo publik dengan README yang mengundang kontribusi kecil |
| Atribusi balik | Ada | Kredit Solar System Scope dan JPL. Peluang disebut di showcase mereka |

**Psikologi:** *IKEA effect* (orang membagikan tanggal pilihannya sendiri, misalnya hari lahir: "beginilah tata surya saat aku lahir"), *reciprocity* (kode terbuka).

Ide "tata surya di hari lahirmu" bisa menjadi kampanye bulan 2 sekaligus loop berbagi alami (dibatasi 1800–2050).

---

## 8. Pendapatan

Tidak ada pendapatan langsung, dan memang begitu rencananya. "Pendapatan" Heliora adalah **peluang**: tawaran kerja, proyek klien, undangan bicara. Dicatat manual di laporan mingguan. Yang sengaja tidak dilakukan: donasi, sponsor, versi berbayar. Ini bisa ditinjau ulang kalau dalam 6 bulan ada permintaan nyata, misalnya sekolah meminta versi khusus.

---

## 9. Roadmap 90 hari

| Minggu | Fase | Aksi | AARRR | Pemilik |
|---|---|---|---|---|
| 1 | Membuka hambatan | Pilih logo → kit, OG, README. Deploy ke Vercel, Search Console, Analytics. Push repo publik | Akuisisi | Kamu (+ asisten untuk kit dan README) |
| 1 | Membuka hambatan | Rekam 4 klip sekaligus: Bumi siang→malam, Saturnus + bayangan cincin, overview time-lapse 1 tahun/detik, Tour | Akuisisi | Kamu |
| 2 | Fondasi | **First Light** minggu 1: klip peluncuran + post LinkedIn cerita + Threads | Akuisisi | Kamu |
| 3 | Fondasi | First Light minggu 2: showcase Discourse three.js + tulisan teknis #1 (posisi JPL) | Akuisisi, Referral | Kamu |
| 4 | Fondasi | First Light minggu 3: momen solstis 21 Des + email ke Solar System Scope | Akuisisi | Kamu |
| 5 | Fondasi | First Light minggu 4: r/threejs + Show HN + rangkuman "1 bulan Heliora" | Akuisisi | Kamu |
| 6–8 | Kecepatan | Loop A/B/C jalan. Perihelion ±4 Jan. Tulisan teknis #2 (shader Bumi). Fitur `?date=` | Akuisisi, Referral | Kamu |
| 9–12 | Gabungan | Kampanye "tata surya di hari lahirmu". Oposisi Jupiter 11 Feb dan Mars 19 Feb sebagai puncak kedua. Laporan performa 4 minggu pertama dibandingkan baseline | Referral, Akuisisi | Kamu |

Detail minggu 2–5 ada di [CAMPAIGN.md](CAMPAIGN.md).

---

## 10. Gambaran 12 bulan

| Kuartal | Fokus | Tonggak |
|---|---|---|
| Q1 (Des–Feb) | Peluncuran + oposisi | Live, 12 klip, 4 tulisan, showcase komunitas, baseline data |
| Q2 (Mar–Mei) | Konsistensi | Ekuinoks Maret. Screenshot bertanda. Review judul SEO dari data Search Console |
| Q3 (Jun–Agu) | Kedalaman | Solstis Juni. Satu fitur baru yang layak diberitakan (misalnya bulan-bulan Jupiter atau komet) |
| Q4 (Sep–Nov) | Refleksi | Ekuinoks September. "Heliora: 1 tahun" dengan angka asli. Studi kasus untuk portofolio |

**Pembuka kapabilitas (pengganti "tahap pendanaan")**
| Pemicu | Yang terbuka |
|---|---|
| Kerja penuh waktu atau klien baru (waktu berkurang) | Turun ke loop A saja, tanpa tulisan teknis |
| Ada anggaran kecil (≥ Rp500rb/bulan) | Uji boost post terbaik di Instagram/TikTok selama 1 minggu |
| Permintaan dari sekolah/komunitas | Versi bahasa Indonesia, mode kelas |

**Alokasi 70/20/10:** 70% klip + momen (yang sudah jelas), 20% tulisan teknis + komunitas, 10% eksperimen (hari lahir, kolaborasi kreator).

---

## 11. Tumpukan operasi marketing

| Tahap | Skill | Alat (gratis) |
|---|---|---|
| Lintas tahap | `product-marketing`, `marketing:brand-review`, `logo-design` | – |
| Akuisisi | `social`, `video`, `linkedin-post-writer`, `community-marketing`, `marketing:seo-audit`, `co-marketing`, `influencer-marketing` | Perekam layar, CapCut, Search Console |
| Aktivasi | `cro` (setelah ada data), `onboarding` | Vercel Analytics |
| Retensi | `marketing-loops` (loop A/B/C) | Catatan tabel |
| Referral | `referrals` (untuk ide berbagi) | – |
| Pengukuran | `marketing:performance-report` | Vercel Analytics, Search Console, insight platform |
| Riset | `search-first`, `reverse-engineer-marketing`, `marketing:competitive-brief` | Wayback Machine |

Tidak ada MCP atau akun yang perlu dihubungkan. Semua publikasi dilakukan manual olehmu.

---

## 12. Bank ide (139 ide dari `marketing-ideas`)

**Legenda:** **Sekarang** = 90 hari pertama · **Q2** · **Q3+** · **Lewati** (dengan alasan)

| # | Ide | AARRR | Status | Alasan |
|---|---|---|---|---|
| 1 | Easy keyword ranking | Akuisisi | **Sekarang** | "planets right now 3d", "live solar system 3d" (lihat audit SEO) |
| 2 | SEO audit | Akuisisi | **Selesai** | `SEO-AUDIT.md` |
| 3 | Glossary | Akuisisi | Lewati | Satu halaman, bukan situs konten |
| 4 | Programmatic SEO | Akuisisi | Q3+ | Mungkin lewat halaman per tanggal, kalau `?date=` bisa diindeks. Butuh SSR, jadi dievaluasi nanti |
| 5 | Content repurposing | Akuisisi | **Sekarang** | Loop A |
| 6 | Proprietary data content | Akuisisi | **Sekarang** | "Model kami cocok dengan almanak untuk oposisi Jupiter dan Mars" |
| 7 | Internal linking | Akuisisi | Lewati | Satu halaman |
| 8 | Content refreshing | Akuisisi | Q2 | README dan tulisan diperbarui per fitur |
| 9 | Knowledge base SEO | Akuisisi | Lewati | – |
| 10 | Parasite SEO | Akuisisi | **Sekarang** | Tulisan teknis di LinkedIn (dan dev.to kalau ada waktu) menautkan ke demo |
| 11 | Comparison pages | Akuisisi | Lewati | Melawan NASA tidak cocok dengan suara brand. Jawab di komentar saja |
| 12 | Marketing jiu-jitsu | Akuisisi | **Sekarang** | Ubah "jaraknya tidak sesuai skala" jadi cerita desain |
| 13 | Competitive ad research | – | Lewati | Pesaing tidak beriklan (pixel tidak ditemukan) |
| 14 | Side projects as marketing | Akuisisi | **Sekarang** | Heliora sendiri adalah side project untuk portofolio |
| 15 | Engineering as marketing | Referral | Q2 | Screenshot bertanda dan tautan per tanggal |
| 16 | Importers | – | Lewati | – |
| 17 | Quiz | Akuisisi | Q3+ | "Tebak planet mana yang paling dekat hari ini" sebagai klip interaktif |
| 18 | Calculator | Akuisisi | Q3+ | "Berapa lama cahaya Matahari ke planet X" sudah ada sebagai readout |
| 19 | Chrome extension | – | Lewati | – |
| 20 | Microsites | – | Lewati | – |
| 21 | Scanners | – | Lewati | – |
| 22 | Public APIs | – | Lewati | `orbits.ts` terbuka di repo, cukup |
| 23–34 | Iklan berbayar (podcast, pre-targeting, Facebook, Instagram, Twitter, LinkedIn, Reddit, Quora, Google, YouTube, retargeting, messenger) | Akuisisi | Lewati | Rp0. Tinjau ulang di §10 kalau ada anggaran |
| 35 | Community marketing | Akuisisi | **Sekarang** | Lihat `PARTNERSHIPS.md` |
| 36 | Quora marketing | Akuisisi | Q3+ | Jawab "where are the planets now" dengan jujur, kalau ada waktu |
| 37 | Reddit keyword research | Riset | **Sekarang** | Kumpulkan bahasa asli dari r/space dan r/astronomy |
| 38 | Reddit marketing | Akuisisi | **Sekarang** | Satu post showcase di r/threejs. r/space hanya di momen langit, patuhi aturan |
| 39 | LinkedIn audience | Akuisisi | **Sekarang** | Kanal recruiter |
| 40 | Instagram audience | Akuisisi | **Sekarang** | Reels (bagian dari Loop A) |
| 41 | X audience | Akuisisi | Lewati | Tidak di daftar kanalmu. Threads menggantikannya |
| 42 | Short-form video | Akuisisi | **Sekarang** | Aset terkuat |
| 43 | Engagement pods | – | Lewati | Tidak jujur |
| 44 | Comment marketing | Akuisisi | **Sekarang** | Komentar bermakna di post three.js dan astronomi, 10 menit/hari kalau sempat |
| 45–53 | Email (mistake, reactivation, founder welcome, capture, newsletter, inbox, onboarding, win-back, trial) | Retensi | Lewati | Tidak ada daftar email. Email hanya untuk outreach manual (`OUTREACH-EMAILS.md`) |
| 54 | Affiliate discovery via backlinks | Referral | Q2 | Cari situs yang menautkan ke Solar System Scope textures (pengguna tekstur yang sama) |
| 55 | Influencer whitelisting | – | Lewati | Butuh anggaran iklan |
| 56 | Reseller | – | Lewati | – |
| 57 | Expert networks | – | Lewati | – |
| 58 | Newsletter swaps | Akuisisi | Q2 | Kirim ke newsletter three.js/creative coding (submission gratis) |
| 59 | Article quotes | Akuisisi | Q3+ | Tanggapi jurnalis sains di momen besar |
| 60 | Pixel sharing | – | Lewati | – |
| 61 | Shared Slack | – | Lewati | – |
| 62 | Affiliate program | – | Lewati | – |
| 63 | Integration marketing | – | Lewati | – |
| 64 | Community sponsorship | – | Lewati | Rp0 |
| 65 | Live webinars | – | Lewati | – |
| 66 | Virtual summits | – | Lewati | – |
| 67 | Roadshows | – | Lewati | – |
| 68 | Local meetups | Akuisisi | Q3+ | Demo singkat di meetup dev atau klub astronomi lokal |
| 69 | Meetup sponsorship | – | Lewati | – |
| 70 | Conference speaking | Akuisisi | Q3+ | Talk "real orbits in the browser" di meetup/konferensi web |
| 71–72 | Konferensi sendiri / sponsor | – | Lewati | – |
| 73 | Media acquisitions | – | Lewati | – |
| 74 | Press coverage | Akuisisi | Q2 | Pitch ke media teknologi lokal di momen oposisi Februari |
| 75 | Fundraising PR | – | Lewati | – |
| 76 | Documentaries | – | Lewati | – |
| 77 | Black Friday | – | Lewati | Tidak ada yang dijual |
| 78 | Product Hunt | Akuisisi | Q2 | Setelah 8+ klip ada sebagai bahan, dan satu fitur berbagi sudah jadi |
| 79 | Early-access referrals | – | Lewati | – |
| 80 | New Year promotions | Akuisisi | **Sekarang** | Klip "tata surya di malam tahun baru 2027" |
| 81 | Early access pricing | – | Lewati | – |
| 82 | Alternatif Product Hunt (direktori) | Akuisisi | Q2 | Showcase three.js, galeri WebGL, direktori open source |
| 83–85 | Giveaways | – | Lewati | Tidak ada hadiah |
| 86 | Lifetime deals | – | Lewati | – |
| 87 | Powered-by | Referral | Q2 | Wordmark kecil di screenshot |
| 88–89 | Free migrations, contract buyouts | – | Lewati | – |
| 90 | One-click registration | Aktivasi | **Sudah** | Tanpa registrasi sama sekali |
| 91 | In-app upsells | – | Lewati | – |
| 92 | Newsletter referrals | – | Lewati | – |
| 93 | Viral loops | Referral | Q2 | Tautan per tanggal + "di hari lahirmu" |
| 94–95 | Offboarding, concierge | – | Lewati | – |
| 96 | Onboarding optimization | Aktivasi | Q2 | Setelah uji ke 3 orang awam (§5) |
| 97 | Playlists | – | Lewati | – |
| 98 | Templates | – | Lewati | – |
| 99 | Graphic novel | – | Lewati | – |
| 100 | Promo video | Akuisisi | **Sekarang** | Teaser 30 detik dari Tour, dipakai di README dan LinkedIn |
| 101 | Industry interviews | – | Lewati | – |
| 102 | Social screenshots | Referral | Q2 | Sama dengan screenshot bertanda |
| 103–105 | Course, buku, laporan tahunan | – | Lewati | – |
| 106 | Year wraps | Akuisisi | Q3+ | "Perjalanan Bumi tahun 2027" sebagai klip akhir tahun |
| 107 | Podcast | – | Lewati | – |
| 108 | Changelogs | Retensi | Q2 | Release notes GitHub per fitur |
| 109 | Public demos | Akuisisi | **Sekarang** | Demo adalah produknya |
| 110 | Awards | – | Lewati | – |
| 111 | Challenges | Referral | Q2 | "Tunjukkan tata surya di hari lahirmu" |
| 112–113 | Reality TV, controversy | – | Lewati | Bertentangan dengan suara brand |
| 114 | Moneyball | Riset | Q2 | Cari kreator sains kecil dengan engagement tinggi (lihat `PARTNERSHIPS.md`) |
| 115 | Curation | Akuisisi | Q3+ | Daftar sumber data dan tekstur terbuka di README |
| 116 | Grants | – | Lewati | – |
| 117 | Product competitions | – | Lewati | – |
| 118 | Cameo | – | Lewati | – |
| 119 | OOH | – | Lewati | – |
| 120 | Marketing stunts | – | Lewati | – |
| 121 | Guerrilla marketing | Akuisisi | Q3+ | QR ke Heliora di poster acara astronomi komunitas, dengan izin penyelenggara |
| 122 | Humor | – | Lewati | Bukan suara brand |
| 123 | Open source as marketing | Akuisisi | **Sekarang** | Repo publik |
| 124–125 | ASO, app marketplaces | – | Lewati | Tidak ada aplikasi toko |
| 126 | YouTube reviews | Akuisisi | Q2 | Kreator sains dan creative coding (`PARTNERSHIPS.md`) |
| 127 | YouTube channel | Akuisisi | **Sekarang** | Shorts (bagian dari Loop A) |
| 128–129 | Source platforms, review sites | – | Lewati | Bukan software B2B |
| 130 | Live audio | – | Lewati | – |
| 131 | International expansion | Akuisisi | Q3+ | Versi bahasa Indonesia kalau ada permintaan sekolah |
| 132 | Price localization | – | Lewati | – |
| 133 | Investor marketing | – | Lewati | – |
| 134 | Certifications | – | Lewati | – |
| 135 | Support as marketing | Retensi | **Sekarang** | Balas setiap komentar dan issue GitHub dengan cepat dan ramah |
| 136 | Developer relations | Akuisisi | **Sekarang** | Tulisan teknis + repo |
| 137 | Two-sided referrals | – | Lewati | – |
| 138 | Podcast tours | Akuisisi | Q3+ | Tamu di podcast dev lokal |
| 139 | Customer language | Lintas tahap | **Sekarang** | Kumpulkan kalimat asli dari komentar ke konteks produk |

---

## 13. Pengukuran, RACI, keputusan terbuka

**North star:** pengunjung unik yang membuka demo per minggu (Vercel Analytics).

**Indikator awal per tahap**
| Tahap | Indikator | Sumber |
|---|---|---|
| Akuisisi | Referrer teratas, impresi Search Console, views dan completion klip | Vercel Analytics, Search Console, insight platform |
| Aktivasi | Durasi kunjungan, bounce | Vercel Analytics |
| Retensi | Returning visitors di hari momen | Vercel Analytics |
| Referral | Bintang GitHub, kunjungan dengan `?date=` (setelah fitur ada) | GitHub, Vercel Analytics |
| "Pendapatan" | DM, tawaran kerja, undangan | Catatan manual |

**Baseline:** setelah 4 minggu, rata-rata mingguan setiap metrik menjadi baseline. Target kuartal berikutnya baru ditetapkan setelah itu. Template ada di [REPORT-TEMPLATE.md](REPORT-TEMPLATE.md).

**RACI** (R = mengerjakan, A = memutuskan, C = dikonsultasikan, I = diberi tahu)
| Aktivitas | Kamu | Asisten AI |
|---|---|---|
| Keputusan brand dan logo | A, R | C |
| Deploy, push, publikasi, kirim email | A, R | – |
| Draf konten dan email | A | R |
| Rekam klip | A, R | – |
| Laporan mingguan | A | R (dari angka yang kamu tempel) |

**Keputusan terbuka**
| Keputusan | Pemilik | Dampak |
|---|---|---|
| ~~Pilih konsep logo~~ | Selesai | C · First Light dipilih. Kit, OG, ikon dan README sudah jadi |
| Deploy ke Vercel dengan nama `heliora` | Kamu | Memblokir semua marketing. Domain `heliora.vercel.app` belum dicek tersedia |
| Push repo publik ke GitHub | Kamu | Memblokir kanal komunitas dev |
| Bangun fitur `?date=` | Kamu | Referral dan momen langit jauh lebih kuat |
| Perbaiki Node.js di mesin ini | Kamu | Saat ini bergantung pada Bun |
| Pencarian merek dagang "Heliora" | Kamu | Belum dilakukan. Wajib sebelum penggunaan komersial |

---

### Catatan proses
`marketing-plan` merancang review bagian demi bagian secara interaktif. Karena kamu meminta semua aset disiapkan sekaligus, ke-13 bagian ditulis dalam satu draf. Tandai bagian yang perlu diubah ("§4: ganti X"), lalu saya revisi sebagai v2. Status disimpan di `~/marketing-plans/heliora/progress.md`.
