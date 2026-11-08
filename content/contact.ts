import type { Bilingual, ContentSection } from "@/content/types";

export const CONTACT_CONTENT: {
  lead: Bilingual<string>;
  sections: Bilingual<ContentSection[]>;
} = {
  lead: {
    id: "Halaman ini menjelaskan cara mengirim laporan yang mudah ditindaklanjuti, hal yang bisa dan tidak bisa kami bantu, serta langkah yang sebaiknya dicoba sebelum mengirim email.",
    en: "This page explains how to send a report we can act on, what we can and cannot help with, and the steps worth trying before you send an email.",
  },
  sections: {
    id: [
      {
        heading: "Informasi yang mempercepat laporan bug",
        paragraphs: [
          "Sertakan alamat halaman alat yang kamu pakai, misalnya /image/compress atau /pdf/reduce, beserta nama dan versi peramban, sistem operasi, dan perangkat yang digunakan. Tuliskan ukuran file, jumlah halaman untuk PDF, format asli, serta target ukuran yang kamu masukkan.",
          "Tempelkan pesan error persis seperti yang muncul dan urutan langkah yang memicunya. Jika masalah berkaitan dengan tampilan, sertakan tangkapan layar dengan bagian sensitif disamarkan. Untuk laporan hasil kompresi, sebutkan apakah file gagal diproses, hasilnya melebihi target, atau hasilnya rusak saat dibuka.",
        ],
        bullets: [
          "Satu email untuk satu masalah agar laporan tidak tercampur.",
          "Sebutkan apakah masalah muncul di Chrome, Firefox, Safari, atau Edge.",
          "Jangan lampirkan dokumen asli; kami tidak dapat membuka atau menyimpannya.",
        ],
      },
      {
        heading: "Yang bisa dan tidak bisa kami bantu",
        paragraphs: [
          "Kami dapat menjelaskan cara kerja alat, batas ukuran dan format, penyebab umum kegagalan, serta langkah alternatif yang tersedia di situs. Kami juga menerima masukan untuk memperjelas panduan atau memperbaiki bug yang dapat kami reproduksi.",
          "Kami tidak dapat mengembalikan file yang sudah ditutup tabnya karena file tidak pernah disimpan. Kami juga tidak dapat mengubah hasil seleksi portal pemerintah, kampus, atau perusahaan, menandatangani dokumen, atau menjamin bahwa file akan diterima sistem tertentu. Untuk masalah akun dan unggahan di portal lain, hubungi penyedia portal tersebut.",
        ],
      },
      {
        heading: "Sebelum mengirim email",
        paragraphs: [
          "Periksa bagian FAQ di halaman alat yang bersangkutan dan artikel blog yang relevan; banyak pertanyaan tentang batas ukuran, format, dan kualitas sudah dijawab di sana. Coba ulangi proses dengan satu file kecil untuk memastikan masalahnya bukan pada file atau koneksi.",
          "Pastikan file berada dalam batas yang didukung: gambar maksimal 50 MB per file, PDF maksimal 100 MB per file, dan antrean maksimal 20 file. Jika situs dibuka dari dalam aplikasi lain, coba peramban biasa seperti Chrome, Firefox, atau Safari. Muat ulang halaman sekali sebelum melaporkan masalah yang baru muncul.",
        ],
      },
      {
        heading: "Privasi korespondensi",
        paragraphs: [
          "Kami hanya menerima alamat email, nama yang kamu tulis, dan isi pesan. Informasi itu dipakai untuk membalas laporanmu dan tidak dibagikan ke pengiklan. Jangan mengirim kata sandi, nomor identitas, dokumen pribadi, atau data pembayaran melalui email.",
          "Karena tidak ada akun dan tidak ada penyimpanan file, kami tidak memiliki riwayat pemrosesan untuk diperiksa. Detail yang kamu tulis dalam email adalah satu-satunya konteks yang kami punya, jadi tuliskan sedetail mungkin tanpa menyertakan data sensitif.",
        ],
      },
    ],
    en: [
      {
        heading: "Details that speed up a bug report",
        paragraphs: [
          "Include the tool page you used, such as /image/compress or /pdf/reduce, along with your browser name and version, operating system, and device. Note the file size, page count for PDFs, original format, and the target size you entered.",
          "Paste the exact error message and the steps that triggered it. For a display problem, attach a screenshot with sensitive parts masked. For a compression result, say whether the file failed to process, stayed above the target, or opened incorrectly after download.",
        ],
        bullets: [
          "Keep one email per issue so reports do not get mixed together.",
          "Mention whether the problem appears in Chrome, Firefox, Safari, or Edge.",
          "Do not attach the original document; we cannot open or store it.",
        ],
      },
      {
        heading: "What we can and cannot help with",
        paragraphs: [
          "We can explain how a tool works, its size and format limits, common causes of failure, and alternative steps available on the site. We also welcome suggestions that make the guides clearer or help us reproduce a bug.",
          "We cannot recover a file after its tab is closed because files are never stored. We also cannot change the outcome of a government, university, or company portal review, sign documents, or guarantee that a file will be accepted by a particular system. For account and upload problems on another portal, contact that portal's provider.",
        ],
      },
      {
        heading: "Before you send an email",
        paragraphs: [
          "Check the FAQ on the relevant tool page and the related blog article; many questions about size limits, formats, and quality are already answered there. Try the process again with one small file to confirm the issue is not specific to that file or connection.",
          "Make sure the file is within the supported limits: images up to 50 MB per file, PDFs up to 100 MB per file, and queues of up to 20 files. If you opened the site inside another app, try a regular browser such as Chrome, Firefox, or Safari. Reload the page once before reporting a newly appearing problem.",
        ],
      },
      {
        heading: "Privacy of correspondence",
        paragraphs: [
          "We receive only the email address, the name you provide, and the message content. That information is used to reply to your report and is not shared with advertisers. Do not send passwords, identity numbers, personal documents, or payment details by email.",
          "Because there are no accounts and no file storage, we have no processing history to inspect. The details you write in the email are the only context we have, so describe the issue as fully as possible without including sensitive data.",
        ],
      },
    ],
  },
};
