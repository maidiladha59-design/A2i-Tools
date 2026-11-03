import type { BlogPost } from "@/content/blog/types";

export const mergePdfFilesGuide: BlogPost = {
  slug: "merge-pdf-files-guide",
  category: "guide",
  publishedAt: "2026-09-26",
  updatedAt: "2026-10-27",
  readingMinutes: 8,
  relatedTools: ["pdfMerge", "pdfOrganize", "pdfReduce"],
  title: {
    id: "Cara Menggabungkan PDF: Urutan, Halaman, dan Duplikat",
    en: "How to Merge PDFs: Order, Duplicates, and Common Misses",
  },
  description: {
    id: "Panduan menggabung beberapa PDF menjadi satu berkas: menyusun urutan, memeriksa jumlah halaman, membersihkan duplikat, dan menangani file terkunci.",
    en: "A practical guide to merging several PDFs into one file: set the order, check page counts, remove duplicates, and handle locked or damaged documents.",
  },
  intro: {
    id: [
      "Menggabung PDF terdengar seperti pekerjaan satu klik, dan memang begitu. Masalahnya muncul setelah hasilnya diunduh: halaman pembuka berada di tengah, satu dokumen masuk dua kali, atau lampiran yang seharusnya di akhir malah menjadi halaman pertama.",
      "Hampir semua kesalahan itu bisa dicegah sebelum tombol gabung ditekan. Yang dibutuhkan hanya pemeriksaan singkat terhadap daftar file, urutan, dan isi tiap dokumen.",
      "Berikut alur kerja yang masuk akal untuk berkas pendaftaran, lamaran kerja, dan laporan yang harus dikirim sebagai satu file.",
    ],
    en: [
      "Merging PDFs sounds like a one-click job, and it is. The trouble shows up after the download: the cover page sits in the middle, one document appears twice, or an appendix that belongs at the end becomes page one.",
      "Almost all of those mistakes can be prevented before you press merge. All it takes is a quick check of the file list, the order, and what each document contains.",
      "Here is a workflow that holds up for application packs, job submissions, and reports that must go out as a single file.",
    ],
  },
  sections: {
    id: [
      {
        heading: "Mulai dari daftar file, bukan dari tombol gabung",
        paragraphs: [
          "Setelah file ditambahkan, daftar menampilkan nama, ukuran, dan jumlah halaman setiap PDF. Baca angka itu sebelum melanjutkan. Kalau sebuah dokumen seharusnya 12 halaman tetapi tertulis 3, kemungkinan yang terpilih adalah versi lama atau hasil ekspor yang gagal.",
          "Jumlahkan halaman secara kasar dan bandingkan dengan perkiraanmu. Dalam berkas pendaftaran, satu halaman yang hilang bisa berarti lampiran penting tidak ikut terkirim. Periksa juga ukuran total, karena sebagian portal membatasi hasil gabungan walaupun tiap file asli masih di bawah batas.",
          "Kalau ragu soal versi, buka file aslinya sebentar dan bandingkan halaman pertamanya sebelum menambahkan kembali.",
          "Antrean dibatasi 20 file dan satu PDF maksimal 100 MB. Kalau berkasmu melebihi itu, gabungkan dalam beberapa tahap, lalu satukan hasilnya pada tahap berikutnya.",
        ],
      },
      {
        heading: "Urutan menentukan hasil akhir",
        paragraphs: [
          "Hasil gabungan mengikuti urutan daftar dari atas ke bawah. Tidak ada penyortiran otomatis berdasarkan nama atau tanggal, jadi urutan di layar adalah urutan halaman yang akan dibaca penerima.",
          "Susun dengan alur yang logis: surat pengantar atau formulir ringkasan di depan, dokumen utama setelahnya, lalu lampiran pendukung. Untuk portofolio, kelompokkan karya sesuai urutan yang ingin kamu ceritakan, bukan sesuai tanggal file dibuat.",
          "Di layar sentuh, tahan dan tarik kartu file untuk memindahkannya. Tombol naik dan turun di setiap item membantu kalau drag terasa sulit. Memberi nama file dengan awalan angka, seperti 01-formulir.pdf dan 02-ktp.pdf, juga menjaga urutan saat file dipilih ulang.",
        ],
      },
      {
        heading: "Hapus duplikat dan halaman yang tidak perlu",
        paragraphs: [
          "Duplikat lebih sering terjadi daripada yang diperkirakan. File yang diunduh dua kali, hasil ekspor berulang, atau versi revisi yang disimpan dengan nama berbeda bisa masuk ke daftar tanpa disadari. Bandingkan nama, ukuran, dan jumlah halaman untuk menemukannya, lalu keluarkan salah satunya dari antrean.",
          "Dua file dengan isi mirip tetapi ukuran berbeda biasanya berasal dari ekspor yang berbeda, bukan dari kesalahan unggah. Buka keduanya sebentar kalau kamu perlu memastikan mana yang terbaru.",
          "Halaman kosong juga layak diperiksa. Sebagian pemindai menambahkan satu halaman kosong di akhir setiap dokumen, dan halaman itu akan tetap muncul di hasil gabungan. Kalau hanya sebagian halaman yang tidak diperlukan, rapikan dulu dokumen tersebut di pengatur halaman, lalu tambahkan kembali versi bersihnya.",
          "Jangan menghapus file asli dari perangkat. Cukup keluarkan dari daftar, karena semua perubahan hanya berlaku pada hasil yang kamu unduh.",
        ],
      },
      {
        heading: "File terkunci dan file rusak",
        paragraphs: [
          "PDF berpassword tidak bisa digabung sebelum proteksinya dibuka. Buka file tersebut di aplikasi PDF yang biasa kamu pakai, masukkan kata sandi, lalu simpan salinan tanpa proteksi. Setelah itu baru tambahkan ke antrean.",
          "File rusak biasanya ditolak dengan pesan yang jelas, dan itu lebih baik daripada menghasilkan PDF cacat. Unduh ulang dari sumbernya atau ekspor ulang dari aplikasi asal. Mengganti ekstensi file tidak akan memperbaiki struktur PDF yang rusak.",
          "Kalau hanya satu file bermasalah, gabungkan sisanya lebih dulu, lalu tambahkan file yang sudah diperbaiki pada proses kedua. Hasilnya tetap bisa disatukan kembali tanpa mengulang dari awal.",
        ],
      },
      {
        heading: "Teks, tautan, dan kualitas tetap utuh",
        paragraphs: [
          "Penggabungan menyalin halaman asli tanpa merender ulang. Teks tetap bisa dipilih dan dicari, tautan tetap berfungsi, dan kualitas gambar tidak turun. Ukuran hasil kira-kira merupakan jumlah file asal dikurangi sebagian data yang duplikat.",
          "Kalau penerima membutuhkan teks yang bisa dicari, hasil gabungan ini sudah memenuhi syarat tanpa pengaturan tambahan.",
          "Ini berbeda dari kompresi PDF, yang mengubah halaman menjadi gambar demi ukuran lebih kecil. Jadi kalau dokumenmu berisi formulir yang harus diisi atau naskah yang akan dikutip, gabungkan dulu, lalu putuskan apakah masih perlu dikecilkan.",
          "Setelah hasil diunduh, buka dan periksa halaman pertama serta terakhir. Dua titik itu cukup untuk memastikan urutan benar dan tidak ada dokumen yang terpotong.",
        ],
      },
      {
        heading: "Perkecil hasil gabungan hanya jika perlu",
        paragraphs: [
          "PDF gabungan sering lebih besar dari batas unggahan karena ukurannya mendekati jumlah semua file. Kalau portal membatasi 2 MB, hasil 6 MB tentu ditolak, dan mengecilkannya menjadi langkah yang wajar.",
          "Setelah penggabungan, hasilnya bisa langsung dibawa ke alat perkecil ke target. Tentukan angka sesuai batas, lalu periksa apakah teks masih terbaca. Ingat bahwa mode ini merender halaman menjadi gambar, jadi teks tidak lagi bisa dipilih.",
          "Simpan PDF gabungan asli sebagai arsip, dan gunakan versi kecil hanya untuk dikirim. Dengan begitu, kamu tetap punya dokumen lengkap yang bisa diedit atau dicetak ulang nanti.",
        ],
      },
    ],
    en: [
      {
        heading: "Start with the file list, not the merge button",
        paragraphs: [
          "Once files are added, the list shows each PDF’s name, size, and page count. Read those numbers before continuing. If a document should be 12 pages but shows 3, you probably picked an old version or a failed export.",
          "Add the pages up roughly and compare with what you expect. In an application pack, one missing page can mean an essential attachment never arrives. Check the total size as well, because some portals limit the merged file even when each original was under the limit.",
          "If you are unsure which version is current, open the original for a moment and compare its first page before adding it back.",
          "The queue holds up to 20 files and a single PDF can be up to 100 MB. If your set is larger, merge it in stages and combine the results in a second pass.",
        ],
      },
      {
        heading: "Order decides the final document",
        paragraphs: [
          "The merged file follows the list from top to bottom. Nothing is sorted automatically by name or date, so what you see on screen is the order the recipient will read.",
          "Arrange it logically: cover letter or summary form first, the main document next, supporting attachments last. For a portfolio, group work in the order you want to present it, not by file date.",
          "On a touch screen, press and drag a file card to move it. The up and down buttons on each item help when dragging is awkward. Numbered file names such as 01-form.pdf and 02-id.pdf also keep the order stable when you pick files again.",
        ],
      },
      {
        heading: "Remove duplicates and pages you do not need",
        paragraphs: [
          "Duplicates happen more often than people expect. A file downloaded twice, a repeated export, or a revised copy saved under another name can slip into the list. Compare name, size, and page count, then remove one of them from the queue.",
          "Two files with similar content but different sizes usually come from different exports, not from a bad upload. Open both briefly if you need to confirm which one is newer.",
          "Blank pages are worth a look too. Some scanners add an empty page at the end of every document, and it will survive into the merged file. If only a few pages are unwanted, clean the document in the page organizer first, then add the tidy version back.",
          "Do not delete the originals from your device. Removing a file from the list is enough, because every change applies only to the result you download.",
        ],
      },
      {
        heading: "Locked and damaged files",
        paragraphs: [
          "A password-protected PDF cannot be merged until the protection is removed. Open it in the PDF app you normally use, enter the password, and save an unprotected copy. Then add that copy to the queue.",
          "Damaged files are usually rejected with a clear message, which is better than producing a broken PDF. Download the file again or export it a second time from the source app. Renaming the extension will not repair a damaged PDF structure.",
          "If only one file is the problem, merge the rest first, then add the repaired file in a second pass. The results can still be combined without starting over.",
        ],
      },
      {
        heading: "Text, links, and quality stay intact",
        paragraphs: [
          "Merging copies the original pages without re-rendering them. Text remains selectable and searchable, links keep working, and image quality does not drop. The result is roughly the sum of the inputs minus some duplicated data.",
          "If the recipient needs searchable text, this merged file already meets that requirement without any extra setting.",
          "That is different from PDF compression, which turns pages into images to save space. So if your document contains a form to fill in or a paper that will be quoted, merge first, then decide whether it also needs to shrink.",
          "After downloading, open the result and check the first and last pages. Those two points are enough to confirm the order is right and nothing was cut off.",
        ],
      },
      {
        heading: "Shrink the merged file only if you must",
        paragraphs: [
          "A merged PDF is often larger than the upload limit because its size approaches the total of every input. If a portal caps files at 2 MB, a 6 MB result will be rejected, and reducing it becomes a reasonable step.",
          "After merging, the result can go straight to the size reducer. Set the limit the form gives you, then check that the text is still readable. Remember that this mode renders pages as images, so text is no longer selectable.",
          "Keep the merged original as your archive and send only the smaller version. That way you still hold a complete document you can edit or print again later.",
        ],
      },
    ],
  },
  conclusion: {
    id: [
      "Menggabung PDF adalah pekerjaan teknis yang sederhana, tetapi kerapiannya ditentukan oleh hal-hal kecil: urutan file, jumlah halaman, duplikat, dan dokumen terkunci. Memeriksa keempatnya sebelum menekan tombol gabung menghemat satu putaran revisi.",
      "Lakukan penggabungan di browser, periksa hasilnya, lalu kecilkan hanya bila batas unggahan menuntut. File tetap berada di perangkatmu, jadi dokumen pribadi tidak perlu dikirim ke server mana pun.",
    ],
    en: [
      "Merging PDFs is technically simple, but the quality of the result depends on small things: file order, page counts, duplicates, and locked documents. Checking those four before pressing merge saves a round of revisions.",
      "Do the merge in a browser, inspect the output, and shrink it only if an upload limit demands it. The files stay on your device, so personal documents never need to be sent to a server.",
    ],
  },
};
