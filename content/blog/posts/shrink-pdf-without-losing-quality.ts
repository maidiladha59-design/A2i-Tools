import type { BlogPost } from "@/content/blog/types";

export const shrinkPdfWithoutLosingQuality: BlogPost = {
  slug: "shrink-pdf-without-losing-quality",
  category: "guide",
  publishedAt: "2026-09-17",
  updatedAt: "2026-10-24",
  readingMinutes: 9,
  relatedTools: ["pdfReduce", "pdfCompress", "pdfOrganize"],
  title: {
    id: "Cara Mengecilkan PDF Tanpa Kehilangan Kualitas: Panduan yang Jujur",
    en: "How to Shrink a PDF Without Losing Quality: An Honest Guide",
  },
  description: {
    id: "Pahami penyebab PDF membengkak, bedanya kompresi dan rasterisasi, serta cara memilih target 100 KB, 500 KB, atau 1 MB agar dokumen tetap terbaca.",
    en: "Understand why PDFs grow, how compression differs from rasterization, and how to choose a 100 KB, 500 KB, or 1 MB target that keeps the document readable.",
  },
  intro: {
    id: [
      "PDF jarang membengkak tanpa sebab. Di balik file 8 MB biasanya ada halaman pindai beresolusi tinggi, foto yang ditempel apa adanya, atau font dan objek tertanam yang ikut terbawa sejak dokumen dibuat.",
      "Mengecilkannya bisa selesai dalam hitungan detik di browser, tetapi ada satu keputusan yang menentukan hasil: apakah kamu lebih membutuhkan ukuran kecil atau teks yang tetap bisa dipilih dan dicari.",
      "Panduan ini menjelaskan kompromi itu tanpa janji berlebihan, termasuk kapan sebuah PDF memang tidak bisa banyak mengecil.",
    ],
    en: [
      "PDFs rarely grow without a reason. Behind an 8 MB file there is usually a high-resolution scan, a photo pasted in at full size, or fonts and objects carried along since the document was created.",
      "Shrinking it can take seconds in a browser, but one decision shapes the result: do you need a small file, or text that can still be selected and searched?",
      "This guide explains that trade-off without inflated promises, including when a PDF genuinely cannot shrink much.",
    ],
  },
  sections: {
    id: [
      {
        heading: "Kenapa ukuran PDF bisa membengkak",
        paragraphs: [
          "Penyebab paling umum adalah gambar. Satu halaman hasil pindai disimpan sebagai foto beresolusi tinggi, dan dokumen 40 halaman bisa dengan mudah melewati 20 MB. Hal yang sama berlaku untuk laporan yang berisi tangkapan layar atau foto produk.",
          "Font dan objek tertanam juga menambah berat. Dokumen desain sering menyertakan font lengkap, grafik vektor rumit, dan metadata dari aplikasi pembuatnya. Sebagian PDF bahkan menyimpan data revisi atau lampiran yang tidak terlihat saat dibaca.",
          "Karena itu, dua PDF dengan jumlah halaman sama bisa berbeda jauh ukurannya. Mengetahui isi dokumen membantumu memilih cara mengecilkan yang tepat, bukan sekadar menekan tombol kompres berulang kali.",
        ],
      },
      {
        heading: "Kompresi dan rasterisasi bukan hal yang sama",
        paragraphs: [
          "Pada alat kompresi PDF, setiap halaman dirender ulang menjadi gambar JPEG pada level rendah, sedang, atau tinggi. Hasilnya bisa jauh lebih kecil, tetapi teks berubah menjadi piksel: tidak bisa dipilih, dicari, atau disalin, dan tautan ikut hilang.",
          "Rasterisasi cocok untuk dokumen yang hanya perlu dibaca, seperti bukti pembayaran, brosur, atau hasil pindai. Untuk kontrak, naskah akademik, atau berkas yang masih akan dikutip, hilangnya teks selektif sering lebih merugikan daripada ukuran file yang lebih besar.",
          "Ada juga mode yang mempertahankan struktur asli tanpa render ulang. Penghematannya biasanya kecil, tetapi teks dan tautan tetap utuh. Pilih metode berdasarkan tujuan akhir file, bukan berdasarkan angka ukuran saja.",
        ],
      },
      {
        heading: "Memilih target: 100 KB, 500 KB, atau 1 MB",
        paragraphs: [
          "Target yang masuk akal bergantung pada tempat file akan dipakai. Formulir pendaftaran dan portal lamaran sering membatasi 100–500 KB, email biasa nyaman sampai 1–2 MB, sedangkan arsip internal bisa memakai batas yang lebih longgar.",
          "Mode perkecil ke target mencoba resolusi dan kualitas JPEG secara bertahap, berhenti begitu target tercapai, lalu melaporkan hasilnya. Kalau target tidak mungkin dicapai, alat tetap memberikan hasil terkecil yang bisa dibuat beserta ukurannya, bukan mengklaim berhasil.",
          "Jangan otomatis memilih angka terkecil. Target 100 KB untuk laporan bergambar sering menghasilkan halaman yang buram saat dicetak. Mulailah dari batas yang benar-benar diminta, lalu turunkan hanya jika unggahan ditolak.",
          "Sebutkan target dalam satuan yang sama dengan formulir: 500 KB berarti 500 KB, bukan 0,5 MB yang dibulatkan.",
        ],
      },
      {
        heading: "Kapan teks wajib tetap bisa dipilih",
        paragraphs: [
          "Beberapa dokumen tidak boleh kehilangan teks. Kontrak, surat keterangan, transkrip, dan berkas hukum perlu bisa dicari dan disalin, baik olehmu maupun oleh penerima. Dokumen penelitian juga sering dikutip dengan menyalin bagian tertentu.",
          "Kalau teks harus tetap hidup, gunakan mode yang mempertahankan struktur asli. Ukurannya mungkin hanya turun sedikit, tetapi halaman tetap tajam, tautan berfungsi, dan tidak ada risiko salah baca akibat kompresi gambar.",
          "Sebaliknya, jika file hanya untuk dilihat sekali, misalnya lampiran formulir atau bukti transfer, rasterisasi dengan level sedang biasanya cukup. Yang penting adalah membuat keputusan itu sebelum mengirim, karena mengubah PDF hasil render kembali menjadi teks tidak mungkin dilakukan.",
        ],
      },
      {
        heading: "Kalau PDF teks murni tidak banyak mengecil",
        paragraphs: [
          "Ini bagian yang jarang disebut alat kompresi. PDF yang berisi teks vektor dan sedikit grafik sederhana memang sudah efisien. Ukurannya bisa tetap hampir sama setelah diproses, bahkan lebih besar, karena hasil render ulang menambah data gambar.",
          "Kalau itu terjadi, jangan mengulang kompresi dengan level lebih tinggi berkali-kali. Hasilnya tidak akan membaik. Pilihan yang lebih masuk akal adalah memakai file asli, menghapus halaman yang tidak perlu lewat pengaturan halaman, atau membaginya menjadi beberapa file kecil.",
          "Alat yang jujur akan menampilkan ukuran akhir dan memberi tahu bahwa target tidak tercapai. Anggap informasi itu sebagai sinyal untuk mengubah strategi, bukan kegagalan yang perlu dipaksa.",
        ],
      },
      {
        heading: "Alur aman: cadangan, periksa, dan uji",
        paragraphs: [
          "Sebelum memproses, simpan salinan PDF asli. Dokumen berpassword harus dibuka proteksinya lebih dulu, dan PDF rusak akan ditolak dengan pesan yang jelas, jadi perbaiki atau unduh ulang file tersebut.",
          "Beri nama hasil yang mudah dikenali, misalnya laporan-keuangan-2026-kecil.pdf, agar tidak tertukar dengan file asli saat diunggah.",
          "Setelah hasilnya diunduh, buka di pembaca PDF dan periksa beberapa halaman secara acak: apakah teks masih terbaca, apakah ada halaman yang terpotong, apakah ukurannya sesuai. Cetak satu halaman di ukuran sebenarnya jika dokumen akan diserahkan dalam bentuk cetak.",
          "Perhatikan juga batas praktis: satu PDF maksimal 100 MB dan antrean maksimal 20 file. Untuk laporan besar, memproses beberapa file lebih stabil daripada memaksakan satu file raksasa. Semua proses berjalan di perangkat, jadi tidak ada dokumen yang diunggah atau disimpan di server.",
        ],
      },
    ],
    en: [
      {
        heading: "Why PDFs grow in the first place",
        paragraphs: [
          "Images are the usual culprit. A single scanned page stored as a high-resolution photo can push a 40-page document past 20 MB without much effort. The same applies to reports full of screenshots or product photos.",
          "Embedded fonts and objects add weight too. Design documents often carry full font sets, complex vector graphics, and metadata from the app that produced them. Some PDFs even keep revision data or attachments that never appear on the page.",
          "That is why two PDFs with the same page count can differ wildly in size. Knowing what is inside helps you choose the right method instead of pressing compress over and over.",
        ],
      },
      {
        heading: "Compression and rasterization are not the same thing",
        paragraphs: [
          "In the PDF compressor, every page is re-rendered as a JPEG image at a low, medium, or high level. The file can get much smaller, but the text becomes pixels: it cannot be selected, searched, or copied, and links disappear.",
          "Rasterization suits documents that only need to be read, such as receipts, brochures, or scans. For contracts, academic papers, or anything that will still be quoted, losing selectable text is often a worse outcome than a larger file.",
          "There is also a mode that keeps the original structure without re-rendering. Savings are usually modest, but text and links survive. Choose a method based on what the file is for, not on the size number alone.",
        ],
      },
      {
        heading: "Choosing a target: 100 KB, 500 KB, or 1 MB",
        paragraphs: [
          "A sensible target depends on where the file is going. Registration forms and job portals often cap uploads at 100–500 KB, ordinary email is comfortable up to 1–2 MB, and internal archives can live with a looser limit.",
          "Target mode tries progressively lower resolutions and JPEG quality, stops once the target is met, then reports the result. If the target is unreachable, the tool still returns the smallest file it can produce along with its size, rather than claiming success.",
          "Do not default to the smallest number. A 100 KB target for an illustrated report often produces pages that look muddy in print. Start from the limit you were actually given, and go lower only if the upload is rejected.",
          "State the target in the same unit as the form: 500 KB means 500 KB, not a rounded 0.5 MB.",
        ],
      },
      {
        heading: "When the text must stay selectable",
        paragraphs: [
          "Some documents cannot afford to lose their text. Contracts, certificates, transcripts, and legal filings need to be searchable and copyable, both for you and for the recipient. Research papers are regularly quoted by copying a passage.",
          "If the text has to survive, use the mode that keeps the original structure. The file may shrink only slightly, but pages stay sharp, links keep working, and there is no risk of misreading something because of image compression.",
          "If the file will be viewed once, such as a form attachment or a transfer receipt, medium-level rasterization is usually enough. Make that decision before sending, because turning a re-rendered PDF back into real text is not possible.",
        ],
      },
      {
        heading: "When a text-only PDF barely shrinks",
        paragraphs: [
          "This is the part compression tools rarely mention. A PDF made of vector text and a few simple graphics is already efficient. It may stay almost the same size after processing, or even grow, because re-rendering adds image data.",
          "If that happens, do not rerun compression at a higher level again and again. The result will not improve. The more sensible options are to keep the original, remove pages you do not need in the page organizer, or split the file into smaller parts.",
          "An honest tool shows the final size and tells you the target was not reached. Treat that message as a signal to change strategy, not as a failure to force.",
        ],
      },
      {
        heading: "A safe workflow: back up, inspect, and test",
        paragraphs: [
          "Save a copy of the original before processing. Password-protected files need to be unlocked first, and corrupted PDFs are rejected with a clear message, so repair or download the file again.",
          "Name the result clearly, such as finance-report-2026-small.pdf, so you do not upload the original by mistake.",
          "Once the result is downloaded, open it in a PDF reader and check a few pages at random: is the text still legible, is anything cropped, is the size what you expected? Print one page at actual size if the document will be handed over on paper.",
          "Keep the practical limits in mind too: one PDF up to 100 MB and a queue of up to 20 files. For long reports, processing several files is more stable than forcing one huge file through. Everything runs on your device, so no document is uploaded or stored on a server.",
        ],
      },
    ],
  },
  conclusion: {
    id: [
      "Tidak ada pengaturan ajaib yang membuat PDF 20 MB menjadi 200 KB tanpa mengubah apa pun. Yang ada adalah pilihan yang sadar: rasterisasi untuk file yang hanya dibaca, struktur asli untuk dokumen yang teksnya masih dibutuhkan, dan target ukuran yang realistis sesuai batas formulir.",
      "Mulai dari salinan asli, pilih target yang benar-benar diminta, lalu periksa hasilnya sebelum dikirim. Dengan cara itu, ukuran file turun tanpa kejutan yang baru terlihat setelah dokumen sampai di penerima.",
    ],
    en: [
      "No setting turns a 20 MB PDF into 200 KB without changing anything. What you get is a conscious choice: rasterization for files that only need to be read, original structure for documents whose text still matters, and a realistic size target that matches the form.",
      "Start from a copy of the original, pick the limit you were actually given, and inspect the result before sending. That way the file gets smaller without surprises that only appear when the document reaches its recipient.",
    ],
  },
};
