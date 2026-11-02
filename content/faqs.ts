import type { ToolId } from "@/lib/tools/registry";

export type Bilingual<T> = { id: T; en: T };
export type FaqEntry = { q: string; a: string };
export type Step = { title: string; body: string };

export type ToolContent = {
  faq: FaqEntry[];
  steps: Step[];
  tip: string;
};

export function pickLocale<T>(value: Bilingual<T>, locale: string): T {
  return locale === "en" ? value.en : value.id;
}

export const HOME_FAQ: Bilingual<FaqEntry[]> = {
  id: [
    {
      q: "Apakah file saya diunggah ke server?",
      a: "Tidak. Semua gambar dan PDF diproses di browser menggunakan Web Worker dan canvas. Server hanya mengirim halaman web; filemu tidak pernah dikirim, disimpan, atau dilihat oleh kami.",
    },
    {
      q: "Bagaimana cara kerja target ukuran 100 KB?",
      a: "Untuk mode target, sistem menguji beberapa tingkat kualitas dan resolusi, lalu memilih hasil terbaik yang ukurannya berada di bawah batas. Jika target sangat kecil, resolusi gambar juga diturunkan secara bertahap dan kamu akan melihat peringatan bila target tetap tidak tercapai.",
    },
    {
      q: "Format file apa saja yang didukung?",
      a: "Gambar: JPG, PNG, WebP, BMP, dan GIF statis; HEIC dapat dicoba tetapi tergantung dukungan browser. PDF: dokumen standar yang tidak dilindungi kata sandi. Format hasil dapat dipilih untuk JPG, PNG, atau WebP.",
    },
    {
      q: "Apakah ada batas jumlah file atau ukuran?",
      a: "Untuk menjaga memori browser, satu gambar dibatasi 50 MB dan satu PDF 100 MB. Antrean gambar dan PDF dibatasi 20 file. Proses PDF besar berjalan halaman demi halaman agar tab tetap stabil.",
    },
    {
      q: "Apakah alat ini bisa dipakai di HP?",
      a: "Bisa. Antarmuka dirancang mobile-first, mendukung drag and drop di layar sentuh, dan semua tombol berukuran minimal 44 piksel. Pemrosesan tetap berjalan di perangkat, jadi kecepatan bergantung pada kemampuan HP-mu.",
    },
    {
      q: "Apakah hasil kompresi PDF masih bisa diedit?",
      a: "Itu tergantung mode. Kompresi PDF dan mode render ulang mengubah halaman menjadi gambar, sehingga teks tidak bisa diseleksi atau dicari. Pada PDF Page Optimizer, pilih Pertahankan struktur asli jika kamu ingin teks dan tautan tetap utuh.",
    },
  ],
  en: [
    {
      q: "Are my files uploaded to a server?",
      a: "No. Every image and PDF is processed in your browser using Web Workers and canvas. The server only delivers the web page; your files are never sent, stored, or viewed by us.",
    },
    {
      q: "How does a 100 KB target work?",
      a: "In target mode, the tool tests multiple quality and resolution levels, then keeps the best result that fits under the limit. If the target is very small, image resolution is lowered in steps, and you will see a warning if the target still cannot be reached.",
    },
    {
      q: "Which file formats are supported?",
      a: "Images: JPG, PNG, WebP, BMP, and static GIF; HEIC may work depending on browser support. PDF: standard documents without password protection. Output can be JPG, PNG, or WebP.",
    },
    {
      q: "Are there file count or size limits?",
      a: "To protect browser memory, each image is limited to 50 MB and each PDF to 100 MB. Image and PDF queues are limited to 20 files. Large PDFs are processed page by page to keep the tab stable.",
    },
    {
      q: "Can I use these tools on a phone?",
      a: "Yes. The interface is mobile-first, supports touch drag and drop, and all buttons are at least 44 pixels tall. Processing still happens on your device, so speed depends on your phone’s capabilities.",
    },
    {
      q: "Can compressed PDFs still be edited?",
      a: "It depends on the mode. PDF compression and re-rendering turn pages into images, so text cannot be selected or searched. In PDF Page Optimizer, choose Keep original structure if you need text and links to stay intact.",
    },
  ],
};

