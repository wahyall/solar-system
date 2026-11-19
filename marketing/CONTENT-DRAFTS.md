# Draf konten peluncuran Heliora

| | |
|---|---|
| **Disusun dengan** | `marketing:draft-content`, aturan suara bundle LinkedIn (`voice-rules.md`), konteks produk `.agents/product-marketing.md` |
| **Suara yang dipakai** | Tenang, presisi, hangat, crafted. Tunjukkan dulu, baru jelaskan. Jujur soal batasan |
| **Bahasa** | LinkedIn, Discourse, Reddit, Show HN: Inggris (audiens global). Threads, caption video: Indonesia dengan alternatif Inggris |
| **Status** | Semua draf. **Kamu yang mempublikasikan**, tidak ada yang dikirim otomatis |
| **Isian wajib** | Teks dalam `[kurung siku]` adalah cerita atau angka yang hanya kamu tahu. Tidak saya karang |

Tautan yang dipakai di semua draf: `https://heliora.vercel.app` (pastikan sudah live) dan `https://github.com/[username]/heliora` (isi setelah repo dibuat).

---

## 1. LinkedIn: post cerita peluncuran (minggu 1)

**Opsi hook**
1. Many solar system demos on the web are beautiful and wrong.
2. Venus passed Earth a few weeks ago. I built a way to see it.
3. I wanted to know where every planet is today, so I put the whole solar system in a browser tab.

**Draf (hook 1, ±210 kata)**

> Many solar system demos on the web are beautiful and wrong.
>
> The planets start at random angles and circle the Sun at made-up speeds. Mine did too, until a few weeks ago.
>
> So I rebuilt it. Heliora now places every planet where it really is today, using NASA JPL's published orbital elements, computed right in the browser. No server, no install.
>
> The check that convinced me it worked: the model puts Jupiter's opposition on 11 February 2027 and Mars's on 19 February. Both match the almanacs.
>
> Then I spent far too long on the details you notice in the first five seconds:
> • Earth's city lights switch on as the day/night line passes over them
> • Saturn's rings throw a shadow on the planet, and the planet shadows the rings back
> • the atmosphere glows blue on the day side and reddens at the terminator
>
> [Satu kalimat jujur tentang apa yang paling sulit atau apa yang kamu pelajari. Contoh bentuk: "The hardest part was ___, because ___."]
>
> It runs on phones too. Distances are compressed so you can actually see the planets. Directions and dates are real.
>
> Link in the first comment. Open it and tell me which planet you flew to first.

**Variasi penutup untuk recruiter** (bingkai kedua dari [review dewan](COUNCIL-REVIEW.md); pakai kalau audiens LinkedIn-mu kebanyakan recruiter dan lead teknis):
> Real-time graphics, real data, shipped: one TypeScript engine, one shader file, an orbit model checked against almanacs, measured at ~20 ms a frame on integrated graphics. If you're building something in 3D on the web, I'd like to hear about it.

**Komentar pertama:** `Live: https://heliora.vercel.app · Code: https://github.com/[username]/heliora`

**Catatan:** lampirkan klip Bumi siang→malam (atau GIF fly-to Saturnus). Tanpa hashtag, atau maksimal 3: `#threejs #webgl #creativecoding`. Satu angka konkret sudah ada (11 dan 19 Feb 2027).

---

## 2. Threads: post peluncuran + thread (minggu 1–2)

**Post peluncuran (dengan klip)**
> Planet-planet di video ini ada di posisi aslinya hari ini.
>
> Aku bikin Heliora: tata surya 3D yang jalan langsung di browser, posisinya dihitung dari data orbit NASA JPL. Bisa dibuka di HP, tanpa daftar.
>
> heliora.vercel.app

*EN:* The planets in this clip are where they really are today. Heliora is a live 3D solar system in your browser, positions from NASA JPL orbital data. heliora.vercel.app

**Thread minggu 2: "3 detail kecil yang bikin planet 3D terasa nyata"**
1. 3 detail kecil yang bikin planet 3D di browser terasa nyata (bukan cuma bola bertekstur yang muter) 🧵
2. **Garis siang–malam.** Lampu kota di Bumi baru nyala setelah garis terminator lewat. Pas di garis itu, awan sedikit memerah kayak sunset dilihat dari orbit. [klip close-up terminator]
3. **Bayangan cincin.** Cincin Saturnus bikin bayangan di planetnya, dan planetnya bikin bayangan di cincin. Dihitung per piksel dari arah Matahari yang sama. [klip Saturnus]
4. **Atmosfer.** Tepi Bumi bercahaya biru di sisi siang dan memudar ke oranye di dekat terminator. Venus kuning tebal, Mars tipis kemerahan. [gambar perbandingan]
5. Semua posisi planetnya juga asli untuk tanggal hari ini. Coba sendiri: heliora.vercel.app

