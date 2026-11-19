# Competitive brief: Heliora

| | |
|---|---|
| **Tanggal riset** | 19 Nov 2026 |
| **Disusun dengan** | `marketing:competitive-brief`, `reverse-engineer-marketing` (mode Quick, lihat `teardowns/solarsystemscope/playbook.md`), `search-first` |
| **Sumber** | [Solar System Scope](https://www.solarsystemscope.com/), [NASA's Eyes](https://science.nasa.gov/eyes/), cuplikan pencarian TheSkyLive (halaman 3D menolak akses otomatis, HTTP 403), arsip Wayback |
| **Batasan** | Tidak ada data trafik, ulasan berbayar, atau tool SEO. Ukuran tim dan trafik pesaing tidak diketahui |

## 1. Ringkasan

Pasar "tata surya 3D di browser" sudah matang dan diisi pemain mapan: NASA's Eyes (akurat, kaya, institusional), Solar System Scope (gratis sejak 2011, dimonetisasi lewat desktop dan mobile), dan TheSkyLive (utilitas data). Tidak ada yang menjadikan **"lihat langit hari ini dalam 5 detik, sinematik, di HP"** sebagai cerita utama.
- **Peluang terbesar:** pengalaman pertama yang paling cepat dan paling indah, ditambah kode terbuka yang bisa dipelajari dev.
- **Ancaman terbesar:** "NASA sudah punya ini". Jawabannya jangan bersaing di kedalaman, tapi di kesan pertama dan keterbukaan.

## 2. Profil pesaing

### NASA's Eyes on the Solar System
- **Posisi:** "Immersive, real-time 3D web-based apps" untuk menjelajahi data NASA. Suite berisi Eyes on the Solar System, Asteroids, Earth, Exoplanets, DSN Now dan lainnya.
- **Audiens:** publik umum ("everyone"), museum, pelajar. Ada versi berbahasa Spanyol.
- **Pesan:** data NASA yang asli, real-time, pesawat ruang angkasa, rentang waktu 1950–2050.
- **Kekuatan:** otoritas NASA, data SPICE, cakupan luas, gratis, tanpa unduhan.
- **Kelemahan (Inferred):** antarmuka padat dan berorientasi misi. Banyak aplikasi terpisah, jadi pengunjung awam harus memilih dulu sebelum melihat sesuatu.
- **Strategi konten:** halaman NASA Science, siaran pers misi, kerja sama museum.

### Solar System Scope
- **Posisi:** "Free online model of Solar System and Night sky", model real-time sejak 2011.
- **Audiens:** penggemar umum dan pelajar (ada "Spacepedia").
- **Produk:** web gratis (perlu desktop dengan WebGL), desktop USD 9,80, mobile gratis dengan pembelian dalam aplikasi, merchandise.
- **Kekuatan:** umur domain, tekstur CC BY 4.0 yang dipakai di mana-mana (loop backlink), pesan stabil 24 bulan.
- **Kelemahan:** versi web tidak untuk HP. Grafis terbaik dikunci di versi desktop berbayar.
- **Strategi konten:** ensiklopedia, teaser video, perpustakaan tekstur.

### TheSkyLive (3D Solar System viewer)
- **Posisi:** utilitas pencarian objek dan plot orbit planet, asteroid dan komet. Ribuan halaman per objek dan tanggal.
- **Kekuatan:** cakupan SEO luas (halaman per tanggal dan objek).
- **Kelemahan (Inferred):** berorientasi data dan berisi iklan, bukan pengalaman visual.

## 3. Matriks pesan

| Dimensi | Heliora | NASA's Eyes | Solar System Scope | TheSkyLive |
|---|---|---|---|---|
| Tagline | "See where every planet is right now, in 3D" | "Immersive, real-time 3D web-based apps" | "Free online model of Solar System and Night sky" | Data objek per tanggal |
| Audiens | Recruiter/klien, dev kreatif, publik penasaran | Publik, museum, pelajar | Penggemar, pelajar | Pengamat langit |
| Pembeda | Live default, sinematik, HP, open source | Otoritas dan kedalaman data NASA | Umur, tekstur, multi-platform | Cakupan data |
| Nada | Tenang, presisi, hangat | Institusional, edukatif | Ramah, ensiklopedis | Teknis |
| Janji | Momen "wah" dalam 5 detik, posisi asli | Jelajahi data NASA yang asli | Model gratis dan akurat | Posisi dan orbit objek apa pun |

**Analisis naratif**
| | Penjahat | Pahlawan | Transformasi |
|---|---|---|---|
| NASA's Eyes | Ketidaktahuan tentang misi | Data NASA | Dari penonton jadi penjelajah |
| Solar System Scope | Buku teks statis | Model | Dari membaca jadi melihat |
| **Heliora** | Model mainan yang palsu dan aplikasi yang berat | Penonton (satu tautan, langit hari ini) | Dari "ruang angkasa membingungkan" jadi "oh, Venus ada di sana sekarang" |

## 4. Celah konten

| Tema | Heliora | NASA's Eyes | SSS | TheSkyLive | Celah? |
|---|---|---|---|---|---|
| "Di mana planet sekarang" sebagai pengalaman visual instan | Ya | Sebagian | Sebagian | Tabel data | **Peluang Heliora** |
| Proses pembuatan dan teknik grafis | Akan ada (tulisan teknis, repo) | Tidak | Tidak | Tidak | **Peluang Heliora** |
| Klip pendek vertikal | Rencana | Sedikit | Teaser | Tidak | Peluang |
| Ensiklopedia planet | Ringkas (panel info) | Ya | Ya | Ya | Bukan pertarungan Heliora |
| Data pesawat ruang angkasa | Tidak | Ya | Tidak | Ya | Lewati |

## 5. Peluang
- **Pemilik sudut "sinematik + live + HP".** Tidak ada pesaing yang membuka langsung pada konfigurasi hari ini dengan render sinematik di HP.
- **Dev sebagai audiens kedua.** Pesaing tidak membuka kode. Repo publik yang rapi menjadi aset reputasi sekaligus sumber backlink.
- **Momen astronomi sebagai kalender konten.** Setiap konjungsi atau oposisi memberi alasan untuk posting, dan Heliora bisa menampilkan geometrinya secara nyata.

## 6. Ancaman
- **"NASA sudah punya ini"**: wajar. Jawab dengan "NASA Eyes untuk kedalaman, Heliora untuk 5 detik pertama".
- **Kritik akurasi dan skala** dari penggemar astronomi. Antisipasi dengan menyebut skala jarak yang dikompresi dan sumber JPL secara terbuka.
- **Banyak demo three.js "solar system"** di GitHub. Pembedanya harus terlihat di 3 detik pertama klip (terminator Bumi, bayangan cincin), bukan di daftar fitur.

## 7. Rekomendasi
1. **Quick win:** pakai tagline "See where every planet is right now, in 3D" secara konsisten di situs, README dan bio. *(Sudah dipasang di situs.)*
2. **Quick win:** setiap klip dibuka dengan tanggal dan indikator "Live" yang terlihat. Itu bukti klaim, bukan sekadar kata.
3. **Strategis:** repo publik dengan README "How it works" (JPL, shader) sebagai magnet backlink dev.
4. **Strategis:** kalender momen astronomi (lihat `LAUNCH-PLAN.md`).
5. **Strategis:** sapa Solar System Scope sebagai sumber tekstur (lihat `PARTNERSHIPS.md`), bukan sebagai lawan.

### Kartu jawaban singkat
| Kalau orang bilang… | Jawab dengan… |
|---|---|
| "NASA Eyes lebih lengkap" | "Betul, NASA Eyes untuk mendalami. Heliora dibuat supaya kamu melihat langit hari ini dalam 5 detik, juga di HP." |
| "Jaraknya tidak sesuai skala" | "Sengaja: dengan skala asli planet jadi titik. Arah dan tanggalnya asli, dari data JPL." |
| "Ini cuma demo three.js biasa" | "Coba bandingkan posisi Venus dengan aplikasi astronomi mana pun hari ini. Kodenya terbuka kalau mau cek." |

**Pemantauan:** cek ulang beranda ketiga pesaing setiap kuartal, atau jalankan `reverse-engineer-marketing` mode Watch untuk Solar System Scope.