export const TOOL_CONTENT: Record<ToolId, Bilingual<ToolContent>> = {
  imageCompress: {
    id: {
      steps: [
        {
          title: "Tambahkan gambar",
          body: "Tarik dan lepas, pilih dari perangkat, atau tempel gambar dari clipboard. Kamu bisa menambahkan banyak file sekaligus.",
        },
        {
          title: "Pilih cara kompresi",
          body: "Gunakan mode otomatis, geser kualitas manual, atau masukkan target KB/MB. Preset 50 KB hingga 2 MB tersedia untuk formulir pendaftaran.",
        },
        {
          title: "Bandingkan dan unduh",
          body: "Lihat ukuran sebelum dan sesudah, bandingkan kualitas dengan penggeser, lalu unduh per file atau semuanya sebagai ZIP.",
        },
      ],
      tip: "Untuk foto, kualitas 70–80% biasanya sudah tidak terlihat bedanya di layar. Jika butuh file jauh lebih kecil, WebP sering mengalahkan JPG pada kualitas yang sama.",
      faq: [
        {
          q: "Bagaimana cara kompres gambar ke 100 KB?",
          a: "Pilih mode Target ukuran, masukkan 100 dengan satuan KB, lalu tekan Kompres. Alat akan mencari kualitas tertinggi yang masih berada di bawah 100 KB. Jika perlu, resolusi diturunkan sedikit agar target tercapai.",
        },
        {
          q: "Kenapa ukuran PNG tidak banyak berkurang?",
          a: "PNG adalah format lossless, sehingga slider kualitas tidak berpengaruh. Pemrosesan ulang bisa menghapus metadata, tetapi untuk pengurangan besar kamu perlu memilih output WebP atau JPG, atau memperkecil resolusi.",
        },
        {
          q: "Apakah metadata EXIF seperti lokasi ikut terhapus?",
          a: "Ya. Setiap gambar yang diproses ulang melalui canvas akan kehilangan metadata EXIF, termasuk informasi kamera dan lokasi. Ini juga mengurangi risiko data pribadi ikut terunggah ke formulir online.",
        },
        {
          q: "Apa yang terjadi jika target mustahil dicapai?",
          a: "Alat tetap memberikan hasil terkecil yang bisa dibuat, menampilkan ukuran dan resolusi akhir, serta saran untuk memakai WebP, menurunkan resolusi, atau memilih target yang lebih besar. Tidak ada file yang dikirim ke server saat proses gagal.",
        },
        {
          q: "Apakah kualitas asli selalu bisa dipertahankan?",
          a: "Tidak selalu. Semakin kecil target, semakin besar kompromi pada kualitas atau resolusi. Prioritaskan target yang masuk akal, dan gunakan penggeser perbandingan untuk memastikan hasil tetap layak dipakai.",
        },
      ],
    },
    en: {
      steps: [
        {
          title: "Add images",
          body: "Drag and drop, choose files from your device, or paste from the clipboard. You can add several files at once.",
        },
        {
          title: "Choose a compression mode",
          body: "Use automatic mode, move the manual quality slider, or enter a KB/MB target. Presets from 50 KB to 2 MB are available for application forms.",
        },
        {
          title: "Compare and download",
          body: "Review the before and after sizes, compare quality with the slider, then download individually or all results as a ZIP.",
        },
      ],
      tip: "For photos, 70–80% quality is often indistinguishable on screen. If you need a much smaller file, WebP commonly beats JPG at the same visual quality.",
      faq: [
        {
          q: "How do I compress an image to 100 KB?",
          a: "Choose Size target, enter 100 with KB selected, and press Compress. The tool finds the highest quality that stays under 100 KB. If needed, resolution is lowered slightly so the target can be met.",
        },
        {
          q: "Why does a PNG barely get smaller?",
          a: "PNG is lossless, so the quality slider has no effect. Re-encoding may strip metadata, but major savings require choosing WebP or JPG output, or reducing resolution.",
        },
        {
          q: "Is EXIF metadata such as location removed?",
          a: "Yes. Every image re-encoded through canvas loses EXIF metadata, including camera details and location. This also reduces the risk of personal data traveling with a file to an online form.",
        },
        {
          q: "What happens if the target is impossible?",
          a: "The tool still returns the smallest result it can produce, shows the final size and resolution, and suggests WebP, a lower resolution, or a larger target. No file is sent to a server when processing fails.",
        },
        {
          q: "Can original quality always be preserved?",
          a: "Not always. The smaller the target, the more quality or resolution must be traded away. Aim for a reasonable target and use the comparison slider to confirm the result still works for your purpose.",
        },
      ],
    },
  },
  imageResize: {
    id: {
      steps: [
        {
          title: "Pilih gambar",
          body: "Tambahkan satu gambar, lalu lihat dimensi aslinya di panel pengaturan.",
        },
        {
          title: "Atur lebar dan tinggi",
          body: "Gunakan preset media sosial, masukkan ukuran khusus, atau pilih setengah ukuran. Kunci rasio mencegah gambar terdistorsi.",
        },
        {
          title: "Unduh hasil",
          body: "Pilih format keluaran dan kualitas, ubah ukuran, lalu unduh gambar baru tanpa menimpa file asli.",
        },
      ],
      tip: "Untuk batas unggahan, memperkecil resolusi umumnya lebih efektif daripada menurunkan kualitas JPEG secara berlebihan.",
      faq: [
        {
          q: "Apakah kualitas gambar turun saat diubah ukurannya?",
          a: "Setiap perubahan ukuran memerlukan encoding ulang, jadi ada sedikit penurunan kualitas pada format lossy seperti JPG. Gunakan kualitas tinggi bila hasilnya masih akan diedit. Format PNG mempertahankan detail tetapi ukurannya lebih besar.",
        },
        {
          q: "Bagaimana cara membuat pas foto 3×4 atau 4×6?",
          a: "Gunakan alat Potong Gambar untuk memilih rasio 3×4 atau 4×6, lalu atur dimensi akhir dengan alat ini bila formulir meminta piksel tertentu, misalnya 300×400 atau 600×900 piksel.",
        },
        {
          q: "Apakah rasio bisa dikunci?",
          a: "Ya. Dengan Kunci rasio aktif, mengubah lebar akan menyesuaikan tinggi secara otomatis, dan sebaliknya. Matikan kunci hanya jika kamu memang ingin meregangkan gambar.",
        },
        {
          q: "Apakah gambar saya diunggah?",
          a: "Tidak. Gambar diproses di perangkat menggunakan Web Worker dan canvas. Tidak ada API unggahan, dan hasilnya hanya ada di memori sampai kamu mengunduhnya.",
        },
      ],
    },
    en: {
      steps: [
        {
          title: "Choose an image",
          body: "Add one image and check its original dimensions in the settings panel.",
        },
        {
          title: "Set width and height",
          body: "Use a social media preset, enter custom dimensions, or pick half size. Locking the ratio prevents distortion.",
        },
        {
          title: "Download the result",
          body: "Choose output format and quality, resize, then download the new image without overwriting the original.",
        },
      ],
      tip: "For upload limits, reducing resolution is usually more effective than pushing JPEG quality far down.",
      faq: [
        {
          q: "Does resizing reduce image quality?",
          a: "Every resize requires re-encoding, so there is a small quality loss in lossy formats such as JPG. Use high quality if the result will be edited further. PNG retains detail but produces larger files.",
        },
        {
          q: "How do I create a 3×4 or 4×6 passport photo?",
          a: "Use the Image Cropper to select a 3×4 or 4×6 ratio, then set the final pixel dimensions here if the form asks for an exact size, such as 300×400 or 600×900 pixels.",
        },
        {
          q: "Can I lock the aspect ratio?",
          a: "Yes. With Lock aspect ratio enabled, changing the width updates the height automatically, and vice versa. Turn it off only if you intentionally want to stretch the image.",
        },
        {
          q: "Is my image uploaded anywhere?",
          a: "No. The image is processed on your device with a Web Worker and canvas. There is no upload API, and the result exists in memory only until you download it.",
        },
      ],
    },
  },
  imageConvert: {
    id: {
      steps: [
        {
          title: "Pilih gambar sumber",
          body: "Tambahkan gambar JPG, PNG, atau WebP yang ingin dikonversi.",
        },
        {
          title: "Tentukan format tujuan",
          body: "Pilih JPG, PNG, atau WebP, lalu atur kualitas untuk format lossy.",
        },
        {
          title: "Konversi dan unduh",
          body: "Tekan Konversi gambar dan unduh hasilnya. File asli tidak diubah.",
        },
      ],
      tip: "Gunakan PNG untuk transparansi dan teks tajam, JPG untuk foto yang butuh kompatibilitas luas, dan WebP untuk ukuran kecil di web modern.",
      faq: [
        {
          q: "Format mana yang paling kecil?",
          a: "Untuk foto, WebP umumnya paling kecil, disusul JPG. PNG cocok untuk grafik dengan area transparan atau teks, tetapi ukurannya biasanya paling besar. Hasil konversi bisa dibandingkan sebelum diunduh.",
        },
        {
          q: "Apakah transparansi PNG dipertahankan?",
          a: "Transparansi tetap ada saat dikonversi ke PNG atau WebP yang mendukung alpha. Saat dikonversi ke JPG, area transparan diisi latar putih karena JPG tidak mendukung transparansi.",
        },
        {
          q: "Apakah konversi mengurangi kualitas?",
          a: "Konversi ke JPG atau WebP dengan kualitas di bawah 100% bersifat lossy. Konversi ke PNG lossless, tetapi mengubah foto JPG ke PNG tidak memulihkan detail yang sudah hilang dan biasanya memperbesar file.",
        },
        {
          q: "Apakah ada file yang tersimpan?",
          a: "Tidak. Semua konversi dilakukan lokal dan hasilnya langsung menjadi blob di browser untuk diunduh. Menutup tab akan menghapus data proses.",
        },
      ],
    },
    en: {
      steps: [
        {
          title: "Choose a source image",
          body: "Add the JPG, PNG, or WebP image you want to convert.",
        },
        {
          title: "Pick a target format",
          body: "Select JPG, PNG, or WebP, then set quality for lossy formats.",
        },
        {
          title: "Convert and download",
          body: "Press Convert image and download the result. The original file stays untouched.",
        },
      ],
      tip: "Use PNG for transparency and crisp text, JPG for photos that need broad compatibility, and WebP for smaller files on the modern web.",
      faq: [
        {
          q: "Which format is the smallest?",
          a: "For photos, WebP is generally smallest, followed by JPG. PNG is best for graphics with transparency or text but usually produces the largest file. You can review the converted result before downloading.",
        },
        {
          q: "Is PNG transparency preserved?",
          a: "Transparency remains when converting to PNG or WebP with alpha support. When converting to JPG, transparent areas are filled with white because JPG does not support transparency.",
        },
        {
          q: "Does conversion reduce quality?",
          a: "Converting to JPG or WebP below 100% quality is lossy. Converting to PNG is lossless, but turning a JPG into PNG does not recover lost detail and usually makes the file larger.",
        },
        {
          q: "Are any files stored?",
          a: "No. Conversion happens locally and the result becomes a browser blob ready for download. Closing the tab clears the processed data.",
        },
      ],
    },
  },
  imageCrop: {
    id: {
      steps: [
        {
          title: "Pilih gambar",
          body: "Tambahkan gambar yang ingin dipotong, lalu pilih rasio bebas atau preset yang diminta formulir.",
        },
        {
          title: "Atur area crop",
          body: "Tarik sudut atau tepi kotak pilihan. Area yang tidak dipilih akan dihapus pada hasil.",
        },
        {
          title: "Unduh hasil",
          body: "Pilih format dan kualitas, lalu tekan Potong & unduh. File asli tetap aman.",
        },
      ],
      tip: "Untuk pas foto, gunakan rasio 3×4 atau 4×6 lalu periksa lagi persyaratan ukuran piksel dan latar belakang pada formulir.",
      faq: [
        {
          q: "Bagaimana memilih rasio pas foto 3×4 atau 4×6?",
          a: "Pilih rasio 3×4 atau 4×6 pada panel Rasio crop. Kotak pilihan akan mengikuti rasio tersebut saat kamu mengubah ukurannya. Setelah dipotong, gunakan alat Ubah Ukuran Gambar untuk mendapatkan dimensi piksel yang diminta.",
        },
        {
          q: "Apakah crop bisa dilakukan bebas?",
          a: "Ya. Pilih rasio Bebas untuk membuat area persegi panjang dengan proporsi apa pun. Kamu dapat memindahkan dan mengubah ukuran kotak pilihan sebelum mengekspor.",
        },
        {
          q: "Apakah file asli berubah?",
          a: "Tidak. Hasil crop dibuat sebagai file baru. File asli di perangkatmu tidak disentuh, dan tidak ada salinan yang diunggah ke server.",
        },
        {
          q: "Kenapa hasil crop terlihat kurang tajam?",
          a: "Jika area yang dipotong kecil lalu diperbesar, detail tidak bisa ditambahkan. Pilih kualitas keluaran yang tinggi dan hindari memperbesar hasil crop melebihi resolusi aslinya.",
        },
      ],
    },
    en: {
      steps: [
        {
          title: "Choose an image",
          body: "Add the image you want to crop, then pick a free ratio or the preset required by the form.",
        },
        {
          title: "Set the crop area",
          body: "Drag a corner or edge of the selection box. Everything outside it is removed from the result.",
        },
        {
          title: "Download the result",
          body: "Choose format and quality, then press Crop & download. The original file stays safe.",
        },
      ],
      tip: "For passport photos, use a 3×4 or 4×6 ratio, then double-check the pixel size and background requirements on the form.",
      faq: [
        {
          q: "How do I choose a 3×4 or 4×6 passport ratio?",
          a: "Select the 3×4 or 4×6 ratio in the Crop ratio panel. The selection box follows that ratio as you resize it. Once cropped, use the Image Resizer to reach the exact pixel dimensions requested.",
        },
        {
          q: "Can I crop freely?",
          a: "Yes. Choose the Free ratio to create a rectangle with any proportion. You can move and resize the selection before exporting.",
        },
        {
          q: "Does the original file change?",
          a: "No. The crop is created as a new file. Your original stays untouched on your device, and no copy is uploaded to a server.",
        },
        {
          q: "Why does the crop look less sharp?",
          a: "If you crop a small area and then enlarge it, new detail cannot be created. Choose high output quality and avoid upscaling the crop beyond its original resolution.",
        },
      ],
    },
  },
  pdfCompress: {
    id: {
      steps: [
        {
          title: "Tambahkan PDF",
          body: "Pilih satu atau beberapa file PDF. Nama, ukuran, dan jumlah halaman akan diperiksa sebelum diproses.",
        },
        {
          title: "Pilih level kompresi",
          body: "Rendah untuk kualitas terbaik, Sedang untuk dokumen sehari-hari, atau Tinggi untuk ukuran terkecil.",
        },
        {
          title: "Unduh hasil",
          body: "Pantau progress per halaman, lalu unduh PDF hasil kompresi satu per satu atau dalam ZIP.",
        },
      ],
      tip: "Simpan selalu salinan PDF asli. Kompresi merender ulang halaman menjadi gambar, jadi teks dan tautan tidak lagi interaktif.",
      faq: [
        {
          q: "Kenapa teks PDF tidak bisa diseleksi setelah dikompres?",
          a: "Agar ukuran turun signifikan, setiap halaman dirender ulang menjadi gambar JPEG. Teks berubah menjadi piksel sehingga tidak bisa dipilih, dicari, atau disalin, dan tautan hilang. Simpan file asli jika masih perlu mengeditnya.",
        },
        {
          q: "Level mana yang sebaiknya dipilih?",
          a: "Pilih Rendah untuk dokumen yang harus tetap terbaca jelas, Sedang untuk dokumen biasa yang akan diunggah atau dikirim, dan Tinggi untuk arsip atau saat batas ukuran sangat ketat.",
        },
        {
          q: "Apakah PDF saya aman dan privat?",
          a: "Ya. File dibaca dan diproses di browser. Tidak ada API unggahan dan tidak ada penyimpanan di server. Menutup tab akan menghentikan proses dan membebaskan memori.",
        },
        {
          q: "Bagaimana dengan PDF berpassword atau rusak?",
          a: "PDF berpassword dan PDF rusak akan ditandai dengan pesan yang jelas dan tidak diproses. Buka proteksi atau perbaiki file terlebih dahulu, lalu tambahkan kembali ke antrean.",
        },
        {
          q: "Mengapa hasil kompresi bisa lebih besar dari aslinya?",
          a: "File asli mungkin sudah sangat teroptimasi atau berisi teks vektor yang ringkas. Jika hasil render ulang justru lebih besar, gunakan file asli atau coba mode Perkecil PDF ke Target dengan target yang lebih tinggi.",
        },
      ],
    },
    en: {
      steps: [
        {
          title: "Add PDFs",
          body: "Choose one or more PDF files. Name, size, and page count are checked before processing.",
        },
        {
          title: "Pick a compression level",
          body: "Low for the best quality, Medium for everyday documents, or High for the smallest size.",
        },
        {
          title: "Download results",
          body: "Watch per-page progress, then download compressed PDFs individually or as a ZIP.",
        },
      ],
      tip: "Always keep a copy of the original PDF. Compression re-renders pages as images, so text and links are no longer interactive.",
      faq: [
        {
          q: "Why can’t I select PDF text after compressing?",
          a: "To reduce size significantly, each page is re-rendered as a JPEG image. Text becomes pixels, so it cannot be selected, searched, or copied, and links are lost. Keep the original file if you still need to edit it.",
        },
        {
          q: "Which level should I choose?",
          a: "Choose Low for documents that must stay very readable, Medium for normal uploads or email, and High for archives or when the size limit is extremely tight.",
        },
        {
          q: "Is my PDF safe and private?",
          a: "Yes. The file is read and processed in your browser. There is no upload API and no server-side storage. Closing the tab stops processing and frees memory.",
        },
        {
          q: "What about password-protected or corrupted PDFs?",
          a: "Password-protected and corrupted PDFs are flagged with a clear message and are not processed. Remove the protection or repair the file first, then add it back to the queue.",
        },
        {
          q: "Why can the compressed result be larger?",
          a: "The original may already be highly optimized or contain compact vector text. If re-rendering makes it larger, use the original file or try PDF Size Reducer with a higher target.",
        },
      ],
    },
  },
  pdfReduce: {
    id: {
      steps: [
        {
          title: "Tambahkan PDF",
          body: "Pilih satu PDF yang ingin dikecilkan. Jumlah halaman dan ukuran awal akan ditampilkan.",
        },
        {
          title: "Tentukan target",
          body: "Masukkan angka dan pilih KB atau MB, atau gunakan preset 100 KB hingga 2 MB.",
        },
        {
          title: "Unduh hasil terbaik",
          body: "Sistem mencoba beberapa tingkat kualitas dan resolusi. Unduh hasil yang memenuhi target, atau hasil terkecil dengan penjelasan bila target tidak tercapai.",
        },
      ],
      tip: "Target 100–500 KB biasanya cocok untuk formulir. PDF dengan banyak foto akan lebih mudah dikecilkan daripada PDF teks murni.",
      faq: [
        {
          q: "Bagaimana jika target ukuran tidak tercapai?",
          a: "Alat menampilkan hasil terkecil yang bisa dibuat beserta ukurannya, lalu menyarankan target lebih besar, mengurangi jumlah halaman, atau menggunakan dokumen dengan gambar yang lebih sederhana. Kamu tetap bisa mengunduh hasil terbaik tersebut.",
        },
        {
          q: "Kenapa prosesnya lebih lama dari kompresi biasa?",
          a: "Setiap percobaan merender ulang semua halaman pada resolusi dan kualitas berbeda. Alat berhenti begitu target tercapai, tetapi PDF dengan banyak halaman membutuhkan waktu lebih lama. Kamu bisa membatalkan kapan saja.",
        },
        {
          q: "Apakah teks tetap bisa dicari?",
          a: "Tidak pada hasil yang dirender. Untuk mencapai ukuran target, halaman diubah menjadi gambar JPEG. Jika teks harus tetap bisa dicari, gunakan PDF Page Optimizer dengan mode Pertahankan struktur asli, meskipun pengurangan ukurannya lebih kecil.",
        },
        {
          q: "Apakah file saya diunggah?",
          a: "Tidak. Semua percobaan berjalan di perangkatmu. Tidak ada file yang dikirim ke server dan tidak ada hasil yang disimpan setelah tab ditutup.",
        },
      ],
    },
    en: {
      steps: [
        {
          title: "Add a PDF",
          body: "Choose the PDF you want to reduce. Its page count and original size are shown.",
        },
        {
          title: "Set a target",
          body: "Enter a number and choose KB or MB, or use a preset from 100 KB to 2 MB.",
        },
        {
          title: "Download the best result",
          body: "The tool tries several quality and resolution levels. Download a result that meets the target, or the smallest result with an explanation if the target is impossible.",
        },
      ],
      tip: "A 100–500 KB target usually suits forms. PDFs with many photos shrink far more easily than text-only PDFs.",
      faq: [
        {
          q: "What if the target size cannot be reached?",
          a: "The tool shows the smallest result it can produce along with its size, then suggests a larger target, fewer pages, or a document with simpler images. You can still download the best result.",
        },
        {
          q: "Why does it take longer than normal compression?",
          a: "Each attempt re-renders every page at a different resolution and quality. The tool stops as soon as the target is met, but PDFs with many pages take longer. You can cancel at any time.",
        },
        {
          q: "Can the text still be searched?",
          a: "Not in a re-rendered result. To reach the target, pages are converted to JPEG images. If searchable text is essential, use PDF Page Optimizer with Keep original structure, though the size reduction will be smaller.",
        },
        {
          q: "Is my file uploaded?",
          a: "No. Every attempt runs on your device. Nothing is sent to a server, and no result is stored after you close the tab.",
        },
      ],
    },
  },
  pdfOrganize: {
    id: {
      steps: [
        {
          title: "Muat PDF",
          body: "Pilih file PDF. Semua halaman ditampilkan sebagai thumbnail dengan nomor asli.",
        },
        {
          title: "Rapikan halaman",
          body: "Tarik kartu untuk mengubah urutan, putar halaman yang miring, dan hapus halaman yang tidak diperlukan.",
        },
        {
          title: "Pilih mode dan unduh",
          body: "Pertahankan struktur asli untuk teks yang tetap bisa dicari, atau render ulang untuk pengurangan ukuran. Lalu unduh PDF baru.",
        },
      ],
      tip: "Gunakan mode Pertahankan struktur asli untuk dokumen penting. Render ulang paling berguna untuk hasil pindai atau berkas yang hanya perlu dibaca.",
      faq: [
        {
          q: "Apakah menghapus halaman mengubah file asli?",
          a: "Tidak. Semua perubahan diterapkan pada PDF baru yang kamu unduh. File asli di perangkat tetap utuh, dan kamu bisa mengatur ulang urutan kapan saja sebelum mengekspor.",
        },
        {
          q: "Apakah teks tetap bisa dipilih?",
          a: "Pada mode Pertahankan struktur asli, halaman disalin tanpa render ulang sehingga teks dan tautan tetap utuh. Mode render ulang mengubah halaman menjadi gambar agar ukuran lebih kecil, tetapi teks tidak lagi bisa dipilih.",
        },
        {
          q: "Bagaimana mengatur urutan di layar sentuh?",
          a: "Tahan dan tarik kartu halaman untuk memindahkannya. Setiap kartu juga memiliki tombol putar dan hapus berukuran besar yang ramah sentuhan.",
        },
        {
          q: "Apakah hasil otomatis lebih kecil?",
          a: "Mode struktur asli biasanya hanya memberi pengurangan kecil karena mempertahankan data asli. Untuk pengurangan lebih besar, pilih mode Kualitas tinggi, Seimbang, atau Ukuran kecil, dan aktifkan hitam-putih untuk dokumen hasil pindai.",
        },
      ],
    },
    en: {
      steps: [
        {
          title: "Load a PDF",
          body: "Choose a PDF file. Every page appears as a thumbnail with its original page number.",
        },
        {
          title: "Organize pages",
          body: "Drag cards to reorder, rotate skewed pages, and delete pages you do not need.",
        },
        {
          title: "Pick a mode and download",
          body: "Keep the original structure for searchable text, or re-render to reduce size. Then download the new PDF.",
        },
      ],
      tip: "Use Keep original structure for important documents. Re-rendering is most useful for scans or files that only need to be read.",
      faq: [
        {
          q: "Does deleting pages change the original file?",
          a: "No. All changes are applied to a new PDF you download. The original stays intact on your device, and you can reset the order at any time before exporting.",
        },
        {
          q: "Can the text still be selected?",
          a: "In Keep original structure mode, pages are copied without re-rendering, so text and links remain intact. Re-render modes turn pages into images for a smaller file, making text unselectable.",
        },
        {
          q: "How do I reorder pages on a touch screen?",
          a: "Press and drag a page card to move it. Every card also has large, touch-friendly rotate and delete buttons.",
        },
        {
          q: "Will the result automatically be smaller?",
          a: "Keep original structure usually gives only a modest reduction because it preserves original data. For larger savings, choose High quality, Balanced, or Small, and enable black and white for scanned documents.",
        },
      ],
    },
  },
  pdfMerge: {
    id: {
      steps: [
        {
          title: "Tambahkan PDF",
          body: "Pilih dua file atau lebih. Setiap file diperiksa, lalu nama, ukuran, dan jumlah halaman ditampilkan.",
        },
        {
          title: "Atur urutan",
          body: "Tarik file untuk mengubah urutan, gunakan tombol naik/turun, dan hapus file yang tidak ingin digabung.",
        },
        {
          title: "Gabung dan unduh",
          body: "Tekan Gabung PDF, tunggu proses selesai, lalu unduh hasilnya. Kamu juga bisa langsung memperkecil hasilnya ke ukuran target.",
        },
      ],
      tip: "Periksa urutan sebelum menggabung. Hasil mengikuti urutan daftar di layar, dari atas ke bawah.",
      faq: [
        {
          q: "Bagaimana mengubah urutan file sebelum digabung?",
          a: "Tarik kartu file ke posisi yang diinginkan, atau gunakan tombol naik dan turun pada setiap item untuk pengguna keyboard dan layar sentuh. Nomor urut di layar menunjukkan urutan halaman dalam hasil akhir.",
        },
        {
          q: "Apakah teks dan tautan PDF tetap utuh?",
          a: "Ya. Penggabungan menyalin halaman asli tanpa render ulang, sehingga teks, tautan, dan kualitas tetap dipertahankan. Ukuran hasil kira-kira merupakan jumlah file asal dikurangi sebagian data duplikat.",
        },
        {
          q: "Bagaimana jika ada PDF berpassword?",
          a: "File tersebut akan ditandai dengan pesan yang jelas dan tidak bisa digabung. Buka proteksinya terlebih dahulu menggunakan aplikasi PDF, lalu tambahkan kembali. File PDF rusak juga ditolak dengan pesan ramah.",
        },
        {
          q: "Apakah file PDF diunggah ke server?",
          a: "Tidak. Penggabungan menggunakan pdf-lib di browser. File hanya berada di memori perangkat, dan hasilnya diunduh langsung tanpa pernah meninggalkan browser.",
        },
        {
          q: "Bisakah hasil gabungan diperkecil lagi?",
          a: "Bisa. Setelah penggabungan, tekan Perkecil ukuran hasil. Hasil akan dibawa ke alat Perkecil PDF ke Target agar kamu bisa menentukan batas ukuran akhir tanpa mengunggah ulang secara manual.",
        },
      ],
    },
    en: {
      steps: [
        {
          title: "Add PDFs",
          body: "Choose two or more files. Each file is checked, then its name, size, and page count are shown.",
        },
        {
          title: "Set the order",
          body: "Drag files to reorder, use the up and down buttons, and remove anything you do not want merged.",
        },
        {
          title: "Merge and download",
          body: "Press Merge PDFs, wait for processing, then download the result. You can also reduce it to a target size right away.",
        },
      ],
      tip: "Check the order before merging. The result follows the list on screen, from top to bottom.",
      faq: [
        {
          q: "How do I change the file order before merging?",
          a: "Drag a file card to the desired position, or use the up and down buttons on each item for keyboard and touch use. The numbers on screen match the page order in the final result.",
        },
        {
          q: "Are PDF text and links preserved?",
          a: "Yes. Merging copies the original pages without re-rendering, preserving text, links, and quality. The result size is roughly the sum of the inputs minus some duplicated data.",
        },
        {
          q: "What about password-protected PDFs?",
          a: "They are clearly flagged and cannot be merged. Remove the protection with a PDF app first, then add the file again. Corrupted PDFs are also rejected with a friendly message.",
        },
        {
          q: "Are PDFs uploaded to a server?",
          a: "No. Merging uses pdf-lib in your browser. Files exist only in device memory, and the result downloads directly without ever leaving the browser.",
        },
        {
          q: "Can the merged result be compressed further?",
          a: "Yes. After merging, press Reduce the result size. The file is handed to the PDF Size Reducer so you can set a final size limit without manually uploading it again.",
        },
      ],
    },
  },
};