---

## 3. Naskah video pendek (9:16, 15–25 detik)

Aturan untuk semua klip: hook visual di detik pertama, teks besar di sepertiga tengah, bisa dimengerti tanpa suara, tanggal dan "Live" terlihat di awal, berakhir di frame terindah (peak-end rule).

### Klip 1: Bumi siang→malam (peluncuran)
| Detik | Visual | Teks di layar |
|---|---|---|
| 0–2 | Bumi penuh, terminator di tengah, indikator Live terlihat | "Ini Bumi. Hari ini. Jam segini." |
| 2–9 | Waktu dipercepat 1 jam/detik, terminator bergerak, lampu kota menyala | "Lampu kota menyala saat malam lewat" |
| 9–15 | Zoom out pelan ke Bumi + Bulan | "Posisinya dari data NASA JPL" |
| 15–20 | Akhir: Bumi dengan kilau laut di sisi siang | "heliora.vercel.app" |

**Caption:** Bumi, hari ini, dilihat dari luar angkasa. Posisi semua planet di Heliora dihitung dari data orbit NASA JPL, langsung di browser. Link di bio.
*EN:* Earth, today, seen from space. Every planet in Heliora sits where it really is, from NASA JPL orbital data. Link in bio.

### Klip 2: bayangan cincin Saturnus
| Detik | Visual | Teks |
|---|---|---|
| 0–2 | Saturnus dari dekat, bayangan cincin di planet | "Lihat bayangan ini" |
| 2–10 | Orbit kamera pelan mengelilingi | "Cincin membayangi planet, planet membayangi cincin" |
| 10–18 | Kamera ke sisi belakang, cincin bercahaya tembus | "Dihitung dari arah Matahari yang asli" |
| 18–22 | Frame akhir Saturnus miring | "heliora.vercel.app" |

**Caption:** Saturnus di posisi aslinya hari ini, dengan bayangan cincin yang dihitung dari arah Matahari. Dibuat dengan Three.js.

### Klip 3: overview time-lapse 1 tahun/detik
| Detik | Visual | Teks |
|---|---|---|
| 0–2 | Overview seluruh sistem, label tampil, tanggal hari ini | "Tata surya hari ini" |
| 2–14 | Kecepatan 1 tahun/detik, planet dalam berputar cepat, Neptunus nyaris diam | "1 detik = 1 tahun" |
| 14–20 | Kembali ke "Now" | "Merkurius: 88 hari. Neptunus: 165 tahun" |

**Caption:** Satu detik, satu tahun. Merkurius mengelilingi Matahari 4 kali selama Bumi sekali. Neptunus? Butuh 165 tahun.

### Klip 4: solstis 21 Desember 2026 (minggu 3)
| Detik | Visual | Teks |
|---|---|---|
| 0–3 | Bumi dari samping, kutub selatan condong ke Matahari, tanggal 21 Des | "21 Desember 2026" |
| 3–12 | Rotasi Bumi 1 jam/detik, wilayah sekitar kutub selatan terus terang | "Di sebagian besar Antartika, Matahari tidak terbenam hari ini" |
| 12–20 | Zoom out, Bumi di orbitnya | "Solstis: kemiringan sumbu 23,4° yang bikin musim" |

**Caption:** Hari ini solstis Desember: siang terpanjang di belahan selatan, malam terpanjang di utara. Di Heliora kamu bisa lihat kenapa: sumbu Bumi miring 23,4°.
*Catatan verifikasi:* sebelum posting, buka Heliora di tanggal 21 Des 2026 dan pastikan kutub selatan menghadap Matahari (kemiringan sumbu dan posisi Bumi diambil dari model).

---

## 4. Discourse three.js: kategori Showcase (minggu 2)

**Judul:** Heliora: a live solar system with real JPL planet positions (three.js r184, custom shaders)

> Hi all, sharing a project I've been working on: **Heliora**, a 3D solar system where every planet sits where it really is today.
>
> **Live:** https://heliora.vercel.app · **Code:** https://github.com/[username]/heliora
>
> [GIF 8 detik: fly-to Saturnus]
>
> Some details that might be interesting here:
> - **Positions:** JPL "Approximate Positions of the Planets" (Keplerian elements, 1800–2050), solved in the browser each frame. Radial distance is compressed with a power curve so the outer planets fit; directions are untouched.
> - **Earth:** one ShaderMaterial for day/night blend, city lights past the terminator, an ocean glint mask derived from the day map's blue dominance, and cloud shadows sampled with the cloud layer's drift offset.
> - **Atmospheres:** an 8-step single-scattering march through a shell (Rayleigh + Mie phase), same Sun direction as the surface.
> - **Saturn:** ring shadow on the planet via a ray–plane test, planet shadow on the rings via closest approach to the sun ray.
> - **Pipeline:** EffectComposer → UnrealBloomPass (threshold in linear HDR so only the Sun and glints bloom) → OutputPass with ACES.
> - **Asteroid belt:** 5,000 points with Keplerian motion evaluated in the vertex shader, Kirkwood gaps included.
>
> Measured cost on integrated Intel UHD graphics at 1440×900: about 20 ms per frame with bloom, 14 ms without.
>
> Textures are from Solar System Scope (CC BY 4.0). Feedback very welcome, especially on the atmosphere shader and on mobile performance.

