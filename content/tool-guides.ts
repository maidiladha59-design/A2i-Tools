import type { Bilingual, ContentSection } from "@/content/types";
import type { FaqEntry } from "@/content/faqs";
import type { ToolId } from "@/lib/tools/registry";

export type ToolGuide = {
  lead: string;
  sections: ContentSection[];
  extraFaq: FaqEntry[];
};

export const TOOL_GUIDES: Record<ToolId, Bilingual<ToolGuide>> = {
  imageCompress: {
    id: {
      lead: "Kompres Gambar dipakai kalau file masih terlalu berat setelah diubah ukurannya, atau kalau kamu perlu memproses banyak foto sekaligus. Tiga mode tersedia, dan semuanya berjalan di Web Worker sehingga halaman tetap bisa kamu pakai selama proses berlangsung.",
      sections: [
        {
          heading: "Pilih mode berdasarkan pekerjaannya, bukan berdasarkan kebiasaan",
          paragraphs: [
            "Mode Otomatis memakai sekitar 80% kualitas dan cocok untuk foto sehari-hari yang hanya perlu sedikit dikecilkan. Mode Manual memberi kendali penuh ketika kamu sedang mengejar tampilan tertentu, misalnya menjaga teks kecil pada tangkapan layar tetap terbaca.",
            "Mode Target ukuran dipakai saat ada batas unggahan yang harus dipatuhi. Masukkan 100 dengan satuan KB, dan alat menguji beberapa tingkat kualitas serta resolusi sampai menemukan hasil terbaik di bawah batas tersebut.",
          ],
        },
        {
          heading: "Beda jenis gambar, beda batas penurunannya",
          paragraphs: [
            "Foto punya banyak detail halus sehingga kompresi JPEG bekerja efektif. PNG berisi teks, logo, atau grafik bergaris tipis justru sering membandel karena formatnya lossless; slider kualitas tidak berpengaruh padanya.",
            "Kalau PNG tidak mau mengecil, ganti format keluaran ke WebP atau turunkan resolusi. Selalu pakai penggeser sebelum dan sesudah untuk memastikan tulisan dan wajah masih layak sebelum file dikirim ke formulir.",
          ],
        },
      ],
      extraFaq: [
        {
          q: "Berapa ukuran maksimal file gambar?",
          a: "Satu gambar maksimal 50 MB dan satu antrean berisi 20 gambar. Batas ini melindungi memori browser, terutama di ponsel. Bila file lebih besar, potong atau ubah ukurannya lebih dulu di alat lain lalu kompres hasilnya.",
        },
      ],
    },
    en: {
      lead: "Reach for the image compressor when a file is still too heavy after resizing, or when you have many photos to process at once. Three modes are available and all of them run inside a Web Worker, so the page stays usable while the work happens.",
      sections: [
        {
          heading: "Pick the mode that matches the job, not the habit",
          paragraphs: [
            "Automatic mode uses roughly 80% quality and suits everyday photos that only need a light reduction. Manual mode gives you full control when a specific look matters, such as keeping small text in a screenshot readable.",
            "Size target mode is for hard upload limits. Enter 100 with KB selected and the tool tests several quality and resolution levels until it finds the best result under the limit.",
          ],
        },
        {
          heading: "Different image types hit different ceilings",
          paragraphs: [
            "Photos contain fine detail, so JPEG compression works well on them. PNG files with text, logos, or thin line art often resist change because the format is lossless, and the quality slider does nothing to them.",
            "When a PNG refuses to shrink, switch the output to WebP or lower the resolution. Use the before and after slider every time to confirm faces and text still look right before you upload.",
          ],
        },
      ],
      extraFaq: [
        {
          q: "What is the maximum image size?",
          a: "Each image can be up to 50 MB, and one queue holds up to 20 images. The limit protects browser memory, especially on phones. For larger files, crop or resize first with another tool, then compress the result.",
        },
      ],
    },
  },
  imageResize: {
    id: {
      lead: "Ubah Ukuran Gambar dipakai saat formulir menentukan dimensi piksel, bukan sekadar ukuran file. Alat ini bekerja dengan satu gambar dalam satu waktu, mengunci rasio bila kamu tidak ingin hasilnya gepeng, dan menampilkan dimensi asli sebelum kamu mengetik angka baru.",
      sections: [
        {
          heading: "Turunkan resolusi lebih dulu, baru kompres",
          paragraphs: [
            "Batas unggahan 100 KB atau 300 KB hampir selalu lebih mudah dicapai dengan memperkecil dimensi daripada menurunkan kualitas JPEG sampai teks menjadi pecah. Foto ponsel 4000 piksel bisa diturunkan ke 1200 piksel tanpa terlihat buruk di layar.",
            "Setelah dimensi sesuai, jalankan Kompres Gambar dengan target ukuran. Urutan ini menjaga detail tetap utuh dan menghindari hasil yang terlihat seperti watermark.",
          ],
          bullets: [
            "Naik ukuran (upscale) tidak menambah detail baru; hasilnya hanya lebih lembut.",
            "Nilai dimensi yang diterima berada di antara 16 dan 8000 piksel.",
            "Kualitas hanya berlaku untuk JPG dan WebP, tidak untuk PNG.",
          ],
        },
        {
          heading: "Preset untuk unggahan media sosial dan pas foto",
          paragraphs: [
            "Preset 1080×1080, 1080×1350, 1080×1920, dan 1920×1080 mengikuti rasio feed, poster, dan story sehingga kamu tidak perlu menghitung manual. Untuk pas foto, preset hanya mengatur piksel; rasio wajib dipotong lebih dulu di Potong Gambar agar wajah tidak terpotong asal.",
          ],
        },
      ],
      extraFaq: [
        {
          q: "Berapa ukuran file maksimal yang bisa diubah?",
          a: "Satu gambar maksimal 50 MB dan hanya satu gambar per proses. Kalau hasilnya masih berat, lanjutkan ke Kompres Gambar dengan mode target agar dimensi dan ukuran file sama-sama sesuai syarat formulir.",
        },
        {
          q: "Kenapa hasil ubah ukuran masih besar?",
          a: "Karena format keluaran dan kualitasnya masih tinggi, atau gambar asalnya PNG. Ubah format ke WebP, turunkan kualitas ke 80–85%, atau perkecil dimensi sisi terpanjang. PNG bersifat lossless sehingga sulit dikecilkan tanpa ganti format.",
        },
      ],
    },
    en: {
      lead: "Use the image resizer when a form specifies pixel dimensions rather than a file size. It works on one image at a time, keeps the aspect ratio locked so nothing looks stretched, and shows the original dimensions before you type a new number.",
      sections: [
        {
          heading: "Resize first, compress second",
          paragraphs: [
            "A 100 KB or 300 KB upload limit is usually easier to meet by lowering dimensions than by pushing JPEG quality down until text breaks apart. A 4000 pixel phone photo can drop to 1200 pixels and still look fine on screen.",
            "Once the dimensions are right, run the image compressor with a size target. That order keeps detail intact and avoids results that look like a cheap watermark.",
          ],
          bullets: [
            "Upscaling never adds detail; it only makes edges softer.",
            "Accepted dimensions are between 16 and 8000 pixels.",
            "Quality affects JPG and WebP only, not PNG.",
          ],
        },
        {
          heading: "Presets for social posts and passport photos",
          paragraphs: [
            "The 1080×1080, 1080×1350, 1080×1920, and 1920×1080 presets follow feed, poster, and story ratios, so you do not have to do the math. For passport photos a preset only sets pixels; crop the ratio first in the Image Cropper so the face is not cut off randomly.",
          ],
        },
      ],
      extraFaq: [
        {
          q: "What is the maximum file size for resizing?",
          a: "One image up to 50 MB, and the tool handles one image per run. If the output is still heavy, continue to the Image Compressor with a size target so both dimensions and file size match the form requirements.",
        },
        {
          q: "Why is my resized image still large?",
          a: "Because the output format and quality are still high, or the source is a PNG. Switch to WebP, set quality to 80–85%, or shorten the longest edge. PNG is lossless, so it barely shrinks without a format change.",
        },
      ],
    },
  },
  imageConvert: {
    id: {
      lead: "Konversi Gambar dipakai ketika sistem tujuan hanya menerima format tertentu, atau ketika kamu ingin file lebih ringan tanpa mengubah dimensinya. Alat ini membaca JPG, PNG, dan WebP di browser lalu menulis ulang ke format yang kamu pilih.",
      sections: [
        {
          heading: "Format mana yang harus dipilih",
          paragraphs: [
            "JPG paling cocok untuk foto dan menghasilkan file kecil, tetapi tidak mendukung latar transparan. PNG menjaga transparansi dan garis tipis, sehingga tepat untuk logo, screenshot teks, dan ilustrasi. WebP memberi ukuran lebih kecil pada tampilan setara dan tetap mendukung transparansi.",
            "Kalau ragu, konversi ke WebP untuk unggahan web dan ke JPG untuk formulir lama yang menolak format baru. Perhatikan ukuran hasil sebelum mengunduh; alat menampilkan ukuran akhir tiap file.",
          ],
        },
        {
          heading: "Yang berubah dan yang hilang saat konversi",
          paragraphs: [
            "Setiap konversi menyingkirkan metadata EXIF, termasuk data kamera dan lokasi. Untuk gambar PNG berlayer atau animasi GIF, hasil konversi menjadi satu frame statis karena pemrosesan memakai canvas.",
          ],
        },
      ],
      extraFaq: [
        {
          q: "Kenapa file hasil konversi tidak ikut mengecil?",
          a: "Karena konversi hanya mengganti wadah. JPG mutu tinggi tetap berat meski disimpan sebagai PNG. Untuk mengecilkan, pakai Kompres Gambar dengan mode target ukuran, atau turunkan dulu resolusinya di Ubah Ukuran Gambar.",
        },
        {
          q: "Berapa ukuran dan jumlah file maksimal?",
          a: "Satu gambar dibatasi 50 MB dan satu antrean memuat hingga 20 file. Format BMP dan GIF statis juga bisa dibaca, sementara HEIC bergantung pada dukungan browsermu.",
        },
      ],
    },
    en: {
      lead: "Use the image converter when the destination only accepts a specific format, or when you want a smaller file without touching the dimensions. The tool reads JPG, PNG, and WebP in your browser and writes them back in the format you pick.",
      sections: [
        {
          heading: "Which format to choose",
          paragraphs: [
            "JPG suits photos and produces small files but has no transparency. PNG keeps transparency and thin lines, which makes it right for logos, text screenshots, and illustrations. WebP gives smaller files at similar quality and still supports transparency.",
            "When in doubt, convert to WebP for web uploads and to JPG for older portals that reject newer formats. Check the output size before downloading; the final size is shown for every file.",
          ],
        },
        {
          heading: "What changes and what is lost",
          paragraphs: [
            "Every conversion removes EXIF metadata, including camera data and location. Layered PNGs and animated GIFs come out as a single static frame because processing goes through canvas.",
          ],
        },
      ],
      extraFaq: [
        {
          q: "Why did converting not make the file smaller?",
          a: "Because conversion only changes the container. A high quality JPG stays heavy when saved as PNG. To actually shrink it, use the Image Compressor with a size target, or reduce the resolution first in the Image Resizer.",
        },
        {
          q: "What are the size and file count limits?",
          a: "Each image is capped at 50 MB and a queue holds up to 20 files. BMP and static GIF can also be read, while HEIC depends on your browser's support.",
        },
      ],
    },
  },
  imageCrop: {
    id: {
      lead: "Potong Gambar dipakai ketika komposisi harus diubah, misalnya pas foto 3×4 dari potret setengah badan atau screenshot yang masih penuh baris tidak relevan. Kamu menggeser area pilihannya langsung di browser, jadi hasilnya bisa diperiksa sebelum diunduh.",
      sections: [
        {
          heading: "Alur pas foto yang benar",
          paragraphs: [
            "Mulai dari foto asli, bukan hasil kompresi sebelumnya. Pilih rasio 3×4 atau 4×6, letakkan wajah di tengah dengan ruang dahi yang cukup, lalu potong. Setelah itu atur dimensi piksel bila formulir mensyaratkan angka tertentu, misalnya 300×400 piksel.",
            "Rasio dan piksel adalah dua syarat berbeda. Memotong ke 3×4 tidak otomatis membuat file menjadi 100 KB, jadi lanjutkan ke Kompres Gambar dengan mode target sebagai langkah terakhir.",
          ],
          bullets: [
            "Pegang sudut kotak untuk mengubah ukuran area pilihan.",
            "Rasio bebas cocok untuk komposisi biasa; preset pas foto menjaga proporsi wajah.",
            "Kualitas keluaran hanya berpengaruh pada JPG dan WebP.",
          ],
        },
        {
          heading: "Ketika memotong justru merusak",
          paragraphs: [
            "Jangan memaksakan rasio dengan memotong dokumen, tangkapan layar berisi tabel, atau foto berisi teks kecil. Untuk kebutuhan itu, lebih baik ubah ukuran atau konversi format supaya seluruh isi tetap terbaca.",
          ],
        },
      ],
      extraFaq: [
        {
          q: "Berapa ukuran maksimal gambar yang bisa dipotong?",
          a: "Satu gambar maksimal 50 MB, dan alat memproses satu gambar dalam satu waktu. Foto beresolusi sangat tinggi tetap aman karena pemotongan dilakukan di canvas perangkatmu tanpa unggahan.",
        },
        {
          q: "Apakah gambar hasil potongan kehilangan metadata?",
          a: "Ya. Karena hasil ditulis ulang melalui canvas, metadata EXIF seperti waktu ambil dan lokasi tidak ikut tersimpan. Simpan salinan asli bila kamu memerlukan catatan tersebut.",
        },
      ],
    },
    en: {
      lead: "Use the image cropper when the composition itself must change, for example a 3×4 portrait cut from a half-body photo or a screenshot full of irrelevant rows. You drag the selection directly in the browser, so the result can be reviewed before download.",
      sections: [
        {
          heading: "The right passport photo workflow",
          paragraphs: [
            "Start from the original photo, not from a file you already compressed. Choose a 3×4 or 4×6 ratio, centre the face with enough forehead space, then crop. Set pixel dimensions afterwards if the form asks for a specific value such as 300×400 pixels.",
            "Ratio and pixels are two separate requirements. Cropping to 3×4 does not magically produce a 100 KB file, so finish with the Image Compressor in size target mode.",
          ],
          bullets: [
            "Drag a corner handle to change the selection size.",
            "Free ratio works for ordinary compositions; passport presets protect face proportions.",
            "Output quality only affects JPG and WebP.",
          ],
        },
        {
          heading: "When cropping does more harm than good",
          paragraphs: [
            "Do not force a ratio onto documents, table screenshots, or photos containing small text. For those, resizing or converting the format keeps everything readable instead of cutting information away.",
          ],
        },
      ],
      extraFaq: [
        {
          q: "What is the maximum image size for cropping?",
          a: "One image up to 50 MB, processed one at a time. Very high resolution photos remain safe to handle because cropping happens on your device canvas with no upload.",
        },
        {
          q: "Do cropped images lose metadata?",
          a: "Yes. Because the output is written through canvas, EXIF data such as capture time and location is not carried over. Keep an untouched original if you need those records.",
        },
      ],
    },
  },
  pdfCompress: {
    id: {
      lead: "Kompres PDF dipakai ketika dokumen harus diringkas tanpa syarat angka tertentu, misalnya laporan internal atau lampiran email. Tiga level tersedia dan prosesnya berjalan halaman demi halaman dengan progress, sehingga PDF besar tidak membuat tab macet.",
      sections: [
        {
          heading: "Memilih level tanpa mencoba berkali-kali",
          paragraphs: [
            "Mulai dari level Rendah bila dokumen masih akan dibaca di layar dan detailnya penting; pengurangan ukurannya paling kecil tetapi kualitasnya paling terjaga. Level Sedang pas untuk sebagian besar dokumen sehari-hari, dan level Tinggi untuk arsip yang hanya perlu terbaca sesekali.",
            "Kalau hasilnya tidak lebih kecil dari aslinya, alat memberi tahu dan menyarankan level Tinggi atau Perkecil PDF ke Target. PDF yang sudah dikompresi sebelumnya, misalnya ekspor dari Google Docs, biasanya memang sulit diringkas lagi.",
          ],
        },
        {
          heading: "Konsekuensi yang perlu kamu putuskan sebelum mulai",
          paragraphs: [
            "Ketiga level bekerja dengan cara yang sama: setiap halaman digambar ulang ke kanvas, lalu disisipkan sebagai JPEG. Yang membedakan hanya ketajaman dan tingkat kompresinya. Karena itu teks di hasil akhir tidak bisa diseleksi atau dicari lagi dan tautan ikut hilang, padahal PDF aslinya masih menyimpan keduanya.",
            "Kalau dokumen memang masih akan diedit, dicari, atau diisi formulir, simpan file asli dan pakai PDF Page Optimizer dengan mode Pertahankan struktur asli. Mode itu hanya menyusun ulang halaman tanpa merender gambarnya, sehingga teks tetap hidup meski pengurangan ukurannya tidak seagresif level Tinggi.",
          ],
        },
      ],
      extraFaq: [
        {
          q: "Berapa ukuran PDF maksimal dan berapa lama prosesnya?",
          a: "Satu PDF maksimal 100 MB, dan antrean memuat hingga 20 file. Waktu proses tergantung jumlah halaman serta isi halaman; dokumen penuh foto scanned lebih lama daripada dokumen teks. Kamu bisa membatalkan kapan saja.",
        },
      ],
    },
    en: {
      lead: "Use PDF compression when a document simply needs to get lighter without a specific number to hit, for example an internal report or an email attachment. Three levels are available and pages are processed one by one with progress, so a large PDF will not freeze the tab.",
      sections: [
        {
          heading: "Choosing a level without trial and error",
          paragraphs: [
            "Start with Low when the document will be read on screen and detail matters; it saves the least size but keeps the most quality. Medium covers most everyday documents, and High is for archives that only need to be readable occasionally.",
            "If the result is not smaller than the original, the tool says so and suggests High or the PDF Size Reducer. PDFs that were already compressed, such as Google Docs exports, are often genuinely hard to shrink further.",
          ],
        },
        {
          heading: "The trade-off to decide on before you start",
          paragraphs: [
            "All three levels work the same way: each page is redrawn on a canvas and inserted as a JPEG. Only the sharpness and the compression strength differ. Text in the result can no longer be selected or searched and links stop working, even though the original PDF still has both.",
            "If the document still needs editing, searching, or form filling, keep the original file and use PDF Page Optimizer in Keep original structure mode. That mode only rearranges pages without re-rendering them, so live text survives even though the savings are smaller than the High level delivers.",
          ],
        },
      ],
      extraFaq: [
        {
          q: "What is the maximum PDF size and how long does it take?",
          a: "Each PDF can be up to 100 MB and the queue holds 20 files. Speed depends on page count and content; scanned photo pages take longer than text pages. You can cancel at any point.",
        },
      ],
    },
  },
  pdfReduce: {
    id: {
      lead: "Perkecil PDF ke Target dipakai saat portal menetapkan angka yang harus dipatuhi, misalnya batas 1 MB atau 2 MB pada portal lamaran kerja. Kamu memasukkan target dalam KB atau MB, lalu alat menurunkan resolusi dan kualitas JPEG secara bertahap sampai file masuk.",
      sections: [
        {
          heading: "Cara mengejar target dengan hasil tetap layak",
          paragraphs: [
            "Pilih preset umum 100 KB, 200 KB, 500 KB, 1 MB, atau 2 MB bila portal memakainya. Untuk angka lain, ketik manual; nilai yang diterima berada di antara 1 KB dan 100 MB. Semakin ketat target, semakin lama proses karena lebih banyak percobaan.",
            "Sebelum mengunggah, buka hasil dan periksa halaman berisi teks kecil, stempel, atau tanda tangan. Bila elemen itu tidak terbaca, angka targetmu terlalu kecil untuk dokumen ini — portal umumnya tetap menolak hasil yang tidak bisa dibaca meski ukurannya masuk.",
          ],
        },
        {
          heading: "Saat target tidak tercapai",
          paragraphs: [
            "Alat selalu menampilkan hasil terkecil yang berhasil dibuat beserta ukuran akhirnya, dan memberi tahu bila target meleset. Tidak ada proses diam-diam: kamu memutuskan sendiri apakah hasil itu layak dipakai atau dokumen perlu dipotong halamannya lebih dulu di PDF Page Optimizer.",
          ],
        },
      ],
      extraFaq: [
        {
          q: "Berapa ukuran PDF maksimal yang diterima?",
          a: "Satu file maksimal 100 MB. PDF berisi banyak halaman beresolusi tinggi tetap diproses bertahap agar tab stabil, dan proteksi kata sandi harus dilepas lebih dulu karena file terkunci tidak bisa dibaca.",
        },
        {
          q: "Kenapa hasil perkecil masih di atas target?",
          a: "Karena kualitas minimum yang masih bisa diterima sudah terlewati, atau halaman berisi foto hasil pindai dengan noise tinggi. Coba target yang sedikit lebih longgar, hapus halaman yang tidak perlu, atau pindai ulang dengan resolusi lebih rendah.",
        },
      ],
    },
    en: {
      lead: "Use the PDF size reducer when a portal demands a hard number, such as a 1 MB or 2 MB cap on a job application site. You enter a target in KB or MB and the tool steps resolution and JPEG quality down until the file fits.",
      sections: [
        {
          heading: "Hitting a target without ruining the document",
          paragraphs: [
            "Pick the common 100 KB, 200 KB, 500 KB, 1 MB, or 2 MB presets when the portal lists them. Any other number can be typed; accepted values run from 1 KB to 100 MB. Tighter targets take longer because more attempts are tested.",
            "Before uploading, open the result and check pages with small text, stamps, or signatures. If those are unreadable, the target is too small for this document — portals usually still reject an illegible file even when the size passes.",
          ],
        },
        {
          heading: "When the target cannot be reached",
          paragraphs: [
            "The tool always reports the smallest file it managed to produce, including the final size, and warns when the target is missed. Nothing happens silently: you decide whether the result is usable, or whether pages should first be removed in PDF Page Optimizer.",
          ],
        },
      ],
      extraFaq: [
        {
          q: "What is the maximum PDF size?",
          a: "One file up to 100 MB. Documents with many high resolution pages are still processed step by step to keep the tab stable, and password protection must be removed first because locked files cannot be read.",
        },
        {
          q: "Why is the reduced PDF still above my target?",
          a: "Because the tool reached the lowest quality that remains usable, or the pages are high noise scans. Try a slightly looser target, delete unnecessary pages, or rescan at lower resolution.",
        },
      ],
    },
  },
  pdfOrganize: {
    id: {
      lead: "Optimalkan Halaman PDF dipakai ketika struktur dokumen yang bermasalah: hasil pindai terbalik, halaman sampul tidak diperlukan, atau urutan bab tertukar. Kamu melihat pratinjau tiap halaman, menyeretnya ke posisi baru, lalu memilih mode keluaran sebelum menyimpan.",
      sections: [
        {
          heading: "Mode keluaran menentukan hasil akhir",
          paragraphs: [
            "Pertahankan struktur asli tidak merender ulang halaman, sehingga teks tetap bisa diseleksi, tautan tetap aktif, dan kualitas gambar tidak berubah — pengurangan ukurannya pun paling kecil. Mode Kualitas tinggi, Seimbang, dan Ukuran terkecil merender halaman menjadi gambar; file jauh lebih ringan tetapi teks tidak bisa dipilih lagi.",
            "Pilih Pertahankan struktur asli bila dokumennya akan dicari isinya atau dilampirkan untuk tanda tangan. Pilih render ulang bila tujuannya hanya memangkas ukuran untuk unggahan.",
          ],
        },
        {
          heading: "Alur beberes dokumen pindai",
          paragraphs: [
            "Putar halaman yang miring 90 derajat, buang halaman kosong di tengah dokumen, lalu susun ulang agar nomor halaman urut. Lakukan semuanya dalam satu kunjungan tanpa perlu aplikasi desktop, dan periksa ringkasan jumlah halaman sebelum mengunduh hasil.",
          ],
        },
      ],
      extraFaq: [
        {
          q: "Apakah PDF saya diunggah atau disimpan?",
          a: "Tidak. Halaman dibaca dan ditulis di memori browser memakai Web Worker. Tidak ada penamaan file di server, tidak ada penyimpanan, dan semua hilang saat tab ditutup.",
        },
        {
          q: "Berapa banyak halaman yang aman diproses?",
          a: "Ukuran file dibatasi 100 MB per PDF dan 20 PDF dalam satu antrean. Kalau gambar pratinjau halaman gagal dibuat, alat memberi tahu kamu dan tetap memproses dokumen tanpa pratinjau tersebut.",
        },
      ],
    },
    en: {
      lead: "Use PDF Page Optimizer when the structure is the problem: scanned pages upside down, cover sheets you do not need, or chapters in the wrong order. You preview every page, drag it to a new position, and choose an output mode before saving.",
      sections: [
        {
          heading: "The output mode decides the result",
          paragraphs: [
            "Keep original structure does not re-render pages, so text stays selectable, links keep working, and image quality is untouched — which also means the smallest size savings. High quality, Balanced, and Small size re-render pages into images; files get much lighter but text can no longer be selected.",
            "Choose Keep original structure when the document needs to be searchable or signed. Choose re-rendering when the only goal is meeting an upload limit.",
          ],
        },
        {
          heading: "A cleanup routine for scanned documents",
          paragraphs: [
            "Rotate pages that are 90 degrees off, drop blank pages stuck in the middle, then reorder so numbering runs correctly. All of it happens in one visit without a desktop app, and you can review the page count summary before downloading.",
          ],
        },
      ],
      extraFaq: [
        {
          q: "Is my PDF uploaded or stored?",
          a: "No. Pages are read and written in browser memory with a Web Worker. Nothing is named or kept on a server, and everything disappears when you close the tab.",
        },
        {
          q: "How many pages are safe to process?",
          a: "Each PDF is limited to 100 MB and a queue holds 20 files. On very long documents some previews may fail to load, but the main process continues and you are told when that happens.",
        },
      ],
    },
  },
  pdfMerge: {
    id: {
      lead: "Gabung PDF dipakai saat beberapa berkas harus menjadi satu lampiran: KTP, KK, ijazah, dan transkrip yang diminta diunggah dalam satu file. Alat membaca tiap PDF, menampilkan jumlah halaman, lalu menyusunnya sesuai urutan antreanmu.",
      sections: [
        {
          heading: "Urutan adalah bagian dari isi",
          paragraphs: [
            "Portal sering menetapkan urutan dokumen, misalnya identitas lebih dulu baru ijazah. Seret kartu file ke posisi yang benar atau gunakan tombol naik dan turun, dan pastikan ringkasan halaman sebelum dan sesudah digabung sesuai harapanmu.",
            "Hasil gabungan mempertahankan isi tiap halaman apa adanya: teks tetap bisa diseleksi dan gambar tidak dirender ulang. Karena tidak ada kompresi tambahan, ukuran akhir hampir selalu merupakan penjumlahan file-file aslinya.",
          ],
        },
        {
          heading: "Kalau hasil gabungan terlalu besar",
          paragraphs: [
            "Gabung lebih dulu, lalu jalankan Kompres PDF atau Perkecil PDF ke Target pada satu file hasilnya. Cara itu lebih efisien daripada memperkecil tiap dokumen secara terpisah karena pengaturan kompresi hanya perlu dicari satu kali.",
          ],
        },
      ],
      extraFaq: [
        {
          q: "Berapa banyak dan seberapa besar PDF yang bisa digabung?",
          a: "Minimal dua file dan maksimal dua puluh file, masing-masing tidak lebih dari 100 MB. File dengan nama dan ukuran yang sama terdeteksi sebagai duplikat sehingga tidak ikut masuk dua kali.",
        },
      ],
    },
    en: {
      lead: "Use PDF merge when several documents must become one attachment: ID card, family card, diploma, and transcript that a portal asks you to upload as a single file. The tool reads each PDF, shows its page count, and assembles them in the order you set.",
      sections: [
        {
          heading: "Order is part of the content",
          paragraphs: [
            "Portals often define a document order, for example identity first and diplomas later. Drag file cards into place or use the up and down buttons, and check the before and after page summary so nothing is missing.",
            "Merging keeps each page as it is: text stays selectable and images are not re-rendered. Because no extra compression happens, the final size is close to the sum of the originals.",
          ],
        },
        {
          heading: "When the merged file is too large",
          paragraphs: [
            "Merge first, then run PDF compression or the PDF size reducer on the single result. That is more efficient than shrinking each document separately because the compression settings only have to be found once.",
          ],
        },
      ],
      extraFaq: [
        {
          q: "How many PDFs can be merged and how large?",
          a: "At least two files and at most twenty, each under 100 MB. Files with the same name and size are detected as duplicates so they do not enter the output twice.",
        },
      ],
    },
  },
  imageToPdf: {
    id: {
      lead: "Gambar ke PDF dipakai untuk menyatukan hasil pindai ponsel, foto dokumen, atau screenshot menjadi satu berkas yang bisa dilampirkan. PDF dibuat di browser memakai pdf-lib, jadi tidak ada unggahan dan urutan halaman mengikuti antreanmu.",
      sections: [
        {
          heading: "Auto atau A4",
          paragraphs: [
            "Ukuran halaman Auto mengikuti rasio tiap gambar, sehingga cocok untuk foto dokumen yang dipotong seadanya tanpa tepi putih. Ukuran A4 menormalkan semua halaman ke kertas standar dengan margin putih dan orientasi otomatis, yang biasanya diminta pelamar kerja dan instansi.",
            "PNG ditulis ulang sebagai PNG lossless sehingga teks dan garis tipis tetap tajam, sedangkan JPG dan WebP diratakan ke latar putih lalu dienkode ulang sebagai JPEG kualitas tinggi supaya halaman tidak berbayang. Sisi terpanjang gambar dibatasi agar memori browser aman.",
          ],
        },
        {
          heading: "Menyiapkan antrean sebelum menekan buat PDF",
          paragraphs: [
            "Urutan halaman mengikuti urutan daftar, jadi seret file lebih dulu sampai susunannya benar. Satu batch menampung dua puluh gambar, dan setiap berkas dibatasi 50 MB agar memori browser aman.",
            "Hanya JPG, PNG, dan WebP yang diterima. Foto HEIC dari iPhone perlu diubah ke JPG lebih dahulu memakai alat Konversi Gambar, meskipun pembacaan HEIC bergantung pada browsermu. Hasilnya berupa halaman berbasis gambar, jadi teks di dalamnya tidak bisa dicari; kalau yang kamu butuhkan justru teks yang bisa disalin, gunakan alat Konversi PDF ke Word.",
          ],
        },
      ],
      extraFaq: [],
    },
    en: {
      lead: "Use Images to PDF to combine phone scans, photos of documents, or screenshots into one attachable file. The PDF is assembled in your browser with pdf-lib, so there is no upload and page order follows your queue.",
      sections: [
        {
          heading: "Auto or A4",
          paragraphs: [
            "Auto page size follows each image's ratio, which suits document photos cropped tight with no white border. A4 normalises every page to standard paper with a white margin and automatic orientation, which is what job applications and offices usually expect.",
            "PNG pages are re-written as lossless PNG so text and thin lines stay sharp, while JPG and WebP pages are flattened onto white and re-encoded as high quality JPEG so pages do not show shadow edges. The longest edge of every image is capped to protect browser memory.",
          ],
        },
        {
          heading: "Set the queue before you build the PDF",
          paragraphs: [
            "Page order follows the list order, so drag the files into the right sequence first. One batch holds twenty images and each file is capped at 50 MB to keep browser memory safe.",
            "Only JPG, PNG, and WebP are accepted. A HEIC photo from an iPhone needs converting to JPG first with the image converter, and HEIC decoding depends on your browser. The result is a page made of pixels, so its text is not searchable; if you need copyable text, use the PDF to Word converter instead.",
          ],
        },
      ],
      extraFaq: [],
    },
  },
  pdfToImage: {
    id: {
      lead: "PDF ke Gambar dipakai ketika formulir hanya menerima file gambar, ketika halaman perlu diunggah satu per satu, atau ketika kamu perlu melihat isi PDF di perangkat tanpa aplikasi pembaca. Tiap halaman dirender di browser sesuai DPI yang kamu pilih.",
      sections: [
        {
          heading: "Pilih format sesuai isinya",
          paragraphs: [
            "JPG memberi file kecil untuk halaman berisi foto, hasil pindai, atau halaman berwarna penuh; kualitas 88–95% masih menjaga teks terbaca. PNG adalah pilihan untuk halaman berisi tulisan kecil, diagram bergaris, atau logo karena tidak menambah artefak kompresi.",
            "DPI menaikkan ketajaman dan ukuran file secara bersamaan. 150 DPI cukup untuk membaca di layar, 300 DPI dipakai bila gambar masih perlu dicetak atau diperbesar.",
          ],
        },
      ],
      extraFaq: [
        {
          q: "Kenapa hasil ekspor gambarnya besar?",
          a: "Karena DPI tinggi dan format PNG bersifat lossless. Turunkan DPI ke 150, ganti ke JPG dengan kualitas 85–90%, atau unduh hanya halaman yang dibutuhkan alih-alih seluruh dokumen sebagai ZIP.",
        },
      ],
    },
    en: {
      lead: "Use PDF to Images when a form only accepts image files, when pages must be uploaded one by one, or when you need to read a PDF on a device without a PDF app. Each page is rendered in your browser at the DPI you choose.",
      sections: [
        {
          heading: "Pick the format that matches the page",
          paragraphs: [
            "JPG gives small files for pages full of photos, scans, or colour; 88–95% quality still keeps text legible. PNG is the choice for pages with small type, line diagrams, or logos because it adds no compression artefacts.",
            "Raising DPI increases sharpness and file size together. 150 DPI is fine for screen reading, while 300 DPI is for images that will be printed or zoomed.",
          ],
        },
      ],
      extraFaq: [
        {
          q: "Why are my exported images so large?",
          a: "High DPI plus lossless PNG is the usual reason. Drop to 150 DPI, switch to JPG at 85–90% quality, or download only the pages you need instead of the whole document as a ZIP.",
        },
      ],
    },
  },
  docxToPdf: {
    id: {
      lead: "Word ke PDF dipakai ketika pelamar, mahasiswa, atau pegawai harus mengirim dokumen yang tidak bisa diedit penerima. Isi .docx dibaca mammoth di browser, ditata ke halaman A4, lalu disimpan sebagai PDF tanpa satu byte pun keluar dari perangkatmu.",
      sections: [
        {
          heading: "Kapan alat ini terpakai dan kapan tidak",
          paragraphs: [
            "Alat ini pas untuk naskah berbasis teks: surat, ringkasan, daftar riwayat hidup, atau laporan sederhana yang perlu segera dikirim dan kamu sedang tidak punya Word. Font diganti dengan huruf sans yang mirip, sehingga tampilan akhir tidak identik dengan aslinya.",
            "Sebaliknya, skripsi dengan daftar isi otomatis, tabel berkolom sempit, atau dokumen dengan nomor halaman adalah pekerjaan Word atau LibreOffice. Bila penerima dokumen akan menyorot atau menyalin teks, ekspor PDF langsung dari aplikasi aslinya.",
          ],
        },
      ],
      extraFaq: [
        {
          q: "Kenapa jenis hurufnya berbeda dari dokumen saya?",
          a: "Karena konversi membaca struktur isi, bukan seluruh informasi gaya. Font khusus tidak selalu tersedia di browser sehingga teks dirender dengan huruf standar, dan ukuran huruf didekati agar tetap nyaman dibaca.",
        },
      ],
    },
    en: {
      lead: "Use Word to PDF when an applicant, student, or employee must send a document the recipient cannot edit. The .docx content is read by mammoth in your browser, laid out onto A4 pages, and saved as a PDF without a single byte leaving your device.",
      sections: [
        {
          heading: "When this tool helps and when it does not",
          paragraphs: [
            "It works well for text-based documents: letters, summaries, CVs, or simple reports that need to go out now and you have no Word available. Fonts are substituted with a similar sans-serif face, so the final look is close but not identical.",
            "A thesis with an automatic table of contents, narrow multi-column tables, or numbered pages is a job for Word or LibreOffice. If the recipient needs to highlight or copy text, export the PDF from the original application instead.",
          ],
        },
      ],
      extraFaq: [
        {
          q: "Why does the font look different from my document?",
          a: "Because the conversion reads document structure rather than every styling detail. Specialised fonts are not always available in a browser, so text is rendered with a standard face and sizes are approximated to stay readable.",
        },
      ],
    },
  },
  pdfToDocx: {
    id: {
      lead: "PDF ke Word dipakai ketika kamu perlu mengambil isi teks untuk ditulis ulang, misalnya mewarisi format laporan lama atau memperbaiki typo dokumen yang sumber aslinya hilang. pdf.js membaca lapisan teks tiap halaman, lalu hasilnya dikemas sebagai .docx yang bisa diedit.",
      sections: [
        {
          heading: "Ekspektasi hasil yang jujur",
          paragraphs: [
            "Yang keluar adalah teks: tiap baris menjadi paragraf, tiap halaman berteks dimulai di halaman baru, dan gaya asli seperti font, warna, tabel, serta gambar tidak ikut. Anggap hasilnya sebagai bahan baku, bukan salinan dokumen, lalu rapikan dengan gaya Word setelahnya.",
            "PDF hasil pindai tidak punya lapisan teks sehingga tidak menghasilkan apa pun; alat akan memperingatkanmu. Untuk kasus itu, ekspor halaman ke gambar lebih dulu lalu jalankan OCR.",
          ],
        },
      ],
      extraFaq: [
        {
          q: "Kenapa beberapa baris tersusun aneh?",
          a: "Ekstraksi teks bekerja berdasarkan posisi tiap potongan teks. Kolom majalah, teks di dalam bentuk, atau huruf yang berjarak lebar bisa tersusun ulang menjadi baris terpisah. Ini keterbatasan ekstraksi teks PDF, bukan kerusakan file.",
        },
      ],
    },
    en: {
      lead: "Use PDF to Word when you need the words themselves to rewrite — inheriting an old report format, or fixing a document whose original file was lost. pdf.js reads the text layer of each page and the result is packaged as an editable .docx.",
      sections: [
        {
          heading: "Honest expectations",
          paragraphs: [
            "What you get is text: each line becomes a paragraph, each page with text starts on a new page, and original styling such as fonts, colours, tables, and images is not carried over. Treat the file as raw material, not a copy, then restyle it in Word.",
            "Scanned PDFs have no text layer, so they produce nothing and the tool warns you. For those, export pages as images first and run OCR.",
          ],
        },
      ],
      extraFaq: [
        {
          q: "Why are some lines arranged oddly?",
          a: "Text extraction works from the position of each text fragment. Magazine columns, text inside shapes, or widely spaced letters can come out as separate lines. That is a limitation of PDF text extraction, not a corrupted file.",
        },
      ],
    },
  },
};
