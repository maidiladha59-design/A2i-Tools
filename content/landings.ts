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
];

export function getLanding(slug: string): LandingDefinition | undefined {
  return LANDINGS.find((entry) => entry.slug === slug);
}
