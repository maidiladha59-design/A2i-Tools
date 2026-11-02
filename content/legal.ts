import type { Bilingual, ContentSection } from "@/content/types";

export type LegalDoc = {
  title: Bilingual<string>;
  description: Bilingual<string>;
  updated: string;
  sections: Bilingual<ContentSection[]>;
};

export const PRIVACY_POLICY: LegalDoc = {
  title: {
    id: "Kebijakan Privasi",
    en: "Privacy Policy",
  },
  description: {
    id: "Bagaimana Ai2 All Compress memproses file, data teknis, penyimpanan lokal, dan iklan opsional.",
    en: "How Ai2 All Compress handles files, technical data, local storage, and optional advertising.",
  },
  updated: "2026-11-02",
  sections: {
    id: [
      {
        heading: "Ringkasan singkat",
        paragraphs: [
          "Ai2 All Compress adalah kumpulan alat gambar dan PDF yang berjalan di browser. File yang kamu pilih untuk dikompres, diubah ukurannya, dipotong, digabung, atau dirapikan tidak dikirim ke server kami. Tidak ada API unggahan, tidak ada penyimpanan file, dan kami tidak dapat melihat isi filemu.",
        ],
        bullets: [
          "File diproses di memori perangkat dan hilang saat tab ditutup atau dimuat ulang.",
          "Kami tidak menyimpan file di server, localStorage, atau IndexedDB.",
          "Kami tidak memakai analytics yang mengirim nama, isi, atau metadata file.",
          "Preferensi tema, bahasa, dan persetujuan cookie disimpan secara lokal di browsermu.",
        ],
      },
      {
        heading: "Data yang kami terima",
        paragraphs: [
          "Server hanya mengirim halaman web, skrip, dan aset tampilan. Ketika kamu membuka situs, penyedia hosting dapat mencatat informasi teknis standar seperti alamat IP, jenis peramban, waktu permintaan, dan halaman yang diminta untuk keamanan serta pemantauan ketersediaan. Log tersebut tidak berisi file yang kamu proses.",
          "Jika kamu menghubungi kami melalui email, kami menerima alamat email, nama yang kamu tulis, dan isi pesan. Kami memakai informasi itu hanya untuk membalas pertanyaan atau laporanmu. Jangan mengirim kata sandi, dokumen sensitif, atau data pribadi yang tidak diperlukan melalui email.",
        ],
      },
      {
        heading: "Penyimpanan lokal dan cookie",
        paragraphs: [
          "Kami memakai penyimpanan lokal browser untuk mengingat pilihan tema, bahasa, dan status persetujuan cookie. Cookie NEXT_LOCALE menyimpan pilihan bahasa agar kamu tidak perlu memilih ulang. Data ini tidak memuat file, nama file, atau isi dokumen.",
          "Jika fitur iklan diaktifkan oleh pemilik situs, Google AdSense dapat memasang cookie atau teknologi serupa setelah kamu menyetujui iklan. Jika kamu menolak, skrip iklan tidak dimuat. Kamu dapat mengubah pilihan melalui tautan Preferensi cookie di footer.",
        ],
      },
      {
        heading: "Pihak ketiga",
        paragraphs: [
          "Situs dapat dihosting pada penyedia infrastruktur seperti Vercel yang memproses data teknis permintaan web sesuai kebijakan mereka sendiri. Jika iklan ditampilkan, Google bertindak sebagai penyedia iklan pihak ketiga dan dapat memproses data sesuai kebijakan privasi Google.",
          "Kami tidak menjual data, tidak membuat profil pengguna berdasarkan file, dan tidak membagikan isi file kepada pengiklan. Alat ini juga tidak terhubung ke portal pemerintah, kampus, atau perusahaan mana pun.",
        ],
      },
      {
        heading: "Keamanan dan batasan",
        paragraphs: [
          "Karena file tidak dikirim ke server, risiko kebocoran file di sisi kami sangat kecil. Namun, keamanan tetap bergantung pada perangkatmu: peramban, ekstensi, dan malware di perangkat dapat membaca apa yang sedang ditampilkan. Gunakan perangkat tepercaya dan simpan cadangan file asli.",
          "Pemrosesan besar dibatasi agar browser tetap stabil: gambar maksimal 50 MB per file, PDF maksimal 100 MB per file, dan antrean maksimal 20 file. File yang melewati batas akan ditolak sebelum diproses.",
        ],
      },
      {
        heading: "Hak dan pertanyaan",
        paragraphs: [
          "Karena kami tidak menyimpan file atau akun pengguna, permintaan akses atau penghapusan data file umumnya tidak berlaku. Untuk pertanyaan tentang email yang pernah kamu kirim, kebijakan ini, atau permintaan penghapusan korespondensi, hubungi kami melalui email resmi yang tercantum di halaman Kontak.",
          "Kami dapat memperbarui kebijakan ini jika perilaku situs berubah. Tanggal pembaruan terakhir selalu ditampilkan di bagian atas halaman.",
        ],
      },
    ],
    en: [
      {
        heading: "The short version",
        paragraphs: [
          "Ai2 All Compress is a set of image and PDF tools that run in your browser. Files you choose to compress, resize, crop, merge, or organize are not sent to our servers. There is no upload API, no file storage, and we cannot see the contents of your files.",
        ],
        bullets: [
          "Files are processed in device memory and disappear when the tab is closed or reloaded.",
          "We do not store files on a server, in localStorage, or in IndexedDB.",
          "We do not use analytics that transmit file names, contents, or metadata.",
          "Theme, language, and cookie-consent preferences are stored locally in your browser.",
        ],
      },
      {
        heading: "Data we receive",
        paragraphs: [
          "The server only delivers web pages, scripts, and display assets. When you visit the site, the hosting provider may log standard technical information such as IP address, browser type, request time, and requested page for security and availability monitoring. Those logs do not contain the files you process.",
          "If you contact us by email, we receive the email address, the name you provide, and the content of your message. We use that information only to answer your question or report. Do not send passwords, sensitive documents, or unnecessary personal data by email.",
        ],
      },
      {
        heading: "Local storage and cookies",
        paragraphs: [
          "We use browser local storage to remember your theme, language, and cookie-consent choice. The NEXT_LOCALE cookie stores your language selection so you do not have to choose again. This data does not contain files, file names, or document contents.",
          "If the site owner enables advertising, Google AdSense may set cookies or similar technologies after you accept ads. If you decline, the advertising script is not loaded. You can change your choice through the Cookie preferences link in the footer.",
        ],
      },
      {
        heading: "Third parties",
        paragraphs: [
          "The site may be hosted on an infrastructure provider such as Vercel, which processes technical web-request data under its own policies. If ads are displayed, Google acts as a third-party advertising provider and may process data under Google's privacy policy.",
          "We do not sell data, build user profiles from files, or share file contents with advertisers. These tools are not affiliated with any government portal, university, or company.",
        ],
      },
      {
        heading: "Security and limits",
        paragraphs: [
          "Because files are not sent to a server, the risk of a file leak on our side is minimal. Security still depends on your device: your browser, extensions, and malware can read what is displayed on screen. Use a trusted device and keep backups of original files.",
          "Large processing jobs are limited to keep the browser stable: images up to 50 MB per file, PDFs up to 100 MB per file, and queues of up to 20 files. Files above those limits are rejected before processing.",
        ],
      },
      {
        heading: "Your questions and rights",
        paragraphs: [
          "Because we do not store files or user accounts, access or deletion requests generally do not apply to file data. For questions about an email you sent, this policy, or a request to delete correspondence, contact us at the official email address on the Contact page.",
          "We may update this policy if the site's behavior changes. The last-updated date is always shown at the top of the page.",
        ],
      },
    ],
  },
};

