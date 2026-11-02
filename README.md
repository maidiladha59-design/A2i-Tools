# Ai2 All Compress

Alat kompres gambar dan PDF yang berjalan sepenuhnya di browser. Tidak ada file yang diunggah, tidak ada penyimpanan file, dan tidak ada akun.

- Situs produksi (default): `https://ai2allcompress.vercel.app`
- Email resmi: `maidiladha59@gmail.com`
- Bahasa: Indonesia (default) dan English
- Stack: Next.js App Router, TypeScript, Tailwind CSS, Web Worker + Canvas, pdf-lib + pdfjs-dist

---

## 1. Ringkasan Proyek

Ai2 All Compress adalah aplikasi web gratis untuk memperkecil dan mengelola gambar serta PDF. Seluruh pemrosesan dilakukan di perangkat pengguna memakai Canvas, Web Worker, `pdf-lib`, dan `pdfjs-dist`. Server hanya mengirim halaman HTML, JavaScript, dan aset statis; tidak ada endpoint upload dan tidak ada file pengguna yang disimpan di server, `localStorage`, atau IndexedDB.

Proyek ini mencakup:

- 8 alat inti: 4 alat gambar dan 4 alat PDF.
- 6 halaman landing SEO berbahasa Indonesia dan Inggris.
- 6 artikel blog orisinal, masing-masing tersedia dalam dua bahasa.
- Halaman About, Contact, Privacy, Terms, Disclaimer, dan 404 kustom.
- Metadata per halaman, hreflang, canonical, sitemap, robots, OG image, dan JSON-LD.
- Slot iklan AdSense yang hanya aktif bila publisher ID diisi.
- Unit test untuk logika ukuran, target, dan urutan file.

## 2. Fitur

### Alat gambar

1. **Kompres Gambar** (`/image/compress`)
   - Mode otomatis, manual (kualitas), dan target ukuran KB/MB.
   - Preset target 50 KB, 100 KB, 200 KB, 500 KB, 1 MB, dan 2 MB, plus input kustom.
   - Antrean banyak file, progres per file, pembatalan, unduh satu per satu atau ZIP.
   - Nama, ukuran awal/akhir, persentase penghematan, dan peringatan bila hasil lebih besar.
   - Perbandingan sebelum/sesudah dengan slider.
   - Validasi file kosong, format tidak didukung, dan batas 50 MB per file.
2. **Ubah Ukuran Gambar** (`/image/resize`)
   - Preset ukuran asli, 1920×1080, 1080×1080, 1080×1350, 1080×1920, dan setengah ukuran.
   - Input lebar/tinggi 16–8000 px, kunci rasio otomatis, dan format keluaran JPG/PNG/WebP.
3. **Konversi Gambar** (`/image/convert`)
   - Konversi JPG, PNG, dan WebP antarformat dengan kontrol kualitas.
4. **Potong Gambar** (`/image/crop`)
   - Crop bebas, rasio 3×4, 4×6, dan 1:1, zoom, rotasi, serta ekspor sesuai format.

### Alat PDF

1. **Kompres PDF** (`/pdf/compress`)
   - Tiga level kualitas: Tinggi, Seimbang, Kecil.
   - Progres per halaman, pembatalan, dan hasil unduhan.
2. **Perkecil PDF ke Target** (`/pdf/reduce`)
   - Target kustom KB/MB dengan preset 100 KB, 200 KB, 500 KB, 1 MB, dan 2 MB.
   - Beberapa strategi resolusi/kualitas dicoba sampai target tercapai atau batas upaya habis.
3. **Optimalkan Halaman PDF** (`/pdf/organize`)
   - Pratinjau thumbnail, hapus halaman, ubah urutan, putar 90°, dan mode grayscale.
4. **Gabung PDF** (`/pdf/merge`)
   - Metadata file (nama, ukuran, jumlah halaman), tambah/hapus, ubah urutan dengan drag-and-drop atau keyboard.
   - Validasi file non-PDF, PDF rusak, PDF terenkripsi, dan syarat minimal dua file valid.
   - Tautan cepat untuk memperkecil hasil gabungan.

### Fitur lintas aplikasi