---

## 5. r/threejs (minggu 4)

**Judul:** I put the real solar system in a browser tab: planets at their actual positions for today (JPL elements + custom shaders)

> Live demo: https://heliora.vercel.app (works on phones)
> Source: https://github.com/[username]/heliora
>
> Positions come from NASA JPL's Keplerian elements, solved per frame. Earth has day/night, city lights and ocean glint in one shader; atmospheres use a small single-scattering march; Saturn's rings and the planet shadow each other.
>
> Happy to answer questions about any of the shaders. What would you add next: moons of Jupiter or a comet?

*Cek sebelum posting:* baca aturan subreddit (self-promotion, flair "Showcase"/"Demo") dan ikuti.

---

## 6. Show HN (minggu 4)

**Judul (≤ 80 karakter):** Show HN: Heliora – a live 3D solar system with real planet positions for today

**Teks:**
> Heliora shows every planet where it actually is today, in 3D, in the browser. Positions come from JPL's "Approximate Positions of the Planets" (Keplerian elements valid 1800–2050), solved client-side; the clock stops at the edge of that range instead of drifting into wrong positions.
>
> Distances from the Sun are compressed with a power curve so the outer planets are visible; directions and dates are real. As a sanity check, the model puts Jupiter's opposition on 2027-02-11 and Mars's on 2027-02-19, matching published almanacs.
>
> Built with Three.js, React and custom GLSL (Earth day/night and city lights, a small atmospheric scattering march, ring shadows). No accounts; the only tracking is cookieless page analytics (Vercel Web Analytics). Source is MIT: https://github.com/[username]/heliora
>
> I'd especially like feedback on accuracy edge cases and performance on older phones.

*Catatan:* posting Selasa–Kamis sekitar 08:00–10:00 waktu Pasifik (sekitar 23:00–01:00 WIB). Siapkan 2–3 jam untuk menjawab komentar. Jangan minta upvote ke siapa pun (melanggar aturan HN).

---

## 7. Tulisan teknis #1 (LinkedIn article / dev.to), kerangka

**Kata kunci utama:** "three.js solar system" · pendukung: "real planet positions javascript", "JPL Keplerian elements"

**Opsi judul**
1. How I compute where every planet is today, in 80 lines of TypeScript
2. Real planet positions in the browser: JPL orbital elements, explained
3. Your three.js solar system is probably wrong. Here's how to fix it in an afternoon

**Kerangka**
1. **Hook (visual):** GIF overview + satu kalimat: "Many web solar systems use random angles. Here's how to use the real ones."
2. **Sumbernya:** tabel JPL (enam elemen + laju per abad), rentang 1800–2050, kenapa cukup untuk visual.
3. **Langkahnya:** T dalam abad Julian → elemen saat ini → anomali rata-rata → persamaan Kepler (iterasi Newton) → bidang orbit → rotasi ke ekliptika J2000. Satu blok kode per langkah, diambil dari `src/lib/orbits.ts`.
4. **Dari ekliptika ke Three.js:** pemetaan (x, y, z) → (x, z, −y), kompresi jarak dengan kurva pangkat, kenapa arah harus tetap utuh.
5. **Membuktikan hasilnya:** Bumi 56,3° di 19 Nov 2026 (almanak ≈ 56,6°), oposisi Jupiter dan Mars Feb 2027 cocok.
6. **Bonus:** rotasi Bumi dari GMST, kutub planet dari RA/Dec IAU, Bulan dengan teori ringkas.
7. **Penutup:** tautan demo dan repo, plus ajakan: "Coba bandingkan posisi Venus hari ini dengan aplikasi astronomi favoritmu."

**Meta description (dev.to/blog):** Use NASA JPL orbital elements to place every planet where it really is today in a three.js scene, with code and a live demo. (128 karakter)

---

## Catatan untuk semua draf
- Tidak ada klaim "to scale", "akurat sampai detik", atau superlatif.
- Setiap post berakhir dengan satu ajakan: buka demo (publik) atau baca kode (dev).
- Isi semua `[kurung siku]` sebelum posting. Jangan biarkan placeholder tampil.
- Untuk LinkedIn, kalau mau review gaya lebih ketat, jalankan `linkedin-humanizer --mode audit` pada draf final. Mengisi `voice-profile.md` lewat `linkedin-humanizer` membuat draf berikutnya lebih mirip suaramu.