export const TERMS: LegalDoc = {
  title: { id: "Syarat & Ketentuan", en: "Terms & Conditions" },
  description: {
    id: "Aturan penggunaan alat gambar dan PDF Ai2 All Compress.",
    en: "Rules for using the Ai2 All Compress image and PDF tools.",
  },
  updated: "2026-11-02",
  sections: {
    id: [
      {
        heading: "Penerimaan syarat",
        paragraphs: [
          "Dengan mengakses atau memakai Ai2 All Compress, kamu menyetujui syarat dan ketentuan ini. Jika tidak setuju, jangan gunakan situs. Syarat ini berlaku untuk semua pengunjung dan semua alat, termasuk alat gambar, PDF, blog, dan formulir kontak.",
        ],
      },
      {
        heading: "Layanan yang disediakan",
        paragraphs: [
          "Situs menyediakan alat gratis untuk mengompres gambar, mengubah ukuran, mengonversi format, memotong gambar, mengompres PDF, memperkecil PDF ke target ukuran, mengatur halaman PDF, dan menggabungkan PDF. Pemrosesan berjalan di browser. Kami tidak menjanjikan hasil tertentu, termasuk jaminan bahwa file akan diterima oleh portal atau layanan pihak ketiga.",
          "Ketersediaan fitur dapat berubah. Kami dapat memperbaiki, mengubah, atau menghentikan bagian situs tanpa pemberitahuan, tetapi kami berusaha menjaga alat inti tetap berfungsi.",
        ],
      },
      {
        heading: "Penggunaan yang dapat diterima",
        paragraphs: [
          "Kamu hanya boleh memproses file yang kamu miliki atau yang kamu berhak gunakan. Kamu bertanggung jawab memastikan bahwa dokumen tidak melanggar hak cipta, privasi orang lain, atau hukum yang berlaku.",
        ],
        bullets: [
          "Jangan memakai situs untuk menyebarkan malware, konten ilegal, atau materi yang melanggar hak orang lain.",
          "Jangan mencoba mengganggu, membebani berlebihan, atau membobol layanan dan infrastruktur situs.",
          "Jangan menghapus pemberitahuan hak cipta atau mengklaim hasil karya pihak lain sebagai milikmu.",
          "Jangan mengandalkan hasil kompresi sebagai satu-satunya salinan dokumen penting.",
        ],
      },
      {
        heading: "Tanpa jaminan",
        paragraphs: [
          "Alat disediakan apa adanya dan sejauh tersedia. Kami tidak memberikan jaminan bahwa hasil kompresi bebas kesalahan, mempertahankan semua detail, atau memenuhi persyaratan pihak ketiga. Kompresi dapat menurunkan kualitas gambar, menghilangkan metadata, mengubah halaman PDF menjadi gambar, atau membuat teks tidak dapat dipilih.",
          "Selalu periksa hasil sebelum mengirimkannya ke portal pendaftaran, pekerjaan, atau layanan penting. Simpan file asli sebagai cadangan.",
        ],
      },
      {
        heading: "Batasan tanggung jawab",
        paragraphs: [
          "Sejauh diizinkan hukum, kami tidak bertanggung jawab atas kerugian langsung atau tidak langsung yang timbul dari penggunaan situs, termasuk penolakan unggahan, kehilangan file, atau kerusakan perangkat. Tanggung jawabmu untuk mematuhi hukum dan persyaratan pihak ketiga tetap ada.",
        ],
      },
      {
        heading: "Iklan, tautan, dan perubahan",
        paragraphs: [
          "Situs dapat menampilkan iklan atau tautan pihak ketiga jika diaktifkan. Kami tidak mengendalikan konten atau kebijakan pihak ketiga tersebut. Iklan tidak memengaruhi hasil alat dan tidak memberi pengiklan akses ke filemu.",
          "Kami dapat memperbarui syarat ini. Versi terbaru berlaku saat dipublikasikan. Jika ada pertanyaan, hubungi kami melalui email resmi di halaman Kontak.",
        ],
      },
    ],
    en: [
      {
        heading: "Acceptance of terms",
        paragraphs: [
          "By accessing or using Ai2 All Compress, you agree to these terms and conditions. If you do not agree, do not use the site. These terms apply to all visitors and all tools, including image tools, PDF tools, the blog, and the contact form.",
        ],
      },
      {
        heading: "The service",
        paragraphs: [
          "The site provides free tools to compress images, resize images, convert formats, crop images, compress PDFs, reduce PDFs to a target size, organize PDF pages, and merge PDFs. Processing runs in your browser. We do not guarantee any particular outcome, including that a file will be accepted by a third-party portal or service.",
          "Feature availability may change. We may fix, change, or discontinue parts of the site without notice, while aiming to keep the core tools working.",
        ],
      },
      {
        heading: "Acceptable use",
        paragraphs: [
          "You may only process files that you own or have the right to use. You are responsible for ensuring that documents do not infringe copyright, the privacy of others, or applicable law.",
        ],
        bullets: [
          "Do not use the site to distribute malware, illegal content, or material that violates the rights of others.",
          "Do not attempt to disrupt, overload, or break into the service or its infrastructure.",
          "Do not remove copyright notices or claim someone else's work as your own.",
          "Do not rely on a compressed result as the only copy of an important document.",
        ],
      },
      {
        heading: "No warranty",
        paragraphs: [
          "The tools are provided as is and as available. We make no warranty that compression will be error-free, preserve every detail, or meet third-party requirements. Compression may reduce image quality, remove metadata, turn PDF pages into images, or make text unselectable.",
          "Always inspect the result before submitting it to a registration, job, or other important portal. Keep the original file as a backup.",
        ],
      },
      {
        heading: "Limitation of liability",
        paragraphs: [
          "To the extent permitted by law, we are not liable for direct or indirect losses arising from use of the site, including rejected uploads, lost files, or device damage. Your responsibility to comply with the law and third-party requirements remains.",
        ],
      },
      {
        heading: "Advertising, links, and changes",
        paragraphs: [
          "The site may display advertisements or third-party links if enabled. We do not control the content or policies of those third parties. Ads do not affect tool results and do not give advertisers access to your files.",
          "We may update these terms. The latest version applies when published. If you have questions, contact us at the official email address on the Contact page.",
        ],
      },
    ],
  },
};