- Drag-and-drop, pemilihan file, dan paste gambar dari clipboard pada area unggah yang mendukung.
- Tema terang, gelap, dan mengikuti sistem, tersimpan di perangkat.
- Toast, status kosong, status error, dan progres yang dapat dibatalkan.
- Keyboard dan ARIA: skip link, fokus terlihat, label form, `aria-invalid`, dan tombol dengan target sentuh memadai.
- Handoff antarhalaman di memori (misalnya hasil gabung PDF langsung dibuka di alat perkecil) tanpa menulis file ke storage.

## 3. Halaman dan Rute

Semua rute tersedia dalam dua locale: `/id/...` dan `/en/...`.

| Jenis | Rute |
| --- | --- |
| Beranda | `/` (redirect sesuai preferensi), `/id`, `/en` |
| Alat gambar | `/image/compress`, `/image/resize`, `/image/convert`, `/image/crop` |
| Alat PDF | `/pdf/compress`, `/pdf/reduce`, `/pdf/organize`, `/pdf/merge` |
| Landing SEO | `/compress-image-100kb`, `/compress-image-200kb`, `/compress-pdf-1mb`, `/compress-jpg`, `/compress-png`, `/merge-pdf` |
| Blog | `/blog`, `/blog/[slug]` (6 artikel) |
| Perusahaan | `/about`, `/contact` |
| Legal | `/privacy`, `/terms`, `/disclaimer` |
| Sistem | `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`, `/og.png`, 404 kustom |
| Iklan | `public/ads.txt` (placeholder) |

## 4. Teknologi dan Versi

Dependensi utama dipatok pada versi berikut:

| Paket | Versi | Fungsi |
| --- | --- | --- |
| `next` | 16.4.4 | App Router, metadata, static generation |
| `react` / `react-dom` | 19.3.1 | UI |
| `typescript` | 5.9.3 | Strict mode |
| `tailwindcss` | 3.4.19 | Styling + `@tailwindcss/typography` |
| `next-intl` | 4.14.9 | Routing dan terjemahan ID/EN |
| `next-themes` | 0.4.6 | Tema terang/gelap/sistem |
| `lucide-react` | 1.66.0 | Ikon |
| `pdf-lib` | 1.17.1 | Tulis, gabung, rotasi, metadata PDF |
| `pdfjs-dist` | 6.5.438 | Render halaman PDF ke canvas |
| `@dnd-kit/*` | 6.3.1 / 10.0.0 / 3.2.2 | Drag-and-drop urutan file dan halaman |
| `jszip` | 3.10.2 | Arsip ZIP hasil kompresi banyak gambar |
| `react-image-crop` | 11.1.2 | Crop gambar |
| `vitest` | 5.0.5 | Unit test |
| `eslint` | 9.39.5 | Lint dengan flat config Next.js |

Pemrosesan gambar memakai `createImageBitmap`, `OffscreenCanvas`, dan worker statis di `public/workers/image-compressor.js`. Pustaka PDF dimuat secara lazy agar bundel awal tetap ringan.

## 5. Persyaratan Sistem

- Node.js LTS (disarankan 20 atau lebih baru; proyek dikembangkan pada Node 24).
- npm (proyek tidak memakai yarn/pnpm secara khusus).
- Browser modern: Chrome, Edge, Firefox, atau Safari versi terbaru.
- Web Worker dan OffscreenCanvas diperlukan untuk sebagian alat gambar; bila tidak tersedia, UI menampilkan pesan yang jelas.

## 6. Instalasi

```bash
npm install
```

Lalu siapkan konfigurasi lokal:

```bash
cp .env.example .env.local
```

Isi environment (opsional untuk pengembangan, wajib disesuaikan sebelum publikasi):

```dotenv
NEXT_PUBLIC_SITE_URL=https://domain-kamu.com
NEXT_PUBLIC_ADSENSE_CLIENT=
NEXT_PUBLIC_CONTACT_EMAIL=maidiladha59@gmail.com
```

## 7. Menjalankan Development

```bash
npm run dev
```

Buka `http://localhost:3000`. Root akan mengarahkan ke `/id` atau `/en` berdasarkan preferensi bahasa yang tersimpan atau header browser.

Perintah lain:

```bash
npm run lint        # ESLint
npm run typecheck   # TypeScript tanpa emit
npm test            # Vitest (22 unit test)
```

## 8. Build dan Menjalankan Produksi

