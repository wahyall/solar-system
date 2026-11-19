# Brand review: semua copy Heliora

| | |
|---|---|
| **Disusun dengan** | `marketing:brand-review`, panduan suara di `.agents/product-marketing.md` |
| **Yang direview** | `index.html` (meta, JSON-LD, konten statis), `README.md`, copy UI (`src/App.tsx`, `src/components/*`), `marketing/CONTENT-DRAFTS.md`, `marketing/OUTREACH-EMAILS.md` |
| **Tanggal** | 19 Nov 2026 |

## Ringkasan
Copy Heliora sudah sangat dekat dengan suara brand: tenang, presisi, jujur soal batasan (jarak dikompresi, rentang 1800–2050, model visual dan bukan efemeris). Kekuatan terbesarnya adalah klaim akurasi yang bisa dibuktikan (oposisi Jupiter dan Mars cocok dengan almanak), bukan sekadar diklaim. Perbaikan terpenting ada di beberapa generalisasi yang tidak didukung bukti ("most", "everywhere") dan satu klaim teknis yang salah tentang ketelitian posisi Bulan. **Semua temuan tingkat Tinggi dan Sedang sudah diperbaiki di file.**

## Temuan

| Masalah | Lokasi | Tingkat | Perbaikan | Status |
|---|---|---|---|---|
| Klaim ketelitian Bulan "good to a fraction of a degree" salah. Teori ringkas tanpa evection (±1,27°) dan variation (±0,66°) bisa meleset 1–2° | `README.md`, bagian akurasi | **Tinggi** | "so its position can be off by a degree or two" | Diperbaiki |
| Generalisasi tanpa bukti: "Most solar system demos on the web are beautiful and wrong" | `CONTENT-DRAFTS.md` §1 dan §7 | Sedang | "Many …" | Diperbaiki |
| "privacy-friendly page analytics" terlalu kabur | `CONTENT-DRAFTS.md` §6 (Show HN) | Sedang | "cookieless page analytics (Vercel Web Analytics)", didukung [dokumentasi Vercel](https://vercel.com/docs/analytics/privacy-policy) | Diperbaiki |
| "Di Antartika, Matahari tidak terbenam" terlalu luas (hanya di dalam lingkar Antarktika) | `CONTENT-DRAFTS.md` §3, klip 4 | Sedang | "Di sebagian besar Antartika…" | Diperbaiki |
| "used in classrooms and side projects everywhere" tidak bisa dibuktikan | `OUTREACH-EMAILS.md` A1 | Sedang | "They show up in a lot of classrooms and side projects" | Diperbaiki |
| "run time" di meta description bisa terbaca "runtime" | `index.html` | Sedang | "speed up time" (158 karakter, masih di bawah 160) | Diperbaiki |
| Wordmark di nav tampil "HELIORA" kapital via CSS, sedangkan semua konsep logo memakai "heliora" huruf kecil | `NavBar.tsx` | Rendah | Ganti teks nav dengan SVG wordmark dari kit logo | Diperbaiki (lockup horizontal di nav) |
| Judul tulisan teknis opsi 3 "Your three.js solar system is probably wrong" agak provokatif | `CONTENT-DRAFTS.md` §7 | Rendah | Boleh dipakai untuk audiens dev (ada "probably"). Pilih opsi 1 untuk LinkedIn | Dibiarkan, pilihanmu |
| Komentar kode memakai em dash ("Mobile panel — bottom sheet") | `ContentPanel.tsx` | Rendah | Tidak tampil ke pengguna. Dibiarkan | – |

## Sebelum / sesudah (tiga terpenting)

**1. README, ketelitian Bulan**
- Sebelum: *The Moon uses a short lunar theory (main terms only), good to a fraction of a degree.*
- Sesudah: *The Moon uses a short lunar theory (main terms only), so its position can be off by a degree or two.*

**2. Hook LinkedIn**
- Sebelum: *Most solar system demos on the web are beautiful and wrong.*
- Sesudah: *Many solar system demos on the web are beautiful and wrong.*

**3. Show HN, analytics**
- Sebelum: *No accounts, no tracking beyond privacy-friendly page analytics.*
- Sesudah: *No accounts; the only tracking is cookieless page analytics (Vercel Web Analytics).*

## Cek suara per atribut
| Atribut | Hasil |
|---|---|
| Tenang | Lulus. Tidak ada tanda seru berlebihan atau kata hype di copy publik |
| Presisi | Lulus setelah perbaikan Bulan. Angka spesifik dan bersumber (11 & 19 Feb 2027, 20 ms/frame, 5.000 asteroid) |
| Hangat | Lulus. Ajakan seperti "tell me which planet you flew to first" |
| Crafted | Lulus. Detail ditunjukkan, bukan dibanggakan |
| Kata terlarang ("revolutionary", "next-level", "to scale" sebagai klaim, "akurat sampai detik") | Tidak ditemukan. "to scale" hanya muncul dalam kalimat yang menyangkalnya |

## Catatan hukum dan atribusi
- **Lisensi tekstur (CC BY 4.0):** atribusi ke Solar System Scope ada di UI (baris kredit, desktop dan mobile), README, dan draf Discourse. Gambar OG yang memakai render planet juga butuh atribusi: sudah tercakup di README, dan gambar OG sendiri memuat baris kredit kecil di kaki gambar.
- **Penyebutan NASA/JPL:** dipakai sebagai sumber data ("from NASA JPL orbital data"). Jangan pernah memakai logo atau insignia NASA dan jangan menyiratkan dukungan NASA. Pedoman media NASA melarangnya. Copy saat ini sudah aman.
- **Perbandingan dengan pesaing:** copy publik tidak menyebut pesaing. Kartu jawaban di `COMPETITIVE-BRIEF.md` adil dan faktual ("NASA Eyes untuk mendalami").
- **Testimoni:** tidak ada. Jangan menambahkan kutipan pengguna sebelum ada yang asli dan izin untuk mengutipnya.
- **Merek dagang "Heliora":** belum dicek. Lakukan pencarian merek (misalnya di basis data DJKI dan WIPO Global Brand Database) sebelum penggunaan komersial.
- **Lisensi kode:** MIT di `LICENSE`. Tekstur dikecualikan secara eksplisit di README.
