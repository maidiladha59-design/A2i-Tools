import type { Bilingual, ContentSection } from "@/content/types";

export const ABOUT_CONTENT: {
  intro: Bilingual<string[]>;
  values: Bilingual<Array<{ title: string; body: string }>>;
  sections: Bilingual<ContentSection[]>;
} = {
  intro: {
    id: [
      "Ai2 All Compress lahir dari situasi yang sangat biasa: sebuah dokumen sudah siap, lalu portal pendaftaran menolak unggahan karena ukurannya beberapa kilobyte terlalu besar. Mengompres lewat layanan online sering terasa berlebihan — kita diminta mengunggah KTP, ijazah, atau pas foto ke server yang tidak kita kenal.",
      "Situs ini mengambil pendekatan berbeda. Alat gambar dan PDF di sini bekerja di dalam browser. File tidak dikirim ke server, tidak disimpan, dan tidak pernah menjadi bagian dari database. Kamu dapat memeriksa tab Network di alat pengembang browser dan melihat bahwa tidak ada permintaan unggahan file.",
      "Tujuannya sederhana: memberi alat yang cukup cepat dan cukup presisi untuk kebutuhan sehari-hari, tanpa mengorbankan privasi.",
    ],
    en: [
      "Ai2 All Compress started with a very ordinary problem: a document is ready, then a registration portal rejects the upload because it is a few kilobytes over the limit. Compressing it through an online service often feels excessive — we are asked to upload an ID card, diploma, or portrait to a server we do not know.",
      "This site takes a different approach. The image and PDF tools run inside your browser. Files are not sent to a server, not stored, and never become part of a database. You can open your browser's developer tools, check the Network tab, and see that no file upload request is made.",
      "The goal is simple: provide tools that are fast and precise enough for everyday needs without sacrificing privacy.",
    ],
  },
  values: {
    id: [
      {
        title: "Privasi sebagai default",
        body: "Tidak ada API unggahan yang perlu dipercaya. File diproses di memori perangkat dan hilang saat tab ditutup.",
      },
      {
        title: "Jujur soal batasan",
        body: "Jika target ukuran tidak tercapai, kami menampilkan hasil terbaik dan menjelaskan alasannya. Tidak ada klaim berlebihan.",
      },
      {
        title: "Presisi yang bisa dipakai",
        body: "Target KB dan MB dirancang untuk kebutuhan nyata: formulir, portal lamaran, dan batas unggahan yang harus dipatuhi.",
      },
      {
        title: "Tanpa hambatan",
        body: "Tanpa akun, tanpa watermark, tanpa antrean server. Alat langsung terbuka dan bisa dipakai di ponsel.",
      },
    ],
    en: [
      {
        title: "Privacy by default",
        body: "There is no upload API to trust. Files are processed in device memory and disappear when the tab is closed.",
      },
      {
        title: "Honest about limits",
        body: "If a size target cannot be reached, we show the best result and explain why. No inflated claims.",
      },
      {
        title: "Practical precision",
        body: "KB and MB targets are built for real needs: forms, application portals, and upload limits that must be respected.",
      },
      {
        title: "No friction",
        body: "No account, no watermark, no server queue. Tools open immediately and work on a phone.",
      },
    ],
  },
  sections: {
    id: [
      {
        heading: "Apa yang bisa dilakukan di sini",
        paragraphs: [
          "Untuk gambar, kamu dapat mengompres satu file atau satu antrean sekaligus, mengejar target 50 KB hingga 2 MB, mengubah ukuran dengan rasio terkunci, mengonversi antarformat, dan memotong gambar dengan rasio bebas atau preset pas foto.",
          "Untuk PDF, tersedia kompresi tiga level, pengurangan ke target KB atau MB, pengaturan halaman dengan pratinjau, serta penggabungan beberapa dokumen dengan urutan yang kamu tentukan. Semua proses berjalan lokal dan hasilnya dapat diunduh langsung.",
        ],
      },
      {
        heading: "Bagaimana pemrosesan bekerja",
        paragraphs: [
          "Alat gambar memakai Web Worker dan canvas untuk membaca, mengubah ukuran, dan mengodekan ulang gambar. Alat PDF memakai pustaka yang dimuat hanya ketika dibutuhkan, lalu memproses halaman satu per satu agar memori tetap terkendali.",
          "Karena berjalan di perangkatmu, kecepatan bergantung pada kemampuan prosesor dan memori HP atau komputer. File yang sangat besar dapat dibatasi oleh browser; situs menolak file di atas 50 MB untuk gambar dan 100 MB untuk PDF.",
        ],
      },
      {
        heading: "Siapa yang membuatnya",
        paragraphs: [
          "Situs ini dikelola secara independen sebagai proyek alat file yang berfokus pada privasi. Kami tidak menerima file pengguna, tidak menjual data, dan tidak mengklaim afiliasi dengan portal pemerintah, kampus, atau perusahaan mana pun.",
          "Jika kamu menemukan masalah, memiliki ide fitur, atau ingin melaporkan hasil yang tidak sesuai, silakan hubungi kami melalui halaman Kontak. Masukan dari pengguna membantu menentukan alat berikutnya.",
        ],
      },
    ],
    en: [
      {
        heading: "What you can do here",
        paragraphs: [
          "For images, you can compress a single file or a whole queue, chase targets from 50 KB to 2 MB, resize with a locked aspect ratio, convert between formats, and crop with a free ratio or portrait presets.",
          "For PDFs, there is three-level compression, reduction to a KB or MB target, page management with thumbnails, and merging of multiple documents in the order you choose. Everything runs locally and results can be downloaded immediately.",
        ],
      },
      {
        heading: "How processing works",
        paragraphs: [
          "Image tools use a Web Worker and canvas to read, resize, and re-encode images. PDF tools use libraries loaded only when needed, then process pages one at a time to keep memory under control.",
          "Because processing happens on your device, speed depends on your phone or computer's processor and memory. Very large files may hit browser limits; the site rejects files above 50 MB for images and 100 MB for PDFs.",
        ],
      },
      {
        heading: "Who runs it",
        paragraphs: [
          "The site is independently maintained as a privacy-focused file-tool project. We do not receive user files, sell data, or claim affiliation with any government portal, university, or company.",
          "If you find a problem, have a feature idea, or want to report an unexpected result, contact us through the Contact page. User feedback helps decide what to build next.",
        ],
      },
    ],
  },
};
