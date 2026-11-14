import type { Bilingual, ContentSection } from "@/content/types";

export const BLOG_INDEX_CONTENT: {
  intro: Bilingual<string[]>;
  sections: Bilingual<ContentSection[]>;
} = {
  intro: {
    id: [
      "Blog ini berisi catatan praktis tentang hal yang paling sering membuat unggahan ditolak: ukuran file yang beberapa kilobyte terlalu besar, dimensi foto yang tidak sesuai formulir, atau PDF hasil pindai yang beratnya jauh di atas batas portal. Artikelnya ditulis berdasarkan alur kerja yang benar-benar dipakai, bukan sekadar daftar fitur.",
      "Kamu tidak perlu membaca semuanya berurutan. Mulai dari masalah yang sedang kamu hadapi, lalu ikuti tautan ke alat yang disebut di akhir artikel. Setiap panduan menjelaskan kapan alat itu tepat, apa yang berubah pada file, dan kesalahan yang sebaiknya dihindari sebelum menekan tombol unggah.",
      "Semua alat yang dibahas berjalan di browser. File tetap berada di perangkatmu, dan artikel di sini tidak pernah meminta kamu mengunggah dokumen ke server untuk sekadar mencoba saran yang tertulis.",
    ],
    en: [
      "This blog collects practical notes on the things that most often get an upload rejected: a file that is a few kilobytes over the limit, photo dimensions that do not match the form, or a scanned PDF far heavier than the portal allows. The articles are written around workflows people actually use, not a list of features.",
      "You do not have to read everything in order. Start with the problem in front of you, then follow the link to the tool mentioned at the end of the article. Each guide explains when the tool fits, what changes in the file, and the mistakes worth avoiding before you press upload.",
      "Every tool discussed here runs in your browser. Files stay on your device, and nothing on this blog asks you to upload a document to a server just to try the advice.",
    ],
  },
  sections: {
    id: [
      {
        heading: "Mulai dari batas unggahan, bukan dari alat",
        paragraphs: [
          "Buka halaman syarat formulir lebih dulu dan catat tiga angka: ukuran maksimum, dimensi piksel minimum, serta format yang diterima. Ketiganya sering muncul bersamaan. Foto yang sudah di bawah 100 KB tetap bisa ditolak jika lebarnya kurang dari 600 piksel atau rasionya bukan 3×4.",
          "Setelah angka-angka itu jelas, pilih urutan kerja yang paling sedikit mengubah gambar: potong area yang tidak perlu, sesuaikan dimensi, lalu kompres ke target ukuran. Mengompres lebih dulu baru memotong sering membuang waktu karena hasil akhirnya harus diproses ulang dari file asli.",
        ],
        bullets: [
          "Simpan file asli sebelum melakukan perubahan apa pun.",
          "Catat batas ukuran, dimensi, rasio, dan format dari formulir.",
          "Kerjakan dari file asli, bukan dari hasil kompresi sebelumnya.",
        ],
      },
      {
        heading: "Kenali format sebelum mengompres",
        paragraphs: [
          "JPG cocok untuk foto karena menghasilkan file kecil, tetapi kurang tajam untuk teks dan tidak mendukung transparansi. PNG mempertahankan tepi dan latar transparan, namun sulit dikecilkan karena bersifat lossless. WebP sering lebih hemat ruang, dengan syarat formulir menerimanya.",
          "Artikel tentang perbedaan JPG, PNG, dan WebP membahas kapan masing-masing format masuk akal, termasuk akibat mengganti ekstensi file tanpa benar-benar mengubah isinya. Untuk dokumen, PDF lebih aman karena tampilan halaman terkunci, tetapi PDF hasil pindai perlu perlakuan berbeda dari PDF teks.",
        ],
        bullets: [
          "Gunakan JPG untuk foto, PNG untuk teks dan transparansi.",
          "Periksa daftar format yang diterima sebelum mengonversi.",
          "Jangan mengganti ekstensi file secara manual tanpa konversi.",
        ],
      },
      {
        heading: "Periksa hasil sebelum mengirim",
        paragraphs: [
          "Kompresi mengubah file, dan tidak semua perubahan terlihat pada pratinjau kecil. Buka hasilnya di penampil gambar atau pembaca PDF, periksa wajah dan teks pada ukuran sebenarnya, lalu pastikan jumlah halaman dan urutannya masih benar. Untuk PDF yang dirender ulang menjadi gambar, ingat bahwa teks tidak lagi bisa dicari.",
          "Jika target tidak tercapai, artikel di blog ini menjelaskan pilihan yang jujur: menurunkan dimensi, memangkas halaman, mengganti format, atau memakai alat dengan mode yang mempertahankan struktur asli. Tidak ada alat yang bisa menjamin hasil tertentu, jadi selalu sediakan waktu untuk mengulang bila unggahan ditolak.",
        ],
        bullets: [
          "Buka file hasil, jangan hanya melihat ukurannya.",
          "Periksa keterbacaan teks dan detail wajah pada zoom 100 persen.",
          "Sisakan waktu untuk mengulang sebelum tenggat formulir.",
        ],
      },
    ],
    en: [
      {
        heading: "Start from the upload limit, not the tool",
        paragraphs: [
          "Open the form requirements first and write down three numbers: the maximum size, the minimum pixel dimensions, and the accepted formats. They often appear together. A photo already under 100 KB can still be rejected if it is narrower than 600 pixels or uses a ratio other than 3×4.",
          "Once those numbers are clear, choose the workflow that changes the image least: crop what you do not need, adjust dimensions, then compress to the size target. Compressing before cropping usually wastes time because the final file has to be rebuilt from the original anyway.",
        ],
        bullets: [
          "Keep the original file before making any change.",
          "Note the size, dimensions, ratio, and format the form requires.",
          "Work from the original, not from a previously compressed copy.",
        ],
      },
      {
        heading: "Understand the format before compressing",
        paragraphs: [
          "JPG suits photos because it produces small files, but it is weaker for text and does not support transparency. PNG keeps edges and transparent backgrounds intact, yet it resists shrinking because it is lossless. WebP often saves more space, provided the form accepts it.",
          "The article on JPG, PNG, and WebP differences explains when each format makes sense, including what happens when you rename a file without actually converting it. For documents, PDF is safer because page layout is locked, but scanned PDFs need different handling than text PDFs.",
        ],
        bullets: [
          "Use JPG for photos and PNG for text and transparency.",
          "Check the accepted format list before converting.",
          "Never rename a file extension without a real conversion.",
        ],
      },
      {
        heading: "Check the result before submitting",
        paragraphs: [
          "Compression changes the file, and not every change is visible in a small preview. Open the result in an image viewer or PDF reader, inspect faces and text at actual size, and confirm the page count and order are still correct. For PDFs re-rendered as images, remember that text is no longer searchable.",
          "When a target cannot be reached, the articles here explain honest options: reduce dimensions, trim pages, switch format, or use a mode that preserves the original structure. No tool can guarantee a specific result, so leave time to retry if an upload is rejected.",
        ],
        bullets: [
          "Open the output file instead of only checking its size.",
          "Inspect text and facial detail at 100 percent zoom.",
          "Leave time to retry before the form deadline.",
        ],
      },
    ],
  },
};
