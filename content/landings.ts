import type { LandingDefinition } from "@/content/landing-types";

export const LANDINGS: LandingDefinition[] = [
  {
    slug: "compress-image-100kb",
    toolId: "imageCompress",
    config: {
      image: { mode: "target", targetValue: 100, targetUnit: "KB", format: "auto" },
    },
    title: {
      id: "Kompres Gambar ke 100 KB Tanpa Unggah File",
      en: "Compress Images to 100 KB Without Uploading",
    },
    description: {
      id: "Perkecil foto ke bawah 100 KB langsung di browser untuk formulir CPNS, beasiswa, dan lamaran kerja. Tanpa unggah dan tanpa akun.",
      en: "Shrink a photo under 100 KB right in your browser for exam, scholarship, and job forms. No uploads and no account needed.",
    },
    h1: {
      id: "Kompres Gambar ke 100 KB",
      en: "Compress an Image to 100 KB",
    },
    intro: {
      id: [
        "Batas unggah 100 KB termasuk yang paling ketat di formulir online. Foto dari ponsel modern biasanya berukuran 3 sampai 8 MB, jadi menurunkan ukuran sampai 100 KB bukan sekadar menggeser kualitas: resolusi piksel juga perlu dikurangi agar file benar-benar masuk.",
        "Halaman ini membuka alat Kompres Gambar Ai2 All Compress dengan target 100 KB sudah terisi. Kamu cukup menambahkan foto, dan alat akan menguji beberapa tingkat kualitas serta resolusi, lalu memilih hasil terbaik yang berada di bawah batas. Semua proses berjalan di browser; file tidak dikirim ke server mana pun.",
        "Sebelum mengunggah ke formulir, periksa juga persyaratan lain seperti rasio, dimensi piksel, dan warna latar. Angka 100 KB jarang berdiri sendiri, dan foto yang lolos ukuran tetapi salah dimensi tetap bisa ditolak sistem.",
      ],
      en: [
        "A 100 KB upload limit is one of the strictest you will meet on an online form. Phone photos are often 3 to 8 MB, so getting down to 100 KB is not just a matter of lowering quality: the pixel dimensions usually have to come down as well.",
        "This page opens the Ai2 All Compress image compressor with a 100 KB target already filled in. Add a photo, and the tool tests several quality and resolution levels to keep the best result under the limit. Everything runs in your browser; nothing is uploaded.",
        "Before you upload, check the other requirements on the form, such as aspect ratio, pixel dimensions, and background color. A 100 KB limit rarely stands alone, and a photo that passes on size but misses the required dimensions can still be rejected.",
      ],
    },
    bullets: {
      id: [
        "Target 100 KB dan satuan KB sudah terisi otomatis saat halaman dibuka.",
        "Gambar diproses lokal dengan Web Worker dan canvas, tanpa unggahan.",
        "Bisa menambahkan hingga 20 gambar sekaligus, masing-masing maksimal 50 MB.",
        "Hasil menampilkan ukuran akhir dan peringatan jujur bila 100 KB tidak tercapai.",
        "Format keluaran dapat diganti ke JPG, PNG, atau WebP sebelum mengunduh.",
      ],
      en: [
        "The 100 KB target and KB unit are filled in as soon as the page opens.",
        "Images are processed locally with Web Workers and canvas, with no upload.",
        "Add up to 20 images at once, each one limited to 50 MB.",
        "Results show the final size and an honest warning when 100 KB is unreachable.",
        "Output format can be switched to JPG, PNG, or WebP before downloading.",
      ],
    },
    sections: {
      id: [
        {
          heading: "Mengapa 100 KB sulit dicapai oleh foto ponsel",
          paragraphs: [
            "Kamera ponsel menyimpan foto pada resolusi tinggi, sering di atas 3000 piksel di sisi terpanjang. Pada ukuran itu, menurunkan kualitas JPEG saja tidak cukup karena jumlah pikselnya tetap banyak. Untuk mencapai 100 KB, alat perlu menurunkan resolusi secara bertahap sambil menjaga kualitas senatural mungkin.",
            "Jenis gambar menentukan hasilnya. Foto wajah dan badan umumnya masih terlihat wajar setelah diperkecil, sedangkan tangkapan layar berisi teks kecil, grafik bergaris tipis, atau pola detail lebih cepat kabur. Jika objek utama adalah teks, format dan alat yang berbeda akan memberi hasil lebih baik.",
          ],
        },
        {
          heading: "Siapa yang biasanya membutuhkan foto di bawah 100 KB",
          paragraphs: [
            "Syarat 100 KB sering muncul di portal pendaftaran CPNS dan PPPK, pendaftaran sekolah, beasiswa, lamaran kerja, pengajuan visa, hingga unggahan dokumen di marketplace. Banyak sistem membatasi ukuran agar proses unggah tetap ringan, dan aturan itu masih dipakai sampai sekarang.",
            "Setiap portal bisa meminta kombinasi berbeda: 100 KB dengan lebar 600 piksel, rasio 3×4, latar merah, atau wajah yang memenuhi sebagian besar bingkai. Baca instruksi formulir lebih dulu, lalu siapkan gambar mengikuti urutan persyaratan tersebut, bukan sebaliknya.",
          ],
        },
        {
          heading: "Urutan kerja: potong, sesuaikan ukuran, baru kompres",
          paragraphs: [
            "Mulai dari file asli, bukan dari hasil yang sudah pernah dikompres. Potong foto ke rasio yang diminta dengan alat Potong Gambar agar area kosong tidak ikut memakan kuota 100 KB. Setelah itu, periksa apakah formulir menetapkan dimensi piksel minimum.",
            "Jika dimensi wajib, misalnya 300×400 piksel, ubah ukuran terlebih dahulu, lalu kompres dengan target 100 KB. Urutan ini penting karena mode target boleh menurunkan resolusi; tanpa dimensi minimum yang jelas, hasilnya bisa lebih kecil daripada syarat formulir meski ukuran file tepat.",
          ],
          bullets: [
            "Simpan salinan file asli sebelum melakukan apa pun.",
            "Potong ke rasio 3×4, 4×6, atau rasio lain yang diminta.",
            "Ubah ukuran ke dimensi wajib bila formulir menyebutkannya.",
            "Kompres dengan target 100 KB dan format JPG atau WebP.",
            "Periksa wajah, teks, dan latar sebelum mengunggah.",
          ],
        },
        {
          heading: "Ketika 100 KB terlalu kecil untuk kebutuhanmu",
          paragraphs: [
            "Kalau wajah mulai terlihat blok-blok atau teks pada dokumen tidak terbaca, target 100 KB sudah melewati batas wajar untuk gambar itu. Alat tetap memberi hasil terkecil yang bisa dibuat, menampilkan ukuran akhir, dan memberi tahu bila target tidak tercapai. Kamu bisa memakai hasil itu atau mencoba target yang lebih longgar.",
            "Untuk dokumen PDF yang harus di bawah 1 MB, gunakan alat Perkecil PDF ke Target. Untuk gambar yang hanya perlu dimensi baru, alat Ubah Ukuran Gambar lebih tepat. Dan bila formulir menerima WebP, konversi ke WebP sering memberi file lebih kecil pada tampilan yang setara.",
          ],
        },
      ],
      en: [
        {
          heading: "Why phone photos struggle to reach 100 KB",
          paragraphs: [
            "Phone cameras save photos at high resolution, often beyond 3000 pixels on the long edge. At that size, lowering JPEG quality alone is not enough because the pixel count stays high. Reaching 100 KB requires the tool to step the resolution down while keeping quality as natural as possible.",
            "The subject matters as much as the settings. Portraits usually still look reasonable after downscaling, while screenshots of small text, thin line art, or busy patterns blur much sooner. If the important content is text, a different format and a different tool will serve you better.",
          ],
        },
        {
          heading: "Who actually needs a photo under 100 KB",
          paragraphs: [
            "A 100 KB limit shows up on civil service exam portals, school admissions, scholarship applications, job sites, visa forms, and marketplace document uploads. Many systems cap file size to keep uploads manageable, and those rules are still in place today.",
            "Each portal may combine the limit with other rules: 100 KB at 600 pixels wide, a 3×4 ratio, a red background, or a face that fills most of the frame. Read the form instructions first, then prepare the image in that order rather than the other way around.",
          ],
        },
        {
          heading: "A work order that avoids rework: crop, resize, compress",
          paragraphs: [
            "Start from the original file, not from a copy that has already been compressed. Crop to the requested ratio with the Image Cropper so empty space does not eat into the 100 KB budget. Then check whether the form specifies a minimum pixel size.",
            "If dimensions are mandatory, for example 300×400 pixels, resize first and compress to 100 KB afterward. The order matters because target mode is allowed to lower resolution; without a stated minimum, the result can end up smaller than the form expects even when the file size is exactly right.",
          ],
          bullets: [
            "Keep a copy of the original file before changing anything.",
            "Crop to 3×4, 4×6, or whatever ratio the form requests.",
            "Resize to the required dimensions when they are specified.",
            "Compress to 100 KB with JPG or WebP output.",
            "Check the face, text, and background before uploading.",
          ],
        },
        {
          heading: "When 100 KB is simply too small",
          paragraphs: [
            "If the face starts looking blocky or document text becomes unreadable, 100 KB has passed what that image can reasonably support. The tool still returns the smallest file it can produce and reports the final size. Use that result or try a looser target.",
            "For a PDF that must stay under 1 MB, use the PDF Size Reducer instead. If you only need new dimensions, the Image Resizer is the right tool. And when the form accepts WebP, converting to WebP often produces a smaller file at comparable visual quality.",
          ],
        },
      ],
    },
    faq: {
      id: [
        {
          q: "Apakah foto saya diunggah ke server?",
          a: "Tidak. Kompresi berjalan di browser memakai canvas dan Web Worker. Tidak ada API unggahan, tidak ada penyimpanan file, dan hasilnya hanya ada di memori perangkat sampai kamu mengunduhnya.",
        },
        {
          q: "Mengapa hasil 100 KB terlihat kurang tajam?",
          a: "Untuk mencapai 100 KB, resolusi biasanya diturunkan. Foto wajah masih bisa terlihat wajar, tetapi teks dan detail halus lebih cepat hilang. Mulai dari file asli beresolusi tinggi, potong area yang tidak perlu, atau gunakan target 200 KB bila formulir mengizinkan.",
        },
        {
          q: "Apakah dimensi piksel tetap sesuai syarat formulir?",
          a: "Mode target mengutamakan ukuran file, jadi dimensi bisa turun melewati syarat formulir. Untuk dimensi yang ketat, ubah ukuran gambar terlebih dahulu, lalu kompres dan periksa dimensi akhir sebelum mengunggah.",
        },
        {
          q: "Berapa banyak gambar yang bisa diproses sekaligus?",
          a: "Hingga 20 file dalam satu antrean, dengan batas 50 MB per gambar. Hasil dapat diunduh satu per satu atau sebagai arsip ZIP. Agar tab tetap stabil, hindari menjalankan proses berat lain pada perangkat yang sama.",
        },
      ],
      en: [
        {
          q: "Is my photo uploaded to a server?",
          a: "No. Compression runs in your browser with canvas and Web Workers. There is no upload API, no file storage, and the result exists only in device memory until you download it.",
        },
        {
          q: "Why does the 100 KB result look soft?",
          a: "Reaching 100 KB usually means lowering resolution. Portraits can still look acceptable, but text and fine detail disappear faster. Start from the original file, crop away what you do not need, or use a 200 KB target if allowed.",
        },
        {
          q: "Will the pixel dimensions still match the form?",
          a: "Target mode prioritizes file size, so dimensions may drop below what the form requires. When dimensions are strict, resize the image first, then compress and check the final dimensions before uploading.",
        },
        {
          q: "How many images can I process at once?",
          a: "Up to 20 files in one queue, with a 50 MB limit per image. Results can be downloaded individually or as a ZIP archive. To keep the tab stable, avoid running other heavy tasks on the same device.",
        },
      ],
    },
    relatedTools: ["imageResize", "imageCrop", "imageConvert", "pdfReduce"],
  },
  {
    slug: "compress-image-200kb",
    toolId: "imageCompress",
    config: {
      image: { mode: "target", targetValue: 200, targetUnit: "KB", format: "auto" },
    },
    title: {
      id: "Kompres Gambar ke 200 KB, Tetap Tajam",
      en: "Compress Images to 200 KB and Keep Them Sharp",
    },
    description: {
      id: "Perkecil foto ke 200 KB untuk formulir, email, dan marketplace. Kompresi berjalan lokal di browser dan hasilnya bisa dibandingkan sebelum diunduh.",
      en: "Reduce photos to 200 KB for forms, email, and marketplace listings. Compression runs locally in your browser so you can compare before downloading.",
    },
    h1: {
      id: "Kompres Gambar ke 200 KB",
      en: "Compress an Image to 200 KB",
    },
    intro: {
      id: [
        "Batas 200 KB lebih bersahabat daripada 100 KB. Pada ukuran ini foto masih bisa menyimpan detail wajah, tekstur, dan latar yang wajar, sehingga cocok untuk formulir yang tidak ingin mengorbankan keterbacaan.",
        "Alat di halaman ini terbuka dengan mode target 200 KB dan format otomatis. Kamu bisa menambahkan beberapa foto, membandingkan hasil, dan mengunduh yang paling pas. Semua pemrosesan terjadi di perangkat, tanpa file yang dikirim atau disimpan di server.",
        "Bagian berikut membahas kapan 200 KB cukup, bagaimana menjaga ketajaman, dan apa yang perlu dilakukan bila formulir ternyata meminta angka lain.",
      ],
      en: [
        "A 200 KB limit is far more forgiving than 100 KB. At this size a photo can still hold believable facial detail, texture, and background, which makes it a sensible ceiling for forms that care about legibility.",
        "This page opens with target mode set to 200 KB and automatic output. Add several photos, compare the results, and download the ones that fit. All processing happens on your device, with nothing sent to or stored on a server.",
        "The sections below cover when 200 KB is enough, how to keep an image sharp at that size, and what to do when a form asks for a different number.",
      ],
    },
    bullets: {
      id: [
        "Target 200 KB terisi otomatis, cukup tambahkan gambar.",
        "Mode otomatis juga tersedia bila ukuran tepat tidak penting.",
        "Bandingkan versi sebelum dan sesudah lewat penggeser pratinjau.",
        "Unduh per file atau sekaligus dalam arsip ZIP.",
        "Maksimal 20 file, dengan batas 50 MB per gambar.",
      ],
      en: [
        "The 200 KB target is pre-filled, so you only need to add images.",
        "Automatic mode is available when an exact size does not matter.",
        "Compare before and after with the preview slider.",
        "Download files individually or together as a ZIP archive.",
        "Up to 20 files, with a 50 MB limit per image.",
      ],
    },
    sections: {
      id: [
        {
          heading: "Ruang gerak yang lebih lebar untuk foto",
          paragraphs: [
            "Dengan kuota 200 KB, alat punya ruang untuk mempertahankan kualitas lebih tinggi atau resolusi lebih besar sebelum menekan ukuran. Untuk foto setengah badan, hasilnya sering masih terlihat tajam di layar ponsel maupun laptop.",
            "Namun 200 KB bukan jaminan untuk semua jenis gambar. Foto grup dengan dedaunan, tekstur kain, atau pola rumit menyimpan lebih banyak informasi dan lebih cepat kehilangan detail. Tangkapan layar berisi teks kecil juga bukan kandidat ideal untuk JPEG berukuran ini.",
          ],
        },
        {
          heading: "Kebutuhan yang sering muncul di lapangan",
          paragraphs: [
            "Unggahan selfie dengan KTP di layanan keuangan, foto produk di marketplace, lampiran email lamaran, dan tugas di sistem pembelajaran kampus kerap memakai batas 200 KB sampai 500 KB. Portal beasiswa dan bank kadang meminta 200 KB untuk pas foto, tetapi angka pastinya berbeda-beda.",
            "Karena itu, jangan berpatokan pada satu angka. Periksa halaman syarat, catat batas ukuran, dimensi, dan format yang diminta, lalu sesuaikan alat dengan angka tersebut. Jika formulir meminta 100 KB, halaman target 100 KB lebih tepat; jika menerima 1 MB, tidak perlu memaksa 200 KB.",
          ],
        },
        {
          heading: "Menjaga ketajaman pada 200 KB",
          paragraphs: [
            "Gunakan file asli dan hindari mengompres ulang hasil yang sudah pernah disimpan. Setiap penyimpanan JPEG menambah kompresi lossy, sehingga detail yang hilang tidak bisa kembali. Kalau perlu memperbaiki komposisi, potong dulu dari file asli.",
            "Pilih format keluaran sesuai isi gambar: JPEG untuk foto, PNG untuk grafik dan teks, WebP bila formulir menerimanya. Setelah kompresi, periksa ukuran, dimensi, dan tampilan gambar pada pembesaran 100 persen agar tidak ada kejutan saat diperiksa petugas.",
          ],
          bullets: [
            "Mulai dari file asli, bukan hasil kompresi sebelumnya.",
            "Gunakan pencahayaan rata agar wajah tidak kehilangan detail.",
            "Periksa hasil pada zoom 100 persen sebelum diunggah.",
            "Simpan versi kualitas tinggi sebagai cadangan di perangkat.",
            "Ganti target bila formulir menyebut angka yang berbeda.",
          ],
        },
        {
          heading: "Saat target tidak tercapai atau format lain lebih baik",
          paragraphs: [
            "Jika 200 KB tetap tidak tercapai tanpa merusak tampilan, alat akan menampilkan hasil terkecil beserta ukurannya. Kamu bisa memakai hasil itu, menurunkan dimensi lebih dulu, atau memilih format yang lebih efisien. Tidak ada proses yang diam-diam mengirim file ke tempat lain.",
            "Untuk PNG berisi foto, mengubah format ke JPEG atau WebP biasanya lebih berpengaruh daripada menurunkan kualitas PNG yang lossless. Untuk kebutuhan cetak besar, 200 KB justru terlalu kecil; simpan versi resolusi tinggi terpisah dan gunakan versi kecil hanya untuk unggahan.",
          ],
        },
      ],
      en: [
        {
          heading: "More headroom for photos",
          paragraphs: [
            "With a 200 KB budget, the tool can keep higher quality or a larger resolution before it has to shrink the file. Half-body portraits often still look crisp on both phone and laptop screens.",
            "That said, 200 KB is not a guarantee for every kind of image. Group shots with foliage, fabric texture, or busy patterns carry more information and lose detail sooner. Screenshots full of small text are also a poor fit for a JPEG at this size.",
          ],
        },
        {
          heading: "Where this limit shows up in practice",
          paragraphs: [
            "Selfies submitted alongside an ID card at financial services, product photos on marketplaces, email attachments for job applications, and coursework in campus learning systems often use limits between 200 KB and 500 KB. Scholarship portals and banks sometimes ask for a 200 KB portrait, but the exact number varies.",
            "So do not anchor on a single figure. Read the requirements page, note the size, dimensions, and format it asks for, and set the tool to that number. If the form wants 100 KB, the dedicated 100 KB page fits better; if it accepts 1 MB, there is no reason to force 200 KB.",
          ],
        },
        {
          heading: "Keeping detail at 200 KB",
          paragraphs: [
            "Use the original file and avoid recompressing something you have already saved. Every JPEG save adds another round of lossy compression, and lost detail cannot be recovered. If the composition needs fixing, crop first from the original.",
            "Choose the output format to match the content: JPEG for photos, PNG for graphics and text, WebP when the form accepts it. After compressing, check size, dimensions, and the image at 100 percent zoom so there are no surprises during review.",
          ],
          bullets: [
            "Start from the original file, not a previously compressed copy.",
            "Use even lighting so facial detail survives the compression.",
            "Inspect the result at 100 percent zoom before uploading.",
            "Keep a high-quality copy on your device as a backup.",
            "Change the target when the form specifies a different number.",
          ],
        },
        {
          heading: "When the target is missed or another format wins",
          paragraphs: [
            "If 200 KB cannot be reached without visible damage, the tool shows the smallest file it managed along with its size. You can use that result, reduce dimensions first, or pick a more efficient format. Nothing is quietly sent anywhere during the attempt.",
            "For a PNG that contains a photo, switching to JPEG or WebP usually matters more than lowering quality on a lossless format. For large prints, 200 KB is simply too small; keep a full-resolution copy separate and use the small one only for uploads.",
          ],
        },
      ],
    },
    faq: {
      id: [
        {
          q: "Apakah 200 KB cukup untuk dicetak?",
          a: "Untuk cetak foto besar, 200 KB terlalu kecil dan detail akan terlihat kasar. Simpan selalu file asli beresolusi tinggi untuk cetak, dan gunakan hasil 200 KB hanya untuk formulir atau lampiran digital.",
        },
        {
          q: "Apakah metadata seperti lokasi ikut terhapus?",
          a: "Ya. Gambar yang diproses ulang melalui canvas kehilangan metadata EXIF, termasuk informasi kamera dan lokasi. Ini mengurangi data pribadi yang terbawa saat file diunggah ke formulir publik.",
        },
        {
          q: "Bagaimana kalau formulir meminta tepat 100 KB?",
          a: "Ubah angka target menjadi 100 dengan satuan KB, atau buka halaman kompres gambar ke 100 KB yang sudah menyiapkan pengaturan tersebut. Memaksa hasil 200 KB ke formulir yang membatasi 100 KB akan ditolak sistem.",
        },
        {
          q: "Apakah banyak file bisa diproses sekaligus?",
          a: "Bisa, hingga 20 file per antrean. Setiap gambar dibatasi 50 MB, dan hasilnya dapat diunduh satu per satu atau sebagai ZIP. Proses tetap berjalan lokal, jadi kecepatan bergantung pada perangkatmu.",
        },
      ],
      en: [
        {
          q: "Is 200 KB enough for printing?",
          a: "For a large print, 200 KB is too small and detail will look coarse. Always keep the original high-resolution file for printing, and use the 200 KB version only for forms or digital attachments.",
        },
        {
          q: "Is metadata such as location removed?",
          a: "Yes. Any image re-encoded through canvas loses its EXIF metadata, including camera details and location. That reduces the personal data traveling with a file when it is uploaded to a public form.",
        },
        {
          q: "What if the form asks for exactly 100 KB?",
          a: "Change the target to 100 with KB selected, or open the 100 KB landing page where those settings are already prepared. Sending a 200 KB file to a form capped at 100 KB will be rejected by the system.",
        },
        {
          q: "Can I process several files at once?",
          a: "Yes, up to 20 files per queue. Each image is limited to 50 MB, and results can be downloaded one by one or as a ZIP. Processing stays local, so speed depends on your device.",
        },
      ],
    },
    relatedTools: ["imageResize", "imageCrop", "imageConvert", "pdfReduce"],
  },
  {
    slug: "compress-pdf-1mb",
    toolId: "pdfReduce",
    config: {
      pdfTarget: { value: 1, unit: "MB" },
    },
    title: {
      id: "Kompres PDF ke 1 MB untuk Unggahan Online",
      en: "Compress a PDF to 1 MB for Online Uploads",
    },
    description: {
      id: "Kecilkan PDF ke sekitar 1 MB untuk lamaran kerja, beasiswa, dan e-filing. Proses berjalan di browser; teks pada hasil kompresi tidak lagi bisa dicari.",
      en: "Shrink a PDF to around 1 MB for job applications, scholarships, and e-filing. Processing stays in your browser; compressed text is no longer searchable.",
    },
    h1: {
      id: "Kompres PDF ke 1 MB",
      en: "Compress a PDF to 1 MB",
    },
    intro: {
      id: [
        "Satu megabyte sering menjadi batas unggah untuk lamaran kerja, berkas beasiswa, klaim asuransi, dan dokumen administrasi lainnya. PDF hasil pindai dengan foto atau stempel bisa jauh melewati batas itu, sehingga perlu dikecilkan tanpa membuat halaman sulit dibaca.",
        "Alat Perkecil PDF ke Target di halaman ini sudah diatur ke 1 MB. Kamu menambahkan satu PDF, alat mencoba beberapa kombinasi kualitas dan resolusi per halaman, lalu berhenti saat hasilnya masuk ke bawah target.",
        "Penting diketahui sejak awal: untuk mencapai ukuran kecil, halaman dirender ulang menjadi gambar JPEG, sehingga teks tidak lagi bisa dipilih atau dicari. Simpan file asli, dan pertimbangkan batasan ini sebelum memakai hasilnya untuk dokumen penting.",
      ],
      en: [
        "One megabyte is a common upload ceiling for job applications, scholarship paperwork, insurance claims, and other administrative documents. A scanned PDF with photos or stamps can sit far above that limit, and it needs to come down without becoming hard to read.",
        "The PDF Size Reducer on this page is already set to 1 MB. Add a single PDF, and the tool tries several quality and resolution combinations per page, stopping once the result fits under the target.",
        "Know this up front: to reach a small size, pages are re-rendered as JPEG images, which means text is no longer selectable or searchable. Keep the original file, and weigh that trade-off before submitting the compressed version for anything important.",
      ],
    },
    bullets: {
      id: [
        "Satu PDF per proses, dengan batas ukuran 100 MB.",
        "Target 1 MB bisa diganti ke KB atau angka lain.",
        "Kemajuan ditampilkan per halaman dan bisa dibatalkan.",
        "Hasil di bawah target langsung bisa diunduh.",
        "Jika target mustahil, alat memberi hasil terkecil beserta penjelasannya.",
      ],
      en: [
        "One PDF per run, with a 100 MB file size limit.",
        "The 1 MB target can be switched to KB or another value.",
        "Per-page progress is shown, and you can cancel at any time.",
        "Results under the target are ready to download immediately.",
        "When the target is impossible, the tool returns the smallest result with an explanation.",
      ],
    },
    sections: {
      id: [
        {
          heading: "Berapa banyak halaman yang muat dalam 1 MB?",
          paragraphs: [
            "Jawabannya bergantung pada isi halaman. PDF teks murni yang dibuat dari aplikasi pengolah kata biasanya ringan dan bisa memuat banyak halaman dalam 1 MB. PDF hasil pindai berisi foto, tanda tangan basah, atau grafik berwarna jauh lebih berat karena setiap halaman menyimpan gambar.",
            "Karena target berlaku untuk keseluruhan file, menambah halaman selalu menambah beban. Jika dokumenmu puluhan halaman hasil pindai, target 1 MB mungkin hanya tercapai dengan kualitas rendah. Dalam kasus itu, memangkas halaman yang tidak perlu lebih masuk akal daripada memaksa kualitas turun.",
          ],
        },
        {
          heading: "Kapan batas 1 MB muncul sebagai syarat",
          paragraphs: [
            "Portal lowongan kerja sering membatasi lampiran CV dan berkas pendukung, sementara kampus dan penyelenggara beasiswa meminta transkrip, sertifikat, dan esai dalam satu PDF. Layanan administrasi lain seperti e-filing dan pengajuan klaim juga memakai batas serupa.",
            "Periksa apakah batas berlaku untuk satu file atau total lampiran, dan apakah ada syarat tambahan seperti jumlah halaman maksimum atau ukuran kertas. Mengetahui hal ini sebelum memproses menghemat waktu, karena target yang salah membuat kamu mengulang dari awal.",
          ],
        },
        {
          heading: "Langkah mengecilkan PDF ke 1 MB",
          paragraphs: [
            "Buka alat, tambahkan PDF, dan biarkan target 1 MB terisi. Proses berjalan halaman demi halaman dengan indikator kemajuan; PDF besar memang butuh waktu lebih lama, dan kamu bisa membatalkan kapan saja. Setelah selesai, periksa ukuran akhir dan pratinjau beberapa halaman.",
            "Bila hasil sudah di bawah 1 MB tetapi teks terlihat kabur, coba lagi dengan target sedikit lebih tinggi, atau kurangi halaman lewat alat Rapikan Halaman PDF sebelum dikompres. Menghapus halaman kosong dan lampiran yang tidak diminta sering memberi ruang lebih besar daripada menurunkan kualitas.",
          ],
          bullets: [
            "Pastikan PDF tidak terkunci kata sandi.",
            "Hapus halaman kosong atau lampiran yang tidak diminta.",
            "Biarkan target 1 MB, atau sesuaikan dengan formulir.",
            "Tunggu proses per halaman selesai sebelum mengunduh.",
            "Buka hasilnya dan periksa keterbacaan setiap bagian penting.",
          ],
        },
        {
          heading: "Yang berubah setelah kompresi",
          paragraphs: [
            "Kompresi ini mengubah halaman menjadi gambar JPEG. Teks tidak bisa diseleksi, dicari, atau disalin, dan tautan di dalam dokumen hilang. Dokumen tetap terlihat seperti aslinya saat dibaca atau dicetak, tetapi bukan lagi PDF yang bisa diedit.",
            "Kalau penerima membutuhkan teks yang bisa dicari, gunakan alat Kompres PDF dengan mode yang mempertahankan struktur asli, atau Rapikan Halaman PDF dengan opsi tersebut. Pengurangan ukurannya lebih kecil, tetapi isi dokumen tetap utuh. PDF berpassword dan PDF rusak ditolak dengan pesan yang jelas, jadi buka proteksinya lebih dulu.",
          ],
        },
      ],
      en: [
        {
          heading: "How many pages actually fit in 1 MB?",
          paragraphs: [
            "It depends on what is on each page. A text-only PDF exported from a word processor is light and can hold many pages within 1 MB. Scanned pages with photos, wet signatures, or color graphics are much heavier because every page stores an image.",
            "Because the target applies to the whole file, adding pages always adds weight. If your document is dozens of scanned pages, a 1 MB target may only be reachable at low quality. In that situation, cutting unnecessary pages makes more sense than forcing quality down.",
          ],
        },
        {
          heading: "Where the 1 MB cap comes from",
          paragraphs: [
            "Job portals often cap CV attachments and supporting files, while universities and scholarship organizers ask for transcripts, certificates, and essays in a single PDF. Administrative services such as e-filing and claim submissions use similar limits.",
            "Check whether the cap applies to one file or the total attachment set, and whether there are extra rules such as a maximum page count or paper size. Knowing this before processing saves time, because a wrong target means starting over.",
          ],
        },
        {
          heading: "Steps to bring a PDF under 1 MB",
          paragraphs: [
            "Open the tool, add the PDF, and leave the 1 MB target in place. Processing runs page by page with a progress indicator; large PDFs take longer, and you can cancel whenever you like. When it finishes, review the final size and preview a few pages.",
            "If the file is under 1 MB but text looks blurry, retry with a slightly higher target, or remove pages with the Organize PDF tool before compressing. Dropping blank pages and attachments nobody asked for often frees more room than lowering quality.",
          ],
          bullets: [
            "Make sure the PDF is not locked with a password.",
            "Remove blank pages and attachments nobody requested.",
            "Keep the 1 MB target, or adjust it to match the form.",
            "Let the per-page process finish before downloading.",
            "Open the result and check that key sections are readable.",
          ],
        },
        {
          heading: "What changes after compression",
          paragraphs: [
            "This compression turns each page into a JPEG image. Text can no longer be selected, searched, or copied, and links inside the document are lost. The file still looks like the original when read or printed, but it is no longer an editable PDF.",
            "If the recipient needs searchable text, use the PDF compressor with a mode that preserves the original structure, or the page organizer with that option. The size reduction is smaller, but the document stays intact. Password-protected and corrupted PDFs are rejected with a clear message, so unlock them first.",
          ],
        },
      ],
    },
    faq: {
      id: [
        {
          q: "Kenapa teks PDF tidak bisa dicari setelah dikompres?",
          a: "Untuk mencapai ukuran target, setiap halaman dirender ulang menjadi gambar JPEG. Teks berubah menjadi piksel, sehingga tidak bisa dipilih, dicari, atau disalin. Simpan file asli bila dokumen masih perlu diedit atau dikutip.",
        },
        {
          q: "Bagaimana jika hasilnya masih di atas 1 MB?",
          a: "Alat menampilkan hasil terkecil yang bisa dibuat beserta ukurannya. Kamu bisa menghapus halaman yang tidak perlu, mencoba target yang lebih tinggi, atau memakai dokumen dengan gambar yang lebih sederhana. Tidak ada file yang dikirim ke server saat target gagal.",
        },
        {
          q: "Apakah PDF saya diunggah atau disimpan?",
          a: "Tidak. File dibaca dan diproses di browser, halaman demi halaman. Tidak ada API unggahan dan tidak ada penyimpanan di server. Menutup tab akan menghentikan proses dan membebaskan memori perangkat.",
        },
        {
          q: "Apakah PDF berpassword bisa diproses?",
          a: "Tidak. PDF yang dilindungi kata sandi akan ditandai dan tidak diproses, begitu juga PDF rusak. Buka proteksi atau perbaiki file dengan aplikasi PDF terlebih dahulu, lalu tambahkan kembali ke alat ini.",
        },
      ],
      en: [
        {
          q: "Why is the PDF text no longer searchable?",
          a: "To reach the target size, every page is re-rendered as a JPEG image. Text becomes pixels, so it cannot be selected, searched, or copied. Keep the original file if the document still needs editing or quoting.",
        },
        {
          q: "What if the result is still above 1 MB?",
          a: "The tool shows the smallest file it could produce and its size. You can remove pages you do not need, try a higher target, or use a document with simpler imagery. Nothing is sent to a server when the target is missed.",
        },
        {
          q: "Is my PDF uploaded or stored?",
          a: "No. The file is read and processed in your browser, page by page. There is no upload API and no server-side storage. Closing the tab stops processing and frees device memory.",
        },
        {
          q: "Can password-protected PDFs be processed?",
          a: "No. A password-protected PDF is flagged and skipped, and the same applies to corrupted files. Remove the protection or repair the file with a PDF app first, then add it back to this tool.",
        },
      ],
    },
    relatedTools: ["pdfCompress", "pdfOrganize", "pdfMerge", "imageCompress"],
  },
  {
    slug: "compress-jpg",
    toolId: "imageCompress",
    config: {
      image: { mode: "target", targetValue: 200, targetUnit: "KB", format: "image/jpeg" },
    },
    title: {
      id: "Kompres JPG ke 200 KB: Panduan Format JPEG",
      en: "Compress JPG to 200 KB: A JPEG Format Guide",
    },
    description: {
      id: "Kompres JPG ke 200 KB dengan format JPEG yang konsisten. Pelajari batas format lossy, penanganan transparansi, dan kapan WebP lebih tepat.",
      en: "Compress JPG files to 200 KB with JPEG output kept consistent. Learn the limits of lossy compression, transparency handling, and when WebP wins.",
    },
    h1: {
      id: "Kompres JPG ke 200 KB",
      en: "Compress JPG to 200 KB",
    },
    intro: {
      id: [
        "JPEG adalah format yang paling sering diterima formulir, dan hampir semua kamera serta ponsel menyimpannya secara default. Karena bersifat lossy, JPEG membuang sebagian detail untuk mengecilkan file, dan itulah sebabnya format ini bagus untuk foto tetapi kurang cocok untuk teks tajam.",
        "Halaman ini membuka alat Kompres Gambar dengan target 200 KB dan format keluaran JPEG. Kamu bisa mengubah angkanya, tetapi memilih JPEG memastikan ekstensi dan isi file tetap konsisten, sehingga tidak ada gambar PNG yang hanya diganti namanya menjadi .jpg.",
        "Berikut hal yang perlu dipahami tentang kompresi JPEG, kesalahan yang sering terjadi, dan kapan sebaiknya memilih format lain.",
      ],
      en: [
        "JPEG is the format most forms accept, and nearly every camera and phone saves to it by default. Because it is lossy, JPEG discards some detail to shrink the file, which is exactly why it suits photos and struggles with crisp text.",
        "This page opens the image compressor with a 200 KB target and JPEG output. You can change the number, but keeping JPEG selected makes sure the extension and the actual file content agree, so no PNG gets renamed to .jpg.",
        "Here is what to understand about JPEG compression, the mistakes that are easy to make, and when another format is the better call.",
      ],
    },
    bullets: {
      id: [
        "Target 200 KB dan format JPEG sudah disiapkan saat halaman dibuka.",
        "Cocok untuk foto kamera, ponsel, dan hasil pindai berwarna.",
        "Metadata EXIF seperti lokasi ikut terhapus saat pemrosesan.",
        "Hasil lebih kecil dari 200 KB dilaporkan dengan ukuran akhir yang jelas.",
        "Tetap bisa beralih ke PNG atau WebP lewat alat konversi.",
      ],
      en: [
        "The 200 KB target and JPEG output are set when the page opens.",
        "Suited to camera photos, phone shots, and color scans.",
        "EXIF metadata such as location is stripped during processing.",
        "Results under 200 KB are reported with a clear final size.",
        "You can still switch to PNG or WebP through the converter.",
      ],
    },
    sections: {
      id: [
        {
          heading: "Mengapa JPEG masih jadi pilihan aman",
          paragraphs: [
            "Dukungan JPEG sangat luas: formulir pendaftaran, portal kerja, email, dan aplikasi percetakan hampir selalu menerimanya. Untuk foto dengan gradasi halus seperti langit, kulit, atau bayangan, JPEG menghasilkan file kecil dengan tampilan yang wajar.",
            "Kelemahannya muncul pada gambar dengan garis tegas dan teks kecil. JPEG dapat menimbulkan noise di sekitar tepi huruf dan membuat warna solid tampak kotor. JPEG juga tidak mendukung transparansi, sehingga area transparan akan diisi warna latar saat disimpan.",
          ],
        },
        {
          heading: "Dari foto kamera ke file 200 KB",
          paragraphs: [
            "Foto 12 megapiksel bisa berukuran beberapa megabita. Untuk mencapai 200 KB, alat menurunkan kualitas dan, bila perlu, resolusi. Hasilnya tetap berupa JPEG, tetapi metadata EXIF seperti model kamera, tanggal, dan lokasi ikut terhapus karena gambar digambar ulang di canvas.",
            "Penghapusan metadata itu menguntungkan saat mengunggah ke formulir publik, karena informasi lokasi tidak ikut terbawa. Namun jangan mengandalkan kompresi untuk menghapus semua data sensitif; periksa dulu apakah dokumen atau foto memuat informasi yang tidak seharusnya dibagikan.",
          ],
        },
        {
          heading: "Kesalahan yang membuat hasil JPEG jelek",
          paragraphs: [
            "Mengompres file yang sudah pernah dikompres berulang kali membuat artefak menumpuk. Selalu mulai dari file asli, lalu simpan satu hasil final. Hindari juga memperbesar gambar kecil sebelum dikompres; piksel tambahan tidak menambah detail dan hanya membebani ukuran.",
            "Kesalahan lain adalah memakai JPEG untuk tangkapan layar berisi teks atau logo berlatar transparan. Format itu akan mengaburkan huruf dan mengisi latar dengan warna padat. Untuk keperluan tersebut, PNG atau WebP lebih tepat meski ukurannya perlu disesuaikan dengan cara lain.",
          ],
          bullets: [
            "Gunakan file asli, bukan hasil kompresi sebelumnya.",
            "Hindari mengganti ekstensi PNG menjadi .jpg secara manual.",
            "Periksa hasil pada zoom 100 persen sebelum diunggah.",
            "Jangan mengandalkan JPEG untuk gambar berlatar transparan.",
            "Simpan versi kualitas tinggi di perangkat sebagai cadangan.",
          ],
        },
        {
          heading: "Kapan PNG atau WebP lebih baik daripada JPEG",
          paragraphs: [
            "PNG lossless unggul untuk logo, diagram, tangkapan layar, dan gambar dengan transparansi. WebP menawarkan ukuran lebih kecil pada kualitas setara dan mendukung transparansi, tetapi tidak semua formulir menerimanya. Periksa daftar format yang diizinkan sebelum mengonversi.",
            "Untuk foto biasa tanpa transparansi, JPEG tetap pilihan yang aman. Jika target 200 KB sulit dicapai, pertimbangkan menurunkan dimensi lebih dulu, karena pengurangan piksel sering lebih efektif daripada memaksa kualitas JPEG sangat rendah. Alat akan memberi tahu bila target tidak tercapai.",
          ],
        },
      ],
      en: [
        {
          heading: "Why JPEG remains the safe default",
          paragraphs: [
            "JPEG support is everywhere: registration forms, job portals, email clients, and print services almost always accept it. For photos with smooth gradations such as sky, skin, or shadows, it produces a small file that looks natural.",
            "Its weaknesses appear in images with hard lines and small text. JPEG can add noise around letter edges and make solid colors look muddy. It also has no transparency support, so transparent areas get filled with a background color when saved.",
          ],
        },
        {
          heading: "From a camera photo to a 200 KB file",
          paragraphs: [
            "A 12 megapixel photo can be several megabytes. To reach 200 KB, the tool lowers quality and, when needed, resolution. The output is still a JPEG, but EXIF metadata such as camera model, date, and location is stripped because the image is redrawn on canvas.",
            "That metadata removal helps when uploading to a public form, since location details do not tag along. Do not rely on compression to scrub everything sensitive, though; check whether the document or photo contains information that should not be shared at all.",
          ],
        },
        {
          heading: "Mistakes that make JPEG results look bad",
          paragraphs: [
            "Compressing a file that has already been compressed repeatedly piles up artifacts. Always start from the original and save one final version. Avoid upscaling a small image before compressing as well; extra pixels add no detail and only inflate the size.",
            "Another common mistake is using JPEG for screenshots of text or transparent logos. The format blurs lettering and fills the background with a solid color. PNG or WebP is the better choice there, even if the size has to be handled another way.",
          ],
          bullets: [
            "Work from the original file, not a previous compression.",
            "Never rename a PNG to .jpg by hand.",
            "Inspect the result at 100 percent zoom before uploading.",
            "Do not use JPEG for images with transparent backgrounds.",
            "Keep a high-quality copy on your device as a backup.",
          ],
        },
        {
          heading: "When PNG or WebP beats JPEG",
          paragraphs: [
            "Lossless PNG is stronger for logos, diagrams, screenshots, and images with transparency. WebP produces smaller files at comparable quality and supports transparency, but not every form accepts it. Check the allowed formats before converting.",
            "For ordinary photos without transparency, JPEG remains a safe pick. If 200 KB is hard to reach, try reducing dimensions first, since fewer pixels are often more effective than forcing JPEG quality very low. The tool will tell you when the target cannot be met.",
          ],
        },
      ],
    },
    faq: {
      id: [
        {
          q: "Apakah setiap kompresi JPEG menurunkan kualitas?",
          a: "Ya, JPEG bersifat lossy, jadi setiap penyimpanan membuang sebagian data. Karena itu, mulai dari file asli dan simpan satu hasil final. Mengompres ulang hasil yang sama berulang kali membuat gambar makin berartefak.",
        },
        {
          q: "Apakah latar transparan tetap dipertahankan?",
          a: "Tidak. JPEG tidak mendukung transparansi, sehingga area transparan diisi warna latar, umumnya putih. Jika transparansi harus dipertahankan, gunakan keluaran PNG atau WebP, bukan JPEG.",
        },
        {
          q: "Apakah metadata EXIF hilang?",
          a: "Ya. Gambar yang diproses melalui canvas kehilangan EXIF, termasuk informasi kamera dan lokasi. Ini membantu mengurangi data pribadi yang ikut terunggah ke formulir publik.",
        },
        {
          q: "Bisakah kualitas diatur secara manual?",
          a: "Bisa. Selain mode target, tersedia mode manual dengan penggeser kualitas. Gunakan target 200 KB bila formulir menetapkan batas, dan mode manual bila kamu ingin menentukan sendiri keseimbangan ukuran dan detail.",
        },
      ],
      en: [
        {
          q: "Does every JPEG compression reduce quality?",
          a: "Yes, JPEG is lossy, so each save discards some data. That is why you should start from the original and save one final version. Recompressing the same result repeatedly makes artefacts accumulate.",
        },
        {
          q: "Is a transparent background preserved?",
          a: "No. JPEG has no transparency support, so transparent areas are filled with a background color, usually white. If transparency must survive, use PNG or WebP output instead of JPEG.",
        },
        {
          q: "Is EXIF metadata removed?",
          a: "Yes. Images processed through canvas lose EXIF data, including camera information and location. That helps limit the personal details traveling with a file into a public form.",
        },
        {
          q: "Can quality be set manually?",
          a: "Yes. Alongside target mode, there is a manual mode with a quality slider. Use the 200 KB target when the form sets a limit, and manual mode when you want to choose the size and detail balance yourself.",
        },
      ],
    },
    relatedTools: ["imageConvert", "imageResize", "imageCrop", "imageCompress"],
  },
  {
    slug: "compress-png",
    toolId: "imageCompress",
    config: {
      image: { mode: "target", targetValue: 200, targetUnit: "KB", format: "image/png" },
    },
    title: {
      id: "Kompres PNG ke 200 KB Tanpa Kehilangan Transparansi",
      en: "Compress PNG to 200 KB With Transparency Intact",
    },
    description: {
      id: "Turunkan ukuran PNG ke 200 KB sambil menjaga transparansi. Pahami kapan target realistis dan kapan WebP atau JPEG lebih hemat ruang.",
      en: "Reduce PNG size to 200 KB while keeping transparency. Understand when the target is realistic and when WebP or JPEG saves more space.",
    },
    h1: {
      id: "Kompres PNG ke 200 KB",
      en: "Compress PNG to 200 KB",
    },
    intro: {
      id: [
        "PNG menyimpan gambar tanpa kehilangan data, mendukung transparansi, dan menjaga tepi tetap tajam. Kualitasnya bagus untuk logo, ikon, tangkapan layar, dan produk dengan latar transparan, tetapi justru sifat lossless itu yang membuat PNG sulit dikecilkan.",
        "Halaman ini membuka Kompres Gambar dengan target 200 KB dan format keluaran PNG. Alat akan mencari kombinasi kualitas dan resolusi; karena PNG tidak memakai slider kualitas lossy, penurunan ukuran besar biasanya berasal dari resolusi yang lebih kecil.",
        "Kalau kamu butuh PNG tetap PNG untuk menjaga transparansi, bagian berikut menjelaskan batas realistis dan cara mencapai 200 KB tanpa merusak tampilan.",
      ],
      en: [
        "PNG stores images without discarding data, supports transparency, and keeps edges sharp. That makes it ideal for logos, icons, screenshots, and products on transparent backgrounds, but the same lossless nature is what makes PNG hard to shrink.",
        "This page opens the image compressor with a 200 KB target and PNG output. The tool searches across quality and resolution; because PNG has no lossy quality slider, most of the size reduction comes from a smaller resolution.",
        "If the file must stay PNG to preserve transparency, the sections below explain the realistic limit and how to approach 200 KB without ruining the image.",
      ],
    },
    bullets: {
      id: [
        "Keluaran tetap PNG, sehingga transparansi tidak hilang.",
        "Target 200 KB bisa diganti ke angka lain sebelum memproses.",
        "Alat menampilkan dimensi akhir bila resolusi diturunkan.",
        "Gunakan Pemotong Gambar untuk membuang area yang tidak perlu.",
        "Bandingkan hasil dengan aslinya sebelum mengunduh.",
      ],
      en: [
        "Output stays PNG, so transparency is preserved.",
        "The 200 KB target can be changed before processing.",
        "Final dimensions are shown when resolution is reduced.",
        "Use the Image Cropper to remove space you do not need.",
        "Compare the result with the original before downloading.",
      ],
    },
    sections: {
      id: [
        {
          heading: "Mengapa PNG tidak mengecil seperti JPEG",
          paragraphs: [
            "PNG memampatkan data secara lossless, jadi setiap piksel dipertahankan persis. Mengompres ulang file PNG yang sudah dioptimalkan sering hanya menghemat sedikit, dan kadang hasilnya justru sedikit lebih besar karena perbedaan encoder. Slider kualitas tidak berlaku untuk format ini.",
            "Satu-satunya cara besar untuk menurunkan ukuran adalah mengurangi jumlah piksel. Mode target melakukan itu bila perlu, tetapi hasilnya bukan lagi gambar beresolusi penuh. Periksa dimensi akhir sebelum mengunggah, terutama jika formulir mensyaratkan ukuran minimum.",
          ],
        },
        {
          heading: "Transparansi tetap terjaga",
          paragraphs: [
            "Saat keluaran tetap PNG, area transparan dipertahankan. Ini penting untuk logo di atas latar berwarna, gambar produk, dan elemen desain yang akan ditempel ke dokumen lain. Namun latar transparan bisa menyulitkan formulir yang meminta latar putih atau merah.",
            "Kalau formulir mewajibkan latar tertentu, PNG transparan bukan pilihan terbaik. Konversi ke JPEG akan mengisi area transparan dengan warna padat, biasanya putih, dan menghilangkan kanal alpha. Lakukan konversi setelah memastikan warna latar yang diminta.",
          ],
        },
        {
          heading: "Kapan 200 KB masuk akal untuk PNG",
          paragraphs: [
            "Logo sederhana, ikon, dan tangkapan layar antarmuka sering bisa masuk 200 KB setelah dimensinya disesuaikan. Gambar dengan area warna datar memampatkan lebih baik daripada foto. Untuk kebutuhan web, lebar 800 sampai 1200 piksel biasanya masih memadai.",
            "Foto berformat PNG hampir selalu besar karena setiap variasi warna disimpan. Menargetkan 200 KB pada foto PNG akan memaksa penurunan resolusi yang agresif. Dalam kondisi ini, mengubah format lebih masuk akal daripada mempertahankan PNG.",
          ],
          bullets: [
            "Gunakan PNG untuk logo, ikon, dan teks yang butuh tepi tajam.",
            "Potong margin kosong yang tidak diperlukan.",
            "Periksa dimensi akhir agar tidak di bawah syarat formulir.",
            "Hindari menyimpan foto kamera sebagai PNG berukuran besar.",
            "Pertimbangkan WebP bila formulir menerima transparansi WebP.",
          ],
        },
        {
          heading: "Alternatif ketika PNG 200 KB tidak tercapai",
          paragraphs: [
            "Jika alat melaporkan target tidak tercapai, hasil terkecil tetap bisa diunduh beserta ukurannya. Kamu dapat mencoba memotong gambar, menurunkan dimensi lewat alat Ubah Ukuran Gambar, atau mengganti target. Tidak ada file yang dikirim keluar dari perangkat selama proses ini.",
            "WebP mendukung transparansi dan umumnya menghasilkan file lebih kecil, sehingga cocok bila formulir menerima format tersebut. Untuk foto tanpa transparansi, JPEG lebih efisien. Gunakan alat Konversi Gambar untuk berpindah format, lalu kompres hasilnya bila masih di atas batas.",
          ],
        },
      ],
      en: [
        {
          heading: "Why PNG does not shrink like JPEG",
          paragraphs: [
            "PNG compresses losslessly, so every pixel is preserved exactly. Re-encoding an already optimized PNG often saves very little, and sometimes the result is slightly larger because of encoder differences. The quality slider does nothing for this format.",
            "The only substantial way to reduce size is to reduce pixel count. Target mode does that when necessary, but the result is no longer a full-resolution image. Check the final dimensions before uploading, especially if the form requires a minimum size.",
          ],
        },
        {
          heading: "Transparency stays intact",
          paragraphs: [
            "When output remains PNG, transparent areas are preserved. That matters for logos placed on colored backgrounds, product cutouts, and design elements that will be pasted into another document. Transparent backgrounds can be a problem, though, for forms that demand white or red behind the photo.",
            "If the form requires a specific background, a transparent PNG is the wrong starting point. Converting to JPEG fills transparent areas with a solid color, usually white, and drops the alpha channel. Convert only after confirming which background color is required.",
          ],
        },
        {
          heading: "When 200 KB is realistic for a PNG",
          paragraphs: [
            "Simple logos, icons, and interface screenshots often fit within 200 KB once their dimensions are adjusted. Images with flat areas of color compress better than photographs. For web use, a width between 800 and 1200 pixels is usually still usable.",
            "A photo saved as PNG is almost always large because every color variation is stored. Targeting 200 KB on a photographic PNG forces an aggressive resolution cut. In that case, changing format makes more sense than insisting on PNG.",
          ],
          bullets: [
            "Use PNG for logos, icons, and text that needs crisp edges.",
            "Crop away empty margins you do not need.",
            "Check final dimensions against any minimum the form states.",
            "Avoid saving camera photos as large PNG files.",
            "Consider WebP when the form accepts transparent WebP.",
          ],
        },
        {
          heading: "Alternatives when PNG cannot reach 200 KB",
          paragraphs: [
            "If the tool reports that the target was missed, the smallest result is still available to download along with its size. You can crop the image, reduce dimensions with the Image Resizer, or change the target. Nothing leaves your device during any of this.",
            "WebP supports transparency and usually produces a smaller file, which helps when the form accepts that format. For photos without transparency, JPEG is more efficient. Use the Image Converter to switch formats, then compress again if the result is still over the limit.",
          ],
        },
      ],
    },
    faq: {
      id: [
        {
          q: "Apakah PNG kehilangan kualitas saat dikompres?",
          a: "Kompresi PNG tetap lossless, tetapi untuk mencapai 200 KB alat mungkin menurunkan resolusi. Gambar jadi lebih kecil dan bisa terlihat kurang tajam saat diperbesar. Periksa dimensi akhir sebelum mengunggah ke formulir.",
        },
        {
          q: "Apakah transparansi tetap ada?",
          a: "Ya, selama format keluaran tetap PNG. Area transparan tidak diisi warna. Jika kamu mengonversi ke JPEG, transparansi akan hilang dan diganti warna latar, biasanya putih.",
        },
        {
          q: "Kenapa ukuran PNG hampir tidak berubah?",
          a: "PNG bersifat lossless, jadi tidak ada kualitas yang bisa diturunkan seperti JPEG. Pengurangan besar hanya datang dari resolusi yang lebih kecil, pemotongan area kosong, atau perpindahan ke format lain seperti WebP.",
        },
        {
          q: "Bisakah PNG diubah ke JPG atau WebP?",
          a: "Bisa, gunakan alat Konversi Gambar. Pilih JPG untuk foto tanpa transparansi atau WebP untuk ukuran lebih kecil dengan transparansi. Setelah dikonversi, kompres lagi bila ukurannya masih melewati batas formulir.",
        },
      ],
      en: [
        {
          q: "Does PNG lose quality when compressed?",
          a: "PNG compression stays lossless, but reaching 200 KB may require lowering resolution. The image becomes smaller and can look softer when enlarged. Check the final dimensions before uploading to a form.",
        },
        {
          q: "Is transparency preserved?",
          a: "Yes, as long as the output format stays PNG. Transparent areas are not filled in. If you convert to JPEG, transparency is lost and replaced with a background color, usually white.",
        },
        {
          q: "Why does the PNG barely change size?",
          a: "PNG is lossless, so there is no quality level to reduce the way there is with JPEG. Real savings only come from smaller resolution, cropping empty areas, or moving to another format such as WebP.",
        },
        {
          q: "Can I convert PNG to JPG or WebP?",
          a: "Yes, use the Image Converter. Pick JPG for photos without transparency, or WebP for a smaller file that still supports transparency. Compress again afterward if the result is still above the form limit.",
        },
      ],
    },
    relatedTools: ["imageConvert", "imageResize", "imageCrop", "imageCompress"],
  },
  {
    slug: "merge-pdf",
    toolId: "pdfMerge",
    title: {
      id: "Gabung PDF di Browser: Urutan, Halaman, Ukuran",
      en: "Merge PDF in Your Browser: Order, Pages, Size",
    },
    description: {
      id: "Gabungkan beberapa PDF menjadi satu file di browser. Atur urutan, hapus file, periksa jumlah halaman, lalu perkecil hasilnya bila perlu.",
      en: "Merge several PDFs into one file in your browser. Set the order, remove files, check page counts, and shrink the merged result when needed.",
    },
    h1: {
      id: "Gabung PDF Jadi Satu File",
      en: "Merge PDFs Into One File",
    },
    intro: {
      id: [
        "Menggabungkan PDF sering diperlukan saat melamar kerja, mendaftar beasiswa, atau mengirim berkas administrasi: CV, ijazah, sertifikat, dan surat lamaran harus menjadi satu file agar mudah diperiksa. Urutan halaman dan ukuran akhir sama pentingnya dengan proses penggabungannya.",
        "Alat Gabung PDF di Ai2 All Compress bekerja di browser memakai pdf-lib. Halaman disalin apa adanya, sehingga teks, tautan, dan kualitas gambar tetap utuh. Tidak ada file yang diunggah atau disimpan di server.",
        "Halaman ini membahas cara mengatur urutan, menghapus file yang salah, membaca jumlah halaman, menangani PDF yang ditolak, dan memperkecil hasil gabungan bila batas unggahan menuntut.",
      ],
      en: [
        "Merging PDFs comes up when applying for a job, registering for a scholarship, or sending administrative paperwork: cover letter, CV, diploma, and certificates need to become one file that is easy to review. Page order and final size matter as much as the merge itself.",
        "The Merge PDF tool in Ai2 All Compress runs in your browser using pdf-lib. Pages are copied as they are, so text, links, and image quality stay intact. No file is uploaded or stored on a server.",
        "This page covers arranging the order, removing the wrong file, reading page counts, handling rejected PDFs, and shrinking the merged result when an upload limit demands it.",
      ],
    },
    bullets: {
      id: [
        "Maksimal 20 file, masing-masing hingga 100 MB.",
        "Urutan di layar menjadi urutan halaman di hasil akhir.",
        "Teks, tautan, dan kualitas halaman asli dipertahankan.",
        "PDF berpassword atau rusak ditolak dengan pesan yang jelas.",
        "Hasil gabungan bisa langsung dibawa ke alat perkecil ukuran.",
      ],
      en: [
        "Up to 20 files, each one limited to 100 MB.",
        "The order on screen becomes the page order in the result.",
        "Original text, links, and page quality are preserved.",
        "Password-protected or corrupted PDFs are rejected with a clear message.",
        "The merged file can be sent straight to the size reducer.",
      ],
    },
    sections: {
      id: [
        {
          heading: "Urutan daftar menentukan urutan halaman",
          paragraphs: [
            "Hasil gabungan mengikuti urutan kartu file di layar, dari atas ke bawah. Tarik kartu untuk memindahkannya, atau gunakan tombol naik dan turun yang tersedia di setiap item. Nomor urut membantu memastikan tidak ada berkas yang tertukar sebelum tombol gabung ditekan.",
            "Susunan yang lazim adalah surat lamaran, CV, lalu dokumen pendukung sesuai urutan yang diminta. Ganti nama file sebelum menambahkan agar mudah dikenali, misalnya dengan awalan nomor. Setelah digabung, urutan tidak bisa diubah dari dalam hasil; kamu perlu menyusun ulang dan menggabung lagi.",
          ],
        },
        {
          heading: "Memeriksa file sebelum digabung",
          paragraphs: [
            "Setiap file diperiksa saat ditambahkan, dan nama, ukuran, serta jumlah halaman ditampilkan. PDF berpassword atau rusak akan ditandai dan tidak bisa digabung; buka proteksinya dengan aplikasi PDF, lalu tambahkan kembali. Batasnya 20 file per antrean dan 100 MB per PDF.",
            "Perhatikan jumlah halaman total. Berkas 80 halaman mungkin terlalu berat untuk portal yang juga membatasi ukuran file. Hapus file yang tidak diminta, dan pastikan tidak ada lampiran ganda. Semua pemeriksaan ini berjalan lokal, jadi cepat dan tidak memakai kuota internet.",
          ],
        },
        {
          heading: "Ukuran hasil gabungan",
          paragraphs: [
            "Penggabungan menyalin halaman asli, bukan merender ulang, sehingga ukuran hasil kira-kira jumlah seluruh file dikurangi sebagian data yang sama. Tiga PDF berukuran 2 MB umumnya menghasilkan file sekitar 6 MB, bukan file yang tiba-tiba mengecil.",
            "Karena tidak ada kompresi di tahap ini, kualitas dan teks tetap terjaga. Itu keuntungan besar untuk dokumen resmi yang harus bisa dibaca mesin atau dicari. Kalau batas unggahan lebih kecil dari hasil gabungan, lanjutkan ke langkah berikutnya.",
          ],
          bullets: [
            "Periksa jumlah halaman sebelum menekan tombol gabung.",
            "Pastikan urutan sesuai instruksi formulir.",
            "Hapus berkas yang tidak diminta atau tercatat ganda.",
            "Unduh hasil dan buka untuk memeriksa halaman pertama serta terakhir.",
            "Simpan hasil gabungan sebelum melakukan kompresi tambahan.",
          ],
        },
        {
          heading: "Memperkecil hasil setelah digabung",
          paragraphs: [
            "Setelah penggabungan selesai, gunakan tombol untuk membawa hasil ke alat Perkecil PDF ke Target. Di sana kamu bisa menetapkan batas seperti 1 MB. Perlu diingat, proses itu merender halaman menjadi gambar, sehingga teks tidak lagi bisa dipilih atau dicari.",
            "Jika dokumen harus tetap bisa dicari, pertimbangkan memangkas halaman sebelum menggabung, atau gunakan alat Rapikan Halaman PDF dengan mode yang mempertahankan struktur asli. Selalu simpan hasil gabungan sebelum dikompres agar kamu punya versi lengkap yang bisa dipakai ulang.",
          ],
        },
      ],
      en: [
        {
          heading: "File order becomes page order",
          paragraphs: [
            "The merged result follows the file cards on screen, top to bottom. Drag a card to move it, or use the up and down buttons on each item. The numbering helps confirm that nothing got swapped before you press merge.",
            "A common arrangement is cover letter, then CV, then supporting documents in the order the form lists them. Rename files before adding them so each one is easy to identify, for example with a numeric prefix. Once merged, the order cannot be changed inside the result; you arrange the files again and merge a new copy.",
          ],
        },
        {
          heading: "Validating files before merging",
          paragraphs: [
            "Every file is checked when added, and its name, size, and page count are shown. Password-protected or corrupted PDFs are flagged and cannot be merged; remove the protection with a PDF app, then add the file again. The queue allows 20 files and each PDF can be up to 100 MB.",
            "Watch the total page count. An 80-page file may be too heavy for a portal that also caps file size. Remove documents nobody asked for and check for duplicates. All of this validation runs locally, so it is fast and does not use data.",
          ],
        },
        {
          heading: "What the merged file weighs",
          paragraphs: [
            "Merging copies original pages rather than re-rendering them, so the output is roughly the sum of the inputs minus some shared data. Three 2 MB PDFs typically produce a file around 6 MB, not one that suddenly gets smaller.",
            "Because there is no compression at this stage, quality and text remain intact. That is a real advantage for official documents that must stay machine-readable or searchable. If the upload limit is below the merged size, move on to the next step.",
          ],
          bullets: [
            "Check page counts before pressing the merge button.",
            "Confirm the order matches the form instructions.",
            "Remove files that were not requested or appear twice.",
            "Download the result and inspect the first and last page.",
            "Keep the merged file before applying any further compression.",
          ],
        },
        {
          heading: "Shrinking the merged result",
          paragraphs: [
            "When merging finishes, use the button that hands the result to the PDF Size Reducer. There you can set a limit such as 1 MB. Remember that this process re-renders pages as images, so text can no longer be selected or searched.",
            "If the document must stay searchable, consider trimming pages before merging, or use the Organize PDF tool with the mode that keeps the original structure. Always save the merged file before compressing so you retain a complete version to reuse.",
          ],
        },
      ],
    },
    faq: {
      id: [
        {
          q: "Apakah teks dan tautan tetap utuh setelah digabung?",
          a: "Ya. Penggabungan menyalin halaman asli tanpa render ulang, sehingga teks tetap bisa dipilih dan dicari, tautan tetap berfungsi, dan kualitas gambar tidak berubah. Ukuran hasil kira-kira jumlah file asal.",
        },
        {
          q: "Apakah PDF saya diunggah ke server?",
          a: "Tidak. Penggabungan memakai pdf-lib di browser. File hanya berada di memori perangkat, dan hasilnya diunduh langsung tanpa pernah meninggalkan browser. Menutup tab akan membersihkan data proses.",
        },
        {
          q: "Berapa banyak file yang bisa digabung?",
          a: "Hingga 20 file dalam satu antrean, dengan batas 100 MB per PDF. Jika salah satu file berpassword atau rusak, file itu ditandai dan tidak bisa digabung sampai diperbaiki.",
        },
        {
          q: "Bagaimana kalau urutan file ternyata salah?",
          a: "File asli tidak berubah, jadi kamu bisa mengubah urutan kartu lalu menggabung ulang. Untuk membalik urutan halaman di dalam hasil, gunakan alat Rapikan Halaman PDF dengan mode yang mempertahankan struktur asli.",
        },
      ],
      en: [
        {
          q: "Are text and links still intact after merging?",
          a: "Yes. Merging copies original pages without re-rendering, so text remains selectable and searchable, links keep working, and image quality is unchanged. The result is roughly the sum of the input files.",
        },
        {
          q: "Are my PDFs uploaded to a server?",
          a: "No. Merging uses pdf-lib in your browser. Files stay in device memory, and the result downloads directly without ever leaving the browser. Closing the tab clears the working data.",
        },
        {
          q: "How many files can I merge?",
          a: "Up to 20 files in one queue, with a 100 MB limit per PDF. If one file is password-protected or corrupted, it is flagged and cannot be merged until it is fixed.",
        },
        {
          q: "What if the file order turns out to be wrong?",
          a: "The original files are untouched, so you can rearrange the cards and merge again. To reverse the page order inside the result, use the Organize PDF tool with the mode that preserves the original structure.",
        },
      ],
    },
    relatedTools: ["pdfReduce", "pdfOrganize", "pdfCompress", "imageCompress"],
  },
  {
    slug: "jpg-to-pdf",
    toolId: "imageToPdf",
    config: { imagePdf: { pageSize: "a4" } },
    title: {
      id: "Konversi JPG ke PDF Tanpa Upload File",
      en: "Convert JPG to PDF Without Uploading Files",
    },
    description: {
      id: "Gabungkan beberapa JPG menjadi satu PDF A4 langsung di browser. Atur urutan halaman, dapatkan margin rapi, dan unduh tanpa upload.",
      en: "Combine several JPGs into one A4 PDF right in your browser. Reorder pages, keep clean margins, and download without uploading.",
    },
    h1: {
      id: "Konversi JPG ke PDF",
      en: "Convert JPG to PDF",
    },
    intro: {
      id: [
        "Menggabungkan foto atau hasil pindai JPG menjadi satu PDF sering dibutuhkan saat melamar kerja, mengirim dokumen administrasi, atau mengarsipkan bukti transaksi. Banyak portal hanya menerima satu lampiran PDF, bukan beberapa gambar terpisah.",
        "Halaman ini membuka alat Gambar ke PDF dengan ukuran halaman A4 sudah dipilih. Tambahkan file JPG, atur urutannya, lalu tekan Buat PDF. Semua pemrosesan berjalan di browser memakai canvas dan pdf-lib, sehingga file tidak dikirim ke server.",
        "Ukuran A4 menempatkan setiap gambar di tengah halaman dengan margin putih dan memilih orientasi portrait atau landscape secara otomatis. Jika kamu lebih suka halaman mengikuti proporsi foto tanpa margin, ganti ukuran halaman ke Auto.",
      ],
      en: [
        "Combining photos or scanned JPGs into a single PDF comes up when applying for a job, sending administrative documents, or archiving receipts. Many portals accept only one PDF attachment rather than several separate images.",
        "This page opens the Images to PDF tool with A4 already selected. Add JPG files, arrange the order, and press Create PDF. Everything runs in your browser with canvas and pdf-lib, so the files are never sent to a server.",
        "A4 centers each image on the page with a white margin and picks portrait or landscape automatically. If you prefer pages that follow the photo proportions without margins, switch the page size to Auto.",
      ],
    },
    bullets: {
      id: [
        "Beberapa JPG digabung menjadi satu PDF sesuai urutan daftar.",
        "A4 sudah dipilih saat halaman dibuka; Auto tersedia untuk arsip digital.",
        "Setiap gambar maksimal 50 MB, hingga 20 gambar per PDF.",
        "Urutan bisa diubah lewat drag and drop atau tombol naik dan turun.",
        "File asli tidak diubah dan tidak ada unggahan ke server.",
      ],
      en: [
        "Several JPGs are combined into one PDF in list order.",
        "A4 is pre-selected on this page; Auto is available for digital archives.",
        "Each image can be up to 50 MB, with 20 images per PDF.",
        "Reorder with drag and drop or the up and down buttons.",
        "Original files stay untouched and nothing is uploaded.",
      ],
    },
    sections: {
      id: [
        {
          heading: "Kapan JPG perlu diubah menjadi PDF",
          paragraphs: [
            "PDF menyatukan beberapa halaman menjadi satu file yang mudah dikirim dan dicetak. Penerima tidak perlu membuka banyak file, dan urutan halaman tetap terjaga. Format ini juga lebih diterima oleh sistem lamaran kerja, kampus, dan portal administrasi.",
            "JPG tetap berguna sebagai format sumber karena hampir semua kamera dan ponsel menyimpannya secara default. Yang perlu dilakukan adalah menggabungkannya dengan rapi, bukan mengonversi setiap gambar secara manual di aplikasi yang berbeda.",
          ],
        },
        {
          heading: "Menyiapkan halaman A4 yang rapi",
          paragraphs: [
            "Periksa orientasi setiap foto sebelum membuat PDF. Foto yang miring atau terbalik tidak bisa diputar di alat ini, jadi putar dulu di galeri atau editor perangkat. Pastikan juga urutan halaman sesuai dokumen yang diminta.",
            "A4 memberi ukuran kertas yang konsisten untuk semua halaman. Ini penting saat PDF dicetak atau digabung dengan dokumen lain. Sisi putih di sekitar gambar adalah margin, bukan ruang yang terbuang.",
          ],
          bullets: [
            "Putar foto yang miring sebelum ditambahkan.",
            "Susun urutan dari halaman pertama hingga terakhir.",
            "Gunakan A4 untuk dokumen cetak, Auto untuk arsip digital.",
            "Periksa hasil PDF sebelum mengunggah ke formulir.",
          ],
        },
        {
          heading: "Kualitas gambar dan privasi",
          paragraphs: [
            "JPG diproses ulang pada kualitas tinggi sebelum ditanam ke PDF, sehingga ada penurunan kecil yang biasanya tidak terlihat. Mulai dari file asli dan hindari foto yang sudah berkali-kali dikirim lewat aplikasi chat agar artefaknya tidak menumpuk.",
            "Tidak ada API unggahan di balik alat ini. Gambar dibaca dari perangkat, digabung di memori browser, lalu PDF hasilnya diunduh langsung. Menutup tab akan membebaskan data proses tanpa meninggalkan salinan di server.",
          ],
        },
      ],
      en: [
        {
          heading: "When JPG files should become a PDF",
          paragraphs: [
            "A PDF brings several pages into one file that is easy to send and print. The recipient does not have to open a pile of files, and the page order stays intact. The format is also more widely accepted by job, campus, and administrative portals.",
            "JPG remains useful as a source format because nearly every camera and phone saves to it by default. The task is to combine those images neatly rather than converting each one manually in a different app.",
          ],
        },
        {
          heading: "Preparing clean A4 pages",
          paragraphs: [
            "Check the orientation of every photo before creating the PDF. This tool cannot rotate an image, so straighten sideways or upside-down photos in your gallery or editor first. Also confirm that the page order matches the document the form expects.",
            "A4 gives every page the same paper size, which matters when the PDF is printed or combined with other documents. The white space around each image is a deliberate margin, not wasted room.",
          ],
          bullets: [
            "Rotate crooked photos before adding them.",
            "Arrange pages from first to last.",
            "Use A4 for printed documents and Auto for digital archives.",
            "Review the final PDF before uploading it to a form.",
          ],
        },
        {
          heading: "Image quality and privacy",
          paragraphs: [
            "JPGs are re-encoded at high quality before being embedded, so there is a small loss that is usually invisible. Start from the original file and avoid photos that have been sent through chat apps many times, since their artefacts accumulate.",
            "There is no upload API behind this tool. Images are read from your device, combined in browser memory, and the resulting PDF downloads directly. Closing the tab frees the working data and leaves no copy on a server.",
          ],
        },
      ],
    },
    faq: {
      id: [
        {
          q: "Apakah file JPG saya diunggah?",
          a: "Tidak. JPG dibaca dan digabung di browser memakai canvas dan pdf-lib. Tidak ada unggahan ke server, dan PDF hasil hanya ada di memori perangkat sampai kamu mengunduhnya.",
        },
        {
          q: "Berapa banyak JPG yang bisa digabung menjadi satu PDF?",
          a: "Hingga 20 gambar per PDF, dengan batas 50 MB per file. Setiap gambar diperiksa saat ditambahkan, dan yang gagal dibaca ditandai dengan pesan yang jelas tanpa menghentikan gambar lain.",
        },
        {
          q: "Apakah kualitas JPG turun setelah dibuat PDF?",
          a: "JPG di-encode ulang pada kualitas tinggi sebelum ditanam, sehingga ada penurunan kecil yang biasanya tidak terlihat. Mulai dari file asli dan periksa hasil PDF sebelum mengirimnya ke formulir penting.",
        },
        {
          q: "Bagaimana cara mengubah urutan halaman?",
          a: "Tarik kartu gambar ke posisi yang diinginkan, atau gunakan tombol naik dan turun yang tersedia di setiap item. Urutan daftar dari atas ke bawah menjadi urutan halaman di PDF hasil.",
        },
      ],
      en: [
        {
          q: "Are my JPG files uploaded?",
          a: "No. JPGs are read and combined in your browser with canvas and pdf-lib. Nothing is uploaded to a server, and the PDF exists only in device memory until you download it.",
        },
        {
          q: "How many JPGs can I combine into one PDF?",
          a: "Up to 20 images per PDF, with a 50 MB limit per file. Each image is checked when added, and any file that cannot be read is flagged with a clear message without stopping the others.",
        },
        {
          q: "Does JPG quality drop after creating the PDF?",
          a: "JPGs are re-encoded at high quality before being embedded, so there is a small loss that is usually invisible. Start from the originals and review the PDF before sending it to an important form.",
        },
        {
          q: "How do I change the page order?",
          a: "Drag an image card to the desired position, or use the up and down buttons on each item. The list order from top to bottom becomes the page order in the finished PDF.",
        },
      ],
    },
    relatedTools: ["imageCompress", "imageConvert", "pdfMerge", "pdfToImage"],
  },
  {
    slug: "png-to-pdf",
    toolId: "imageToPdf",
    config: { imagePdf: { pageSize: "a4" } },
    title: {
      id: "Konversi PNG ke PDF Tanpa Kehilangan Ketajaman",
      en: "Convert PNG to PDF Without Losing Sharpness",
    },
    description: {
      id: "Gabungkan tangkapan layar dan diagram PNG menjadi satu PDF A4 di browser. Teks tetap tajam dan tidak ada file yang diunggah.",
      en: "Combine PNG screenshots and diagrams into one A4 PDF in your browser. Text and line art stay sharp, and no file is ever uploaded to a server.",
    },
    h1: {
      id: "Konversi PNG ke PDF",
      en: "Convert PNG to PDF",
    },
    intro: {
      id: [
        "PNG menyimpan tangkapan layar, diagram, dan teks dengan tepi tajam. Saat beberapa PNG harus dikirim sebagai satu dokumen, PDF membuat penerima bisa membukanya dalam satu kali tanpa kehilangan urutan halaman.",
        "Halaman ini membuka alat Gambar ke PDF dengan A4 dipilih. Tambahkan PNG, atur urutan, lalu buat PDF. PNG tetap disimpan sebagai PNG di dalam PDF, sehingga teks dan garis tidak mengalami kompresi lossy tambahan.",
        "Area transparan pada PNG akan terlihat putih karena halaman PDF memiliki latar putih. Jika transparansi perlu dipertahankan untuk keperluan lain, simpan file PNG asli secara terpisah.",
      ],
      en: [
        "PNG keeps screenshots, diagrams, and text crisp. When several PNGs need to travel as one document, a PDF lets the recipient open everything at once without losing the page order.",
        "This page opens the Images to PDF tool with A4 selected. Add PNGs, arrange the order, and create the PDF. PNGs stay PNG inside the PDF, so text and lines avoid another round of lossy compression.",
        "Transparent areas in a PNG appear white because PDF pages have a white background. If transparency must survive for another purpose, keep the original PNG file separately.",
      ],
    },
    bullets: {
      id: [
        "PNG tetap PNG di dalam PDF agar teks dan garis tetap tajam.",
        "Ukuran A4 sudah dipilih; Auto bisa dipakai agar halaman mengikuti gambar.",
        "Hingga 20 PNG, masing-masing maksimal 50 MB.",
        "Urutan halaman diatur dengan drag and drop atau tombol.",
        "Semua proses lokal, tanpa upload dan tanpa akun.",
      ],
      en: [
        "PNGs stay PNG inside the PDF so text and lines remain sharp.",
        "A4 is pre-selected; Auto is available when pages should follow the images.",
        "Up to 20 PNGs, each one limited to 50 MB.",
        "Reorder pages with drag and drop or the buttons.",
        "Everything runs locally, with no upload and no account.",
      ],
    },
    sections: {
      id: [
        {
          heading: "Kelebihan PNG untuk tangkapan layar dan diagram",
          paragraphs: [
            "PNG adalah format lossless yang populer untuk tangkapan layar, diagram, logo, dan gambar dengan transparansi. Karena setiap piksel dipertahankan, huruf kecil dan garis tipis tetap terbaca setelah gambar dipindahkan ke dokumen lain.",
            "PDF mendukung PNG secara native, jadi alat ini mempertahankan format tersebut saat menanam gambar. Ini berbeda dari mengubah PNG menjadi JPG terlebih dahulu, yang bisa menimbulkan noise di sekitar teks dan menghilangkan transparansi.",
          ],
        },
        {
          heading: "A4 atau Auto untuk dokumen PNG",
          paragraphs: [
            "A4 memberi ukuran halaman yang seragam dan margin putih di sekeliling gambar. Pilihan ini cocok untuk dokumen yang akan dicetak atau digabung dengan berkas lain. Orientasi portrait atau landscape dipilih otomatis mengikuti bentuk gambar.",
            "Auto membuat halaman mengikuti rasio gambar, sehingga tangkapan layar lebar tidak memiliki bingkai putih besar. Namun ukuran halaman bisa berbeda-beda. Untuk arsip digital pribadi, Auto sering terasa lebih pas; untuk dokumen resmi, A4 lebih aman.",
          ],
          bullets: [
            "Gunakan A4 untuk cetak dan dokumen resmi.",
            "Gunakan Auto untuk tangkapan layar lebar dan arsip digital.",
            "Periksa urutan sebelum membuat PDF.",
            "Pastikan gambar tidak terpotong di sisi mana pun.",
          ],
        },
        {
          heading: "Transparansi dan ketajaman teks",
          paragraphs: [
            "Halaman PDF memiliki latar putih, jadi bagian transparan pada PNG akan tampil putih. Itu normal dan biasanya justru diinginkan untuk dokumen. Jika kamu membutuhkan latar transparan, simpan PNG asli dan jangan mengandalkan PDF sebagai pengganti.",
            "Untuk menjaga teks tetap tajam, mulai dari PNG beresolusi penuh dan hindari menambahkan gambar hasil tangkapan ulang dari layar. Alat ini membatasi sisi terpanjang gambar agar memori browser tetap aman, lalu menempatkannya tanpa memperbesar melebihi resolusi asli.",
          ],
        },
      ],
      en: [
        {
          heading: "Why PNG suits screenshots and diagrams",
          paragraphs: [
            "PNG is a lossless format popular for screenshots, diagrams, logos, and images with transparency. Because every pixel is preserved, small letters and thin lines stay readable after the image moves into another document.",
            "PDF supports PNG natively, so this tool keeps that format when embedding the image. That differs from converting to JPG first, which can add noise around text and drop transparency.",
          ],
        },
        {
          heading: "A4 or Auto for PNG documents",
          paragraphs: [
            "A4 gives every page a consistent size with a white margin around the image. It suits documents that will be printed or combined with other files. Portrait or landscape is selected automatically based on the image shape.",
            "Auto makes the page follow the image ratio, so a wide screenshot does not sit inside a large white frame. Page sizes can vary, though. For a personal digital archive Auto often feels right; for official documents A4 is safer.",
          ],
          bullets: [
            "Use A4 for printing and official documents.",
            "Use Auto for wide screenshots and digital archives.",
            "Check the order before creating the PDF.",
            "Make sure no image is cropped on any side.",
          ],
        },
        {
          heading: "Transparency and text sharpness",
          paragraphs: [
            "A PDF page has a white background, so transparent parts of a PNG show as white. That is normal and usually desirable for documents. If you need a transparent background, keep the original PNG and do not use the PDF as a replacement.",
            "To keep text sharp, start from full-resolution PNGs and avoid adding screenshots of screenshots. The tool caps the longest image side to protect browser memory, then places the image without upscaling it beyond its original resolution.",
          ],
        },
      ],
    },
    faq: {
      id: [
        {
          q: "Format apa saja yang bisa dijadikan PDF?",
          a: "Alat ini menerima JPG, PNG, dan WebP, masing-masing hingga 50 MB dan maksimal 20 gambar per PDF. Halaman ini sudah diatur ke A4, tetapi kamu bisa menggantinya ke Auto.",
        },
        {
          q: "Apakah transparansi PNG dipertahankan?",
          a: "PNG tetap disimpan sebagai PNG di dalam PDF, tetapi halaman PDF memiliki latar putih. Area transparan akan terlihat putih saat halaman dibuka. Simpan file PNG asli jika latar transparan masih diperlukan.",
        },
        {
          q: "Apakah teks pada PNG tetap tajam?",
          a: "Ya. PNG tidak diubah menjadi JPG, sehingga huruf dan garis tidak mengalami kompresi lossy tambahan. Mulai dari tangkapan layar beresolusi penuh dan hindari gambar yang sudah diperkecil sebelum ditambahkan.",
        },
        {
          q: "Berapa banyak gambar yang bisa diproses?",
          a: "Hingga 20 file dalam satu PDF, dengan batas 50 MB per gambar. Pemrosesan berjalan lokal, jadi kecepatan bergantung pada perangkat dan ukuran gambar.",
        },
      ],
      en: [
        {
          q: "Which formats can become a PDF?",
          a: "This tool accepts JPG, PNG, and WebP, each up to 50 MB and up to 20 images per PDF. This page is set to A4, but you can switch it to Auto.",
        },
        {
          q: "Is PNG transparency preserved?",
          a: "PNGs stay PNG inside the PDF, but a PDF page has a white background. Transparent areas appear white when the page is opened. Keep the original PNG if you still need a transparent background.",
        },
        {
          q: "Does text in a PNG stay sharp?",
          a: "Yes. PNGs are not converted to JPG, so letters and lines avoid extra lossy compression. Start from a full-resolution screenshot and avoid images that were already shrunk before being added.",
        },
        {
          q: "How many images can I process?",
          a: "Up to 20 files in one PDF, with a 50 MB limit per image. Processing runs locally, so speed depends on your device and the image sizes.",
        },
      ],
    },
    relatedTools: ["imageConvert", "imageCompress", "pdfMerge", "pdfToImage"],
  },
  {
    slug: "pdf-to-jpg",
    toolId: "pdfToImage",
    config: { pdfImage: { format: "image/jpeg" } },
    title: {
      id: "Konversi PDF ke JPG per Halaman Tanpa Upload",
      en: "Convert PDF to JPG per Page Without Uploading",
    },
    description: {
      id: "Ubah setiap halaman PDF menjadi JPG dengan pilihan 72, 150, atau 300 DPI. Unduh per halaman atau semua dalam ZIP, 100% di browser.",
      en: "Turn every PDF page into a JPG with 72, 150, or 300 DPI options. Download pages individually or as a ZIP, 100% in your browser.",
    },
    h1: {
      id: "Konversi PDF ke JPG",
      en: "Convert PDF to JPG",
    },
    intro: {
      id: [
        "JPG adalah format yang mudah ditempel ke presentasi, dokumen lain, atau unggahan media sosial. Ketika isi penting berada di dalam PDF, mengubah setiap halaman menjadi JPG membuatnya lebih mudah dibagikan tanpa perlu aplikasi pembaca PDF.",
        "Halaman ini membuka alat PDF ke Gambar dengan format JPG dipilih. Tambahkan PDF, tentukan resolusi dan kualitas, lalu konversi. Setiap halaman dirender di browser memakai pdf.js dan canvas; file tidak dikirim ke server.",
        "Kamu bisa mengunduh satu halaman yang dibutuhkan atau semua halaman sekaligus dalam arsip ZIP yang dibuat di perangkat. Teks pada hasil JPG tidak lagi bisa dipilih atau dicari, jadi simpan PDF asli untuk kebutuhan tersebut.",
      ],
      en: [
        "JPG is easy to drop into a presentation, another document, or a social media upload. When important content lives inside a PDF, converting each page to JPG makes it simpler to share without a PDF reader.",
        "This page opens the PDF to Images tool with JPG selected. Add a PDF, choose resolution and quality, then convert. Every page is rendered in your browser with pdf.js and canvas; nothing is sent to a server.",
        "Download only the pages you need or all of them in a ZIP archive built on your device. Text in the JPG can no longer be selected or searched, so keep the original PDF for those needs.",
      ],
    },
    bullets: {
      id: [
        "Format JPG sudah dipilih saat halaman dibuka.",
        "Resolusi 72, 150, atau 300 DPI dengan pengatur kualitas JPG.",
        "Pratinjau setiap halaman beserta ukuran piksel dan ukuran file.",
        "Unduh per halaman atau semua halaman dalam ZIP.",
        "PDF maksimal 100 MB; tidak ada upload ke server.",
      ],
      en: [
        "JPG is pre-selected on this page.",
        "72, 150, or 300 DPI with a JPG quality control.",
        "Preview each page with its pixel dimensions and file size.",
        "Download single pages or every page as a ZIP.",
        "Up to 100 MB per PDF; nothing is uploaded.",
      ],
    },
    sections: {
      id: [
        {
          heading: "Kapan halaman PDF sebaiknya menjadi JPG",
          paragraphs: [
            "Slide presentasi, gambar produk, dan tangkapan halaman untuk media sosial biasanya membutuhkan JPG, bukan PDF. Format ini diterima hampir di mana saja dan mudah dimasukkan ke aplikasi yang tidak mendukung PDF.",
            "JPG juga berguna saat kamu hanya perlu satu halaman dari dokumen panjang. Ubah seluruh PDF, lalu unduh halaman yang relevan tanpa harus mengirim seluruh dokumen ke orang lain.",
          ],
        },
        {
          heading: "Memilih resolusi dan kualitas",
          paragraphs: [
            "72 DPI cukup untuk pratinjau dan file kecil. 150 DPI seimbang untuk layar, presentasi, dan dokumen sehari-hari. 300 DPI memberi detail cetak, tetapi menghasilkan gambar lebih besar dan proses lebih lama.",
            "Kualitas JPG antara 88% dan 95% menjaga teks tetap terbaca. Turunkan bila ukuran file menjadi masalah, tetapi periksa kembali huruf kecil dan garis tipis sebelum digunakan. Untuk halaman berisi teks sangat kecil, pertimbangkan format PNG.",
          ],
          bullets: [
            "72 DPI untuk pratinjau cepat.",
            "150 DPI untuk layar dan presentasi.",
            "300 DPI untuk cetak.",
            "Periksa hasil pada zoom 100 persen sebelum dibagikan.",
          ],
        },
        {
          heading: "Mengunduh per halaman atau sekaligus",
          paragraphs: [
            "Setelah proses selesai, setiap halaman tampil sebagai pratinjau dengan nomor, dimensi piksel, dan ukuran file. Tombol unduh per halaman memudahkan mengambil bagian tertentu tanpa menyimpan semuanya.",
            "Tombol Unduh semua (ZIP) menggabungkan seluruh gambar dalam satu arsip. ZIP dibuat dengan jszip di perangkatmu, jadi tidak ada gambar yang diunggah. PDF berpassword atau rusak ditolak dengan pesan jelas; buka proteksinya terlebih dahulu.",
          ],
        },
      ],
      en: [
        {
          heading: "When PDF pages should become JPG",
          paragraphs: [
            "Presentation slides, product images, and social media captures usually need JPG rather than PDF. The format is accepted almost everywhere and fits into apps that cannot open PDFs.",
            "JPG also helps when you need only one page from a long document. Convert the whole PDF, then download the relevant pages without sending the entire document to someone else.",
          ],
        },
        {
          heading: "Choosing resolution and quality",
          paragraphs: [
            "72 DPI is enough for previews and small files. 150 DPI is a balance for screens, presentations, and everyday documents. 300 DPI keeps print detail but creates larger images and takes longer.",
            "JPG quality between 88% and 95% keeps text readable. Lower it when file size becomes a problem, but inspect small letters and thin lines afterward. For pages with very small text, consider PNG instead.",
          ],
          bullets: [
            "72 DPI for quick previews.",
            "150 DPI for screens and presentations.",
            "300 DPI for printing.",
            "Inspect the result at 100 percent zoom before sharing.",
          ],
        },
        {
          heading: "Downloading single pages or everything",
          paragraphs: [
            "When processing finishes, every page appears as a preview with its number, pixel dimensions, and file size. The per-page download button lets you take one section without saving the rest.",
            "The Download all (ZIP) button bundles every image into one archive. The ZIP is built with jszip on your device, so no image is uploaded. Password-protected or corrupted PDFs are rejected with a clear message; remove the protection first.",
          ],
        },
      ],
    },
    faq: {
      id: [
        {
          q: "Apakah PDF saya diunggah?",
          a: "Tidak. PDF dibaca dengan pdf.js di browser, lalu setiap halaman dirender ke canvas dan diubah menjadi JPG. Tidak ada file yang dikirim ke server dan tidak ada hasil yang disimpan setelah tab ditutup.",
        },
        {
          q: "Resolusi mana yang sebaiknya dipilih?",
          a: "72 DPI untuk pratinjau cepat, 150 DPI untuk layar dan presentasi, dan 300 DPI untuk cetak. Resolusi lebih tinggi menghasilkan gambar lebih tajam, tetapi ukuran file dan waktu proses ikut bertambah.",
        },
        {
          q: "Apakah teks pada JPG bisa diedit?",
          a: "Tidak. Hasilnya adalah gambar, sehingga teks tidak bisa dipilih, dicari, atau diedit. Simpan PDF asli bila kamu masih membutuhkan teks yang dapat dicari atau disalin.",
        },
        {
          q: "Apakah semua halaman bisa diunduh sekaligus?",
          a: "Bisa. Setelah proses selesai, tekan Unduh semua (ZIP). Arsip dibuat di perangkat dengan jszip tanpa mengunggah gambar, dan halaman juga tetap bisa diunduh satu per satu.",
        },
      ],
      en: [
        {
          q: "Is my PDF uploaded?",
          a: "No. The PDF is read with pdf.js in your browser, then each page is rendered to canvas and encoded as JPG. Nothing is sent to a server, and no result is stored after you close the tab.",
        },
        {
          q: "Which resolution should I choose?",
          a: "72 DPI for quick previews, 150 DPI for screens and presentations, and 300 DPI for printing. Higher resolution produces sharper images but also larger files and longer processing.",
        },
        {
          q: "Can the text in a JPG be edited?",
          a: "No. The output is an image, so text cannot be selected, searched, or edited. Keep the original PDF when you still need searchable or copyable text.",
        },
        {
          q: "Can I download every page at once?",
          a: "Yes. When processing finishes, press Download all (ZIP). The archive is built on your device with jszip without uploading the images, and individual pages remain available to download separately.",
        },
      ],
    },
    relatedTools: ["pdfCompress", "pdfOrganize", "imageCompress", "imageToPdf"],
  },
  {
    slug: "pdf-to-png",
    toolId: "pdfToImage",
    config: { pdfImage: { format: "image/png" } },
    title: {
      id: "Konversi PDF ke PNG untuk Teks yang Tetap Tajam",
      en: "Convert PDF to PNG for Sharp, Lossless Text",
    },
    description: {
      id: "Ekspor halaman PDF menjadi PNG lossless dengan pilihan 72, 150, atau 300 DPI. Cocok untuk teks, tabel, dan diagram tanpa upload.",
      en: "Export PDF pages as lossless PNG files at 72, 150, or 300 DPI. Ideal for text, tables, and diagrams that must stay sharp, with no upload.",
    },
    h1: {
      id: "Konversi PDF ke PNG",
      en: "Convert PDF to PNG",
    },
    intro: {
      id: [
        "PNG menyimpan gambar tanpa kompresi lossy, sehingga teks, garis tipis, dan diagram tetap tajam. Saat halaman PDF perlu dipakai di dokumen lain atau diolah lebih lanjut, PNG sering menjadi pilihan yang lebih aman daripada JPG.",
        "Halaman ini membuka alat PDF ke Gambar dengan format PNG dipilih. Atur resolusi 72, 150, atau 300 DPI, lalu konversi seluruh halaman. Semua rendering berjalan di browser dan hasilnya bisa diunduh per halaman atau sebagai ZIP.",
        "Karena PNG bersifat lossless, ukuran file biasanya lebih besar daripada JPG. Gunakan PNG ketika ketajaman lebih penting daripada ukuran, dan pilih JPG bila gambar hanya perlu dilihat di layar atau dibagikan lewat pesan.",
      ],
      en: [
        "PNG stores images without lossy compression, so text, thin lines, and diagrams stay crisp. When PDF pages need to be used in another document or edited further, PNG is often safer than JPG.",
        "This page opens the PDF to Images tool with PNG selected. Choose 72, 150, or 300 DPI, then convert every page. Rendering runs in your browser, and the results can be downloaded per page or as a ZIP.",
        "Because PNG is lossless, files are usually larger than JPG. Use PNG when sharpness matters more than size, and choose JPG when the image only needs to be viewed on screen or shared in a message.",
      ],
    },
    bullets: {
      id: [
        "Format PNG sudah dipilih saat halaman dibuka.",
        "Resolusi 72, 150, atau 300 DPI tanpa kompresi lossy.",
        "Cocok untuk halaman berisi teks, tabel, dan diagram.",
        "Unduh per halaman atau semuanya dalam ZIP.",
        "Pemrosesan lokal; PDF tidak diunggah.",
      ],
      en: [
        "PNG is pre-selected on this page.",
        "72, 150, or 300 DPI without lossy compression.",
        "Suited to pages with text, tables, and diagrams.",
        "Download pages individually or all of them as a ZIP.",
        "Local processing; the PDF is never uploaded.",
      ],
    },
    sections: {
      id: [
        {
          heading: "Kapan PNG lebih tepat daripada JPG",
          paragraphs: [
            "JPG bagus untuk foto karena menghasilkan file kecil, tetapi tepi huruf dan garis tipis bisa tampak bergetar. PNG menyimpan setiap piksel dengan tepat, sehingga teks pada kontrak, slide, atau diagram tetap tajam saat diperbesar.",
            "PNG juga berguna saat halaman akan diedit lagi di aplikasi desain. Tidak adanya artefak kompresi membuat gambar lebih mudah dipotong, ditempel, atau digabung dengan elemen lain tanpa kehilangan kualitas.",
          ],
        },
        {
          heading: "Resolusi untuk teks dan diagram",
          paragraphs: [
            "150 DPI biasanya cukup untuk dibaca di layar dan dimasukkan ke presentasi. Jika hasilnya akan dicetak atau diperbesar, pilih 300 DPI. Perlu diingat, menaikkan DPI memperbesar dimensi piksel dan ukuran file secara signifikan.",
            "Alat ini membatasi ukuran render agar memori browser tetap aman. Untuk halaman yang sangat besar, resolusi mungkin dibatasi secara otomatis; periksa dimensi akhir pada pratinjau sebelum mengunduh.",
          ],
          bullets: [
            "150 DPI untuk layar dan presentasi.",
            "300 DPI untuk cetak dan zoom detail.",
            "Periksa dimensi piksel pada kartu pratinjau.",
            "Gunakan ZIP untuk menyimpan semua halaman sekaligus.",
          ],
        },
        {
          heading: "Teks tidak lagi bisa dicari",
          paragraphs: [
            "Hasil konversi adalah gambar, bukan PDF dengan lapisan teks. Teks tidak bisa dipilih, dicari, atau disalin dari PNG. Simpan PDF asli bila kamu masih membutuhkan fungsi pencarian atau pengeditan.",
            "Jika tujuanmu justru mengarsipkan tampilan halaman agar identik di semua perangkat, PNG adalah pilihan yang tepat. Prosesnya tidak mengunggah file, dan menutup tab akan membersihkan data dari memori.",
          ],
        },
      ],
      en: [
        {
          heading: "When PNG beats JPG",
          paragraphs: [
            "JPG works well for photos because it produces small files, but letter edges and thin lines can look shaky. PNG stores every pixel exactly, so text in contracts, slides, or diagrams stays sharp when enlarged.",
            "PNG also helps when a page will be edited again in a design app. The absence of compression artefacts makes the image easier to crop, paste, or combine with other elements without losing quality.",
          ],
        },
        {
          heading: "Resolution for text and diagrams",
          paragraphs: [
            "150 DPI is usually enough for reading on screen and placing pages in presentations. If the result will be printed or enlarged, choose 300 DPI. Keep in mind that higher DPI increases pixel dimensions and file size significantly.",
            "The tool caps render size to protect browser memory. For very large pages, resolution may be limited automatically; check the final dimensions in the preview before downloading.",
          ],
          bullets: [
            "150 DPI for screens and presentations.",
            "300 DPI for printing and close-up detail.",
            "Check pixel dimensions on the preview card.",
            "Use ZIP to save every page in one go.",
          ],
        },
        {
          heading: "Text is no longer searchable",
          paragraphs: [
            "The output is an image, not a PDF with a text layer. Text cannot be selected, searched, or copied from a PNG. Keep the original PDF when you still need search or editing.",
            "If the goal is to archive exactly how pages look across devices, PNG is a good fit. The process does not upload files, and closing the tab clears the working data from memory.",
          ],
        },
      ],
    },
    faq: {
      id: [
        {
          q: "Apakah PNG lebih baik daripada JPG untuk halaman PDF?",
          a: "Untuk halaman berisi teks, tabel, dan garis tipis, PNG lebih tajam karena tidak memakai kompresi lossy. Untuk foto, JPG biasanya lebih kecil dan cukup baik. Pilih sesuai isi halaman dan kebutuhan ukuran.",
        },
        {
          q: "Resolusi berapa yang sebaiknya dipakai?",
          a: "150 DPI seimbang untuk layar dan presentasi. Gunakan 300 DPI untuk cetak atau saat detail kecil harus tetap jelas. Resolusi lebih tinggi memperbesar ukuran file dan memperlama proses.",
        },
        {
          q: "Apakah latar transparan pada PDF dipertahankan?",
          a: "Halaman PDF dirender di atas latar putih, sehingga PNG hasilnya memiliki latar putih yang padat. Jika kamu membutuhkan transparansi, simpan elemen asli dari dokumen sumber, bukan hasil render halaman.",
        },
        {
          q: "Apakah teks masih bisa dicari?",
          a: "Tidak. Hasilnya adalah gambar PNG, sehingga teks tidak bisa dipilih atau dicari. Simpan PDF asli bila dokumen masih perlu dicari, disalin, atau diedit.",
        },
      ],
      en: [
        {
          q: "Is PNG better than JPG for PDF pages?",
          a: "For pages with text, tables, and thin lines, PNG is sharper because it uses no lossy compression. For photos, JPG is usually smaller and good enough. Choose based on the page content and size needs.",
        },
        {
          q: "Which resolution should I use?",
          a: "150 DPI is a good balance for screens and presentations. Use 300 DPI for printing or when small details must stay clear. Higher resolution increases file size and processing time.",
        },
        {
          q: "Is a transparent PDF background preserved?",
          a: "PDF pages are rendered onto a white background, so the resulting PNG has a solid white background. If you need transparency, export the original element from the source document rather than a rendered page.",
        },
        {
          q: "Can the text still be searched?",
          a: "No. The output is a PNG image, so text cannot be selected or searched. Keep the original PDF if the document still needs to be searched, copied, or edited.",
        },
      ],
    },
    relatedTools: ["pdfCompress", "pdfOrganize", "imageCompress", "imageToPdf"],
  },
  {
    slug: "word-to-pdf",
    toolId: "docxToPdf",
    title: {
      id: "Konversi Word ke PDF Online Tanpa Upload File",
      en: "Convert Word to PDF Online Without Uploading",
    },
    description: {
      id: "Ubah dokumen .docx menjadi PDF A4 langsung di browser. Teks, tabel, dan gambar diproses di perangkatmu, tanpa unggahan dan tanpa akun.",
      en: "Turn .docx documents into A4 PDFs right in your browser. Text, tables, and images are processed on your device, with no uploads and no account.",
    },
    h1: {
      id: "Konversi Word ke PDF",
      en: "Convert Word to PDF",
    },
    intro: {
      id: [
        "Dokumen Word nyaman untuk menulis, tetapi tampilannya bisa berubah ketika dibuka di komputer lain. Font yang tidak tersedia, versi Word yang berbeda, atau pengaturan margin yang tidak ikut terbawa sering membuat dokumen terlihat berantakan. PDF menyimpan tampilan halaman sehingga dokumen tetap sama saat dikirim, dicetak, atau diunggah ke portal.",
        "Halaman ini mengonversi file .docx menjadi PDF sepenuhnya di browser. Isi dokumen dibaca dengan mammoth, ditata pada halaman A4, lalu digambar menjadi PDF. File tidak dikirim ke server, tidak disimpan di cloud, dan tidak memerlukan akun.",
        "Karena prosesnya berjalan di browser, hasilnya mendekati dokumen asli untuk teks, judul, daftar, tabel, dan gambar sederhana. Tata letak yang sangat rumit seperti kolom koran, kotak teks mengambang, atau header dan footer khusus bisa bergeser. Selalu periksa PDF sebelum mengirimkannya.",
      ],
      en: [
        "Word documents are convenient to write in, but their appearance can change when opened on another computer. Missing fonts, a different Word version, or margins that do not carry over often make a document look broken. PDF preserves the page appearance, so it stays the same when emailed, printed, or uploaded to a portal.",
        "This page converts .docx files to PDF entirely in your browser. The document is read with mammoth, laid out on A4 pages, and drawn into a PDF. Files are not sent to a server, stored in the cloud, or tied to an account.",
        "Because processing runs in the browser, the result closely follows the original for text, headings, lists, tables, and simple images. Highly complex layouts such as newspaper columns, floating text boxes, or custom headers and footers may shift. Always review the PDF before sending it.",
      ],
    },
    bullets: {
      id: [
        "Menerima satu file .docx hingga 25 MB, tanpa watermark.",
        "Semua konversi berjalan lokal di browser tanpa unggahan.",
        "Hasil berupa halaman A4 portrait dengan margin putih.",
        "Mendukung judul, daftar, tabel, dan gambar sederhana.",
        "Catatan jujur ditampilkan bila tata letak kompleks bisa berubah.",
      ],
      en: [
        "Accepts one .docx file up to 25 MB, with no watermark.",
        "Every conversion runs locally in your browser with no upload.",
        "Output uses A4 portrait pages with a white margin.",
        "Supports headings, lists, tables, and simple images.",
        "An honest note appears when complex layouts may change.",
      ],
    },
    sections: {
      id: [
        {
          heading: "Mengapa mengubah Word ke PDF",
          paragraphs: [
            "PDF adalah format yang paling aman untuk dokumen yang sudah final. Lamaran kerja, proposal, invoice, dan tugas sekolah biasanya diminta dalam PDF karena tampilannya tidak berubah di perangkat mana pun. Ukuran halaman juga terkunci, sehingga hasil cetak lebih mudah diprediksi.",
            "Mengubah ke PDF juga membantu ketika dokumen akan diunggah ke sistem yang hanya menerima PDF. Alih-alih meminta penerima membuka file Word, kamu bisa mengirim satu file yang siap dibaca di ponsel, tablet, atau komputer tanpa aplikasi tambahan.",
          ],
        },
        {
          heading: "Cara kerja konversi di browser",
          paragraphs: [
            "Pertama, mammoth membaca struktur file .docx dan mengubahnya menjadi HTML. HTML itu ditata dengan gaya dokumen yang bersih, lalu html2canvas menggambar halaman A4 ke canvas. Setiap bagian halaman disusun agar tidak memotong baris teks di tengah, kemudian dimasukkan ke PDF menggunakan pdf-lib.",
            "Seluruh proses berjalan di memori perangkat. Tidak ada API konversi, tidak ada unggahan tersembunyi, dan hasilnya langsung diunduh ke perangkatmu. Untuk file besar, proses bisa memakan beberapa detik karena setiap halaman dirender satu per satu agar tab tetap stabil.",
          ],
        },
        {
          heading: "Tips agar hasil PDF lebih rapi",
          paragraphs: [
            "Gunakan gaya judul dan daftar bawaan Word, bukan teks tebal manual. Margin yang konsisten, tabel sederhana, dan gambar dengan lebar wajar cenderung menghasilkan PDF yang paling dekat dengan aslinya. Hindari kolom ganda, kotak teks mengambang, dan pemisah halaman manual yang rumit.",
            "Jika dokumen harus tampil persis seperti aslinya, termasuk header, footer, dan nomor halaman otomatis, sebaiknya ekspor PDF dari aplikasi Word atau LibreOffice di desktop. Alat browser ini paling berguna untuk konversi cepat ketika kamu tidak ingin mengunggah file ke layanan pihak ketiga.",
          ],
          bullets: [
            "Gunakan Heading 1–3 untuk struktur judul.",
            "Hindari kolom ganda dan kotak teks mengambang.",
            "Periksa tabel lebar dan gambar setelah konversi.",
            "Simpan file .docx asli sebagai cadangan.",
          ],
        },
      ],
      en: [
        {
          heading: "Why convert Word to PDF",
          paragraphs: [
            "PDF is the safest format for a finished document. Job applications, proposals, invoices, and school assignments are usually requested as PDF because their appearance does not change from one device to another. Page size is also locked, making print results more predictable.",
            "Converting to PDF also helps when a document must be uploaded to a system that only accepts PDF. Instead of asking the recipient to open a Word file, you can send one file that is ready to read on a phone, tablet, or computer without extra software.",
          ],
        },
        {
          heading: "How the browser conversion works",
          paragraphs: [
            "First, mammoth reads the .docx structure and turns it into HTML. That HTML is styled with clean document formatting, then html2canvas draws A4 pages onto a canvas. Page sections are arranged so text lines are not cut in the middle, and the result is placed into a PDF with pdf-lib.",
            "Everything runs in device memory. There is no conversion API, no hidden upload, and the result downloads straight to your device. Large files can take a few seconds because each page is rendered one at a time to keep the tab stable.",
          ],
        },
        {
          heading: "Tips for a cleaner PDF",
          paragraphs: [
            "Use Word’s built-in heading and list styles instead of manually bolded text. Consistent margins, simple tables, and reasonably sized images usually produce a PDF that stays closest to the original. Avoid multiple columns, floating text boxes, and complicated manual page breaks.",
            "If the document must look exactly like the original, including headers, footers, and automatic page numbers, export the PDF from Word or LibreOffice on a desktop. This browser tool is most useful for a quick conversion when you do not want to upload a file to a third-party service.",
          ],
          bullets: [
            "Use Heading 1–3 styles for structure.",
            "Avoid multiple columns and floating text boxes.",
            "Check wide tables and images after conversion.",
            "Keep the original .docx as a backup.",
          ],
        },
      ],
    },
    faq: {
      id: [
        {
          q: "Apakah file Word saya diunggah?",
          a: "Tidak. Konversi berjalan di browser dengan mammoth, html2canvas, dan pdf-lib. File tidak pernah dikirim ke server, tidak disimpan, dan tidak dilihat oleh kami.",
        },
        {
          q: "Apakah hasil PDF sama persis dengan dokumen asli?",
          a: "Untuk dokumen teks sederhana, hasilnya biasanya sangat mirip. Kolom, kotak teks mengambang, header, footer, dan pemisah halaman khusus bisa berubah karena isi disusun ulang pada halaman A4. Periksa hasil sebelum dibagikan.",
        },
        {
          q: "Apakah teks di PDF bisa dipilih atau dicari?",
          a: "Tidak. Halaman dirasterisasi menjadi gambar sebelum dimasukkan ke PDF, sehingga teks tidak bisa dipilih atau dicari. Simpan file .docx asli bila kamu masih membutuhkan teks yang bisa diedit.",
        },
        {
          q: "Apakah file .doc lama didukung?",
          a: "Tidak. Hanya .docx yang didukung. Buka file .doc di Word atau LibreOffice, simpan ulang sebagai .docx, lalu konversi di halaman ini.",
        },
      ],
      en: [
        {
          q: "Is my Word file uploaded?",
          a: "No. Conversion runs in your browser with mammoth, html2canvas, and pdf-lib. The file is never sent to a server, stored, or viewed by us.",
        },
        {
          q: "Is the PDF identical to the original document?",
          a: "For simple text documents, the result is usually very close. Columns, floating text boxes, headers, footers, and custom page breaks can change because content is reflowed onto A4 pages. Review the result before sharing it.",
        },
        {
          q: "Can the text in the PDF be selected or searched?",
          a: "No. Pages are rasterized into images before being placed in the PDF, so text cannot be selected or searched. Keep the original .docx when you still need editable text.",
        },
        {
          q: "Are older .doc files supported?",
          a: "No. Only .docx is supported. Open .doc files in Word or LibreOffice, save them as .docx, then convert them on this page.",
        },
      ],
    },
    relatedTools: ["pdfToDocx", "pdfMerge", "pdfCompress", "imageToPdf"],
  },
  {
    slug: "pdf-to-word",
    toolId: "pdfToDocx",
    title: {
      id: "Konversi PDF ke Word Online — Ekstrak Teks Tanpa Upload",
      en: "Convert PDF to Word Online — Extract Text Without Uploading",
    },
    description: {
      id: "Ambil teks dari PDF dan unduh sebagai .docx yang bisa diedit. Hanya teks tanpa tata letak asli, diproses 100% di browser tanpa unggahan.",
      en: "Turn a PDF into an editable Word document by extracting its text in your browser. Layout is not kept, so tables and columns become plain paragraphs.",
    },
    h1: {
      id: "Konversi PDF ke Word",
      en: "Convert PDF to Word",
    },
    intro: {
      id: [
        "PDF sangat baik untuk menjaga tampilan dokumen, tetapi tidak nyaman untuk mengedit teks. Ketika kamu perlu memperbaiki kalimat, menyalin bagian tertentu, atau menerjemahkan isi dokumen, file Word jauh lebih praktis. Konversi PDF ke Word membantu membuka kembali teks yang terkunci di dalam halaman PDF.",
        "Halaman ini mengekstrak lapisan teks setiap halaman PDF dengan pdf.js, lalu menyusunnya menjadi dokumen .docx. Semua proses berjalan di browser tanpa mengunggah file ke server. Hasilnya bisa dibuka di Microsoft Word, Google Docs, atau LibreOffice dan langsung diedit.",
        "Karena yang diambil hanya teks, gambar, kolom, tabel, font, dan tata letak asli tidak ikut disalin. PDF hasil pindai yang tidak memiliki lapisan teks juga tidak akan menghasilkan apa pun. Untuk dokumen seperti itu, jalankan OCR terlebih dahulu atau gunakan alat PDF ke Gambar.",
      ],
      en: [
        "PDF is excellent for preserving how a document looks, but it is awkward for editing text. When you need to fix a sentence, copy a section, or translate a document, Word is far more practical. PDF to Word conversion helps unlock the text trapped inside PDF pages.",
        "This page extracts the text layer of each PDF page with pdf.js and assembles it into a .docx document. Everything runs in your browser without uploading the file to a server. The result opens in Microsoft Word, Google Docs, or LibreOffice and can be edited immediately.",
        "Because only text is extracted, images, columns, tables, fonts, and the original layout are not copied. Scanned PDFs with no text layer will not produce anything either. For those documents, run OCR first or use the PDF to Images tool.",
      ],
    },
    bullets: {
      id: [
        "Menerima satu PDF hingga 100 MB dengan pemeriksaan halaman.",
        "Teks diekstrak lokal dengan pdf.js, tanpa unggahan.",
        "Menghasilkan file .docx yang bisa diedit di Word atau Google Docs.",
        "Setiap halaman PDF dipisahkan dengan pemisah halaman di Word.",
        "Catatan jelas bahwa hasil hanya berisi teks tanpa tata letak asli.",
      ],
      en: [
        "Accepts one PDF up to 100 MB with page validation.",
        "Text is extracted locally with pdf.js, with no upload.",
        "Produces a .docx file editable in Word or Google Docs.",
        "Each PDF page is separated by a page break in Word.",
        "A clear note explains that the result is text only without the original layout.",
      ],
    },
    sections: {
      id: [
        {
          heading: "Kapan konversi PDF ke Word berguna",
          paragraphs: [
            "Konversi ini cocok ketika isi dokumen perlu diedit: memperbaiki typo pada kontrak, mengambil kutipan dari laporan, menyesuaikan format surat, atau menerjemahkan materi. Daripada mengetik ulang, kamu bisa mengekstrak teks lalu merapikannya di aplikasi pengolah kata.",
            "Alat ini juga membantu ketika kamu hanya membutuhkan teks dari PDF yang panjang. Setelah diekstrak, teks bisa dicari, disalin, dan dipindahkan ke dokumen lain dengan cepat. Namun, ini bukan alat untuk mereproduksi tampilan PDF secara identik.",
          ],
        },
        {
          heading: "Seperti apa hasil dokumen Word-nya",
          paragraphs: [
            "Hasilnya berupa teks dengan satu paragraf per baris teks yang terdeteksi. Kalimat panjang akan membungkus secara alami di Word. Halaman PDF yang memiliki teks dimulai pada halaman baru, sehingga urutan bacaan tetap mudah diikuti.",
            "Format visual tidak dipertahankan: gambar hilang, tabel menjadi teks berurutan, dan font asli diganti dengan font standar. Ini disengaja agar hasilnya ringan dan bisa diedit. Setelah diunduh, kamu bisa memberi gaya ulang, menambahkan tabel, atau menggabungkan teks dengan dokumen lain.",
          ],
          bullets: [
            "Teks saja, tanpa gambar atau tabel bergaya.",
            "Satu halaman PDF dimulai pada halaman Word baru.",
            "Halaman tanpa teks dilewati.",
            "File .docx bisa langsung diedit dan diformat ulang.",
          ],
        },
        {
          heading: "Jika PDF tidak menghasilkan teks",
          paragraphs: [
            "PDF hasil pindai umumnya berupa gambar halaman, sehingga tidak punya lapisan teks untuk diekstrak. Alat akan menampilkan pesan yang jelas ketika tidak ada teks ditemukan. Solusinya adalah menjalankan OCR dengan aplikasi khusus, atau mengubah halaman menjadi gambar dengan alat PDF ke Gambar.",
            "PDF berpassword juga harus dibuka proteksinya terlebih dahulu. Untuk dokumen dengan tata letak rumit yang harus tetap identik, konversi teks saja tidak akan cukup; gunakan aplikasi desktop yang mendukung konversi tata letak penuh.",
          ],
        },
      ],
      en: [
        {
          heading: "When PDF to Word makes sense",
          paragraphs: [
            "This conversion is useful when the content needs editing: fixing a typo in a contract, quoting a section of a report, adjusting a letter, or translating material. Instead of retyping, you can extract the text and clean it up in a word processor.",
            "It also helps when you only need the text from a long PDF. Once extracted, the text can be searched, copied, and moved into another document quickly. It is not a tool for reproducing the exact appearance of a PDF.",
          ],
        },
        {
          heading: "What the Word document looks like",
          paragraphs: [
            "The output contains text with one paragraph per detected text line. Long sentences wrap naturally in Word. PDF pages that contain text start on a new page, so the reading order stays easy to follow.",
            "Visual formatting is not preserved: images are dropped, tables become sequential text, and the original fonts are replaced with a standard font. This is intentional so the result stays light and editable. After downloading, you can restyle it, add tables, or combine it with another document.",
          ],
          bullets: [
            "Text only, without images or styled tables.",
            "Each PDF page starts on a new Word page.",
            "Pages without text are skipped.",
            "The .docx file can be edited and reformatted immediately.",
          ],
        },
        {
          heading: "When a PDF produces no text",
          paragraphs: [
            "Scanned PDFs are usually page images, so they have no text layer to extract. The tool shows a clear message when no text is found. The solution is to run OCR with a dedicated app, or turn the pages into images with the PDF to Images tool.",
            "Password-protected PDFs must also have their protection removed first. For documents with complex layouts that must stay identical, text-only conversion will not be enough; use a desktop app that supports full layout conversion.",
          ],
        },
      ],
    },
    faq: {
      id: [
        {
          q: "Apakah PDF saya diunggah ke server?",
          a: "Tidak. Teks dibaca dengan pdf.js dan file .docx dibuat dengan library docx di browser. File tidak pernah dikirim ke server dan tidak disimpan setelah tab ditutup.",
        },
        {
          q: "Apakah tata letak asli ikut tersalin?",
          a: "Tidak. Hasilnya hanya teks, dengan satu paragraf per baris. Gambar, kolom, tabel, font, warna, header, dan footer tidak dipertahankan. Kamu bisa merapikan ulang dokumen Word setelah diunduh.",
        },
        {
          q: "Mengapa PDF hasil pindai tidak menghasilkan teks?",
          a: "Hasil pindai biasanya hanya berisi gambar halaman tanpa lapisan teks. Jalankan OCR terlebih dahulu, atau gunakan alat PDF ke Gambar bila kamu membutuhkan gambar halaman.",
        },
        {
          q: "Apakah gambar dan tabel di PDF ikut dikonversi?",
          a: "Tidak. Alat ini hanya mengekstrak teks. Gambar dan tabel tidak disalin, dan teks di dalam tabel akan muncul sebagai baris teks biasa tanpa struktur kolom.",
        },
      ],
      en: [
        {
          q: "Is my PDF uploaded to a server?",
          a: "No. Text is read with pdf.js and the .docx file is built with the docx library in your browser. The file is never sent to a server or stored after the tab closes.",
        },
        {
          q: "Is the original layout copied?",
          a: "No. The output is text only, with one paragraph per line. Images, columns, tables, fonts, colors, headers, and footers are not preserved. You can restyle the Word document after downloading it.",
        },
        {
          q: "Why does a scanned PDF produce no text?",
          a: "A scan usually contains page images with no text layer. Run OCR first, or use the PDF to Images tool when you need page images instead.",
        },
        {
          q: "Are images and tables in the PDF converted?",
          a: "No. This tool extracts text only. Images and tables are not copied, and text inside tables appears as ordinary text lines without column structure.",
        },
      ],
    },
    relatedTools: ["pdfToImage", "pdfMerge", "pdfCompress", "docxToPdf"],
  },
];

export function getLanding(slug: string): LandingDefinition | undefined {
  return LANDINGS.find((entry) => entry.slug === slug);
}