export const DISCLAIMER: LegalDoc = {
  title: { id: "Disclaimer", en: "Disclaimer" },
  description: {
    id: "Batasan hasil kompresi, ketepatan informasi, dan penggunaan alat secara bertanggung jawab.",
    en: "Limits of compression results, accuracy of information, and responsible use of the tools.",
  },
  updated: "2026-11-02",
  sections: {
    id: [
      {
        heading: "Hasil tidak selalu dapat diprediksi",
        paragraphs: [
          "Ukuran hasil kompresi bergantung pada isi file, format, resolusi, dan target yang dipilih. Alat ini berusaha mencapai target KB atau MB yang kamu masukkan, tetapi tidak selalu berhasil. Ketika target tidak tercapai, kami menampilkan hasil terbaik yang bisa dibuat beserta saran, bukan mengklaim keberhasilan yang tidak nyata.",
          "Gambar dapat kehilangan detail halus, terutama pada kualitas rendah atau target yang sangat kecil. PDF yang dirender ulang ke JPEG kehilangan teks yang dapat dipilih, tautan, dan struktur dokumen asli.",
        ],
      },
      {
        heading: "Selalu simpan file asli",
        paragraphs: [
          "Alat ini tidak menyimpan file dan tidak memiliki fitur undo setelah tab ditutup. Unduh hasil, buka kembali untuk memeriksa halaman atau gambar, dan simpan salinan file asli sebelum mengirimkan versi yang sudah dikompres.",
        ],
      },
      {
        heading: "Bukan nasihat profesional",
        paragraphs: [
          "Artikel blog dan teks di situs ini bersifat informasi umum, bukan nasihat hukum, imigrasi, akademik, atau profesional. Persyaratan portal pendaftaran, universitas, dan perusahaan dapat berubah. Selalu periksa petunjuk resmi yang berlaku.",
        ],
      },
      {
        heading: "Tidak berafiliasi",
        paragraphs: [
          "Ai2 All Compress tidak berafiliasi dengan portal CPNS, kampus, perusahaan, atau layanan pemerintah mana pun. Contoh penggunaan seperti pendaftaran kerja atau beasiswa hanya ilustrasi kebutuhan nyata, bukan klaim kerja sama atau jaminan kelulusan.",
        ],
      },
      {
        heading: "Iklan dan tautan pihak ketiga",
        paragraphs: [
          "Jika iklan ditampilkan, iklan tersebut disediakan oleh pihak ketiga. Kami tidak bertanggung jawab atas produk, layanan, atau kebijakan pengiklan. Klik tautan pihak ketiga dengan hati-hati dan baca kebijakan privasi mereka.",
        ],
      },
    ],
    en: [
      {
        heading: "Results are not always predictable",
        paragraphs: [
          "Compressed file size depends on the file's content, format, resolution, and the target you choose. The tool aims to reach the KB or MB target you enter, but it will not always succeed. When a target cannot be reached, we show the smallest result we could produce along with suggestions, rather than claiming a false success.",
          "Images may lose fine detail, especially at low quality or very small targets. A PDF re-rendered to JPEG loses selectable text, links, and the original document structure.",
        ],
      },
      {
        heading: "Always keep the original file",
        paragraphs: [
          "The tool does not store files and has no undo after the tab is closed. Download the result, open it again to check pages or images, and keep a copy of the original before submitting a compressed version.",
        ],
      },
      {
        heading: "Not professional advice",
        paragraphs: [
          "Blog articles and other text on this site are general information, not legal, immigration, academic, or professional advice. Requirements for registration portals, universities, and companies can change. Always check the current official instructions.",
        ],
      },
      {
        heading: "No affiliation",
        paragraphs: [
          "Ai2 All Compress is not affiliated with any civil-service portal, university, company, or government service. Examples such as job or scholarship applications illustrate real-world needs and are not claims of partnership or guaranteed acceptance.",
        ],
      },
      {
        heading: "Advertising and third-party links",
        paragraphs: [
          "If ads are displayed, they are provided by third parties. We are not responsible for advertisers' products, services, or policies. Click third-party links carefully and read their privacy policies.",
        ],
      },
    ],
  },
};