```bash
npm run build
npm run start
```

`npm run build` menghasilkan 60 halaman statis (termasuk dua locale untuk setiap halaman) dan route dinamis untuk sitemap, robots, manifest, serta OG image. Jalankan `npm run start -- -p 3000` bila ingin memilih port lain.

## 9. Pengujian dan Kualitas Kode

Status verifikasi terakhir:

- `npm run lint`: lolos tanpa error.
- `npx tsc --noEmit`: lolos tanpa error.
- `npm test`: 22/22 test lulus (11 test ukuran/target, 11 test utilitas).
- `npm run build`: sukses, 60 halaman statis, tanpa warning build.
- Uji browser fungsional: kompresi gambar tunggal dan massal, ZIP, perbandingan sebelum/sesudah, resize, konversi, crop, kompresi PDF, perkecil PDF ke target, organisasi halaman, gabung PDF beserta validasi file, pergantian bahasa, formulir kontak, dan 404.
- Uji responsif dengan emulasi perangkat 360 px, 768 px, dan 1280 px: tidak ada overflow horizontal.

Unit test berada di `tests/`. Test mencakup parsing ukuran KB/MB, perhitungan target, format bytes, persentase penghematan, nama file keluaran, dan logika urutan file.

## 10. Struktur Proyek

```
app/
  [locale]/              halaman berbahasa (beranda, alat, blog, legal, 404)
  og.png/route.tsx       OG image dinamis 1200x630
  sitemap.ts, robots.ts  metadata untuk mesin pencari
components/
  ads/                   AdSlot (gated oleh env)
  home/                  QuickStart
  layout/                Header, Footer, ThemeToggle, LocaleSwitcher
  pages/                 LegalPage, ContactForm
  seo/                   JsonLd
  tools/image/           ImageCompressor, ImageResizer, ImageConverter, ImageCropper
  tools/pdf/             PdfCompressor, PdfReducer, PdfOrganizer, PdfMerger
  ui/                    Button, Dropzone, ProgressBar, Toast, Consent, dll.
content/                 blog, FAQ, legal, landing SEO, about
i18n/                    routing, navigation, request config
lib/
  image/                 validasi dan client Web Worker
  pdf/                   client pdf-lib/pdfjs-dist
  tools/                 registry alat dan handoff antarhalaman
  seo.ts, config.ts, size.ts, utils.ts
messages/                id.json dan en.json
public/
  workers/               worker kompresi gambar
  demo/                  gambar contoh untuk slider sebelum/sesudah
  ads.txt                placeholder AdSense
tests/                   unit test Vitest
```

## 11. Privasi dan Pemrosesan Lokal

- **Semua file diproses 100% lokal di browser. Tidak ada upload ke server dan tidak ada penyimpanan file.**
- Tidak ada endpoint API untuk menerima file.
- **Jangan memakai analytics yang mengirim isi file. Jangan menyimpan file di localStorage/IndexedDB.**
- **Jangan mengirim file pengguna ke server mana pun.**
- Badge **"File tidak pernah keluar dari perangkatmu"** / **"Your files never leave your device"** tampil di beranda dan area unggah.
- Handoff antaralat memakai referensi `File` di memori selama sesi tab; tidak ada penulisan ke storage.
- Iklan AdSense hanya dimuat bila `NEXT_PUBLIC_ADSENSE_CLIENT` diisi. Banner cookie memberi pilihan terima/tolak, dan pilihan disimpan sebagai preferensi (bukan file pengguna).

## 12. Bahasa (Indonesia dan English)

- Default locale: `id`. Prefix locale selalu dipakai (`localePrefix: "always"`).
- Semua UI, FAQ, halaman legal, landing, blog, pesan error, dan metadata diterjemahkan.
- Pemilih bahasa tersedia di header dan footer, dengan hreflang serta canonical untuk kedua locale.
- Preferensi bahasa disimpan melalui cookie `NEXT_LOCALE`; root `/` mengarahkan ke locale yang sesuai.

## 13. SEO dan Persiapan AdSense

- Metadata unik per halaman dan locale, termasuk title, description, canonical, dan alternates `hreflang`.
- Open Graph dan Twitter Card memakai `/og.png`.
- JSON-LD: `WebApplication`, `FAQPage`, `BreadcrumbList`, dan `Article`.
- `app/sitemap.ts` menghasilkan sitemap untuk kedua locale; `app/robots.ts` mengarahkan ke sitemap.
- Internal link antaralat, landing, blog, dan halamanlegal.
- Lighthouse: konfigurasi dirancang untuk skor tinggi (static generation, font `next/font`, lazy load pdf.js/pdf-lib, gambar statis). Skor aktual tetap bergantung pada hosting, jaringan, dan isi iklan.

### Mengaktifkan AdSense

1. Dapatkan publisher ID resmi dari Google AdSense (`ca-pub-...`).
2. Isi `NEXT_PUBLIC_ADSENSE_CLIENT` di environment produksi.
3. Ganti baris placeholder di `public/ads.txt` dengan publisher ID asli (format `google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0`). Jangan mengaktifkan baris komentar sebelum ID asli tersedia.
4. Tanpa ID, semua `<AdSlot/>` tidak merender iklan dan skrip AdSense tidak dimuat.

## 14. Deploy ke Vercel

1. Unggah proyek ke repositori Git atau impor langsung ke Vercel.
2. Framework terdeteksi sebagai Next.js; tidak perlu konfigurasi build khusus (`npm run build`).
3. Tambahkan environment variables:
   - `NEXT_PUBLIC_SITE_URL` = URL produksi final, tanpa garis miring di akhir.
   - `NEXT_PUBLIC_ADSENSE_CLIENT` = publisher ID (opsional sampai iklan disetujui).
   - `NEXT_PUBLIC_CONTACT_EMAIL` = alamat kontak resmi.
4. Deploy. Setelah domain final diketahui, perbarui `NEXT_PUBLIC_SITE_URL`, lalu redeploy agar canonical, sitemap, dan OG URL konsisten.
5. Verifikasi `/robots.txt`, `/sitemap.xml`, `/og.png`, kedua locale, dan formulir kontak.

## 15. Batasan, Catatan Penting, dan Kontak

Batasan yang perlu diketahui (disengaja dan transparan):

- **Batas file**: 50 MB per gambar, 100 MB per PDF, dan 20 file per antrean. File sangat besar dapat melebihi memori perangkat.
- **Target kompresi bersifat best-effort**: hasil diusahakan sedekat mungkin dengan target, tetapi tidak selalu tepat, terutama untuk PDF teks murni atau gambar yang sudah sangat terkompresi. Bila target tidak tercapai, UI menampilkan hasil terkecil beserta penjelasannya.
- **Hasil bisa lebih besar dari aslinya** pada kasus tertentu (misalnya target melebihi ukuran asli atau format keluaran yang kurang efisien). UI memberi peringatan dan tetap menyediakan unduhan.
- **PDF dirasterisasi** saat kompresi/perkecil: halaman berubah menjadi gambar, sehingga teks tidak lagi dapat dipilih atau dicari. Untuk PDF yang hanya diurutkan/digabung tanpa rasterisasi, konten asli dipertahankan.
- **Pemrosesan PDF berjalan di main thread** dengan jeda per halaman agar UI tetap merespons. Ini bukan Web Worker; antarmuka menampilkan progres dan tombol batal, tetapi file PDF yang sangat besar dapat terasa lebih lambat.
- **PDF terenkripsi/kata sandi** ditolak dengan pesan yang jelas; alat ini tidak membuka proteksi kata sandi.
- **HEIC/HEIF** hanya terbaca bila browser menyediakan codec-nya. Chrome di sebagian platform tidak dapat mendekode HEIC; gunakan JPG/PNG/WebP untuk hasil paling konsisten.
- **GIF** diproses sebagai satu frame (frame pertama), bukan animasi.
- **Tanpa analytics**: tidak ada pelacakan perilaku atau isi file. Log server hosting (misalnya Vercel) dapat mencatat permintaan halaman biasa, tetapi tidak pernah menerima file pengguna.
- **Tema dan bahasa** disimpan sebagai preferensi di perangkat, bukan file pengguna.

Kontak resmi: **maidiladha59@gmail.com** — biasanya dibalas dalam 1–2 hari kerja.

---

Dibuat untuk pengguna yang membutuhkan alat kompresi cepat, gratis, dan privat tanpa mengorbankan kendali atas file mereka.
