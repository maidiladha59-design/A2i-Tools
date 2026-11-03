import type { BlogPost } from "@/content/blog/types";

export const privacyOfBrowserFileTools: BlogPost = {
  slug: "privacy-of-browser-file-tools",
  category: "privacy",
  publishedAt: "2026-10-14",
  updatedAt: "2026-11-01",
  readingMinutes: 7,
  relatedTools: ["imageCompress", "pdfCompress", "pdfMerge"],
  title: {
    id: "Seberapa Privat Alat File di Browser? Ini Cara Memeriksanya",
    en: "How Private Are Browser File Tools? Check for Yourself",
  },
  description: {
    id: "Memahami pemrosesan sisi klien, apa yang benar-benar lewat jaringan, risiko konverter cloud, dan cara memeriksa alat lokal lewat DevTools.",
    en: "How client-side processing works, what still crosses the network, the risks of cloud converters, and how to verify a tool with DevTools.",
  },
  intro: {
    id: [
      "Mengompres PDF berisi slip gaji atau memotong foto KTP di situs gratis terasa praktis. Pertanyaan yang jarang diajukan: ke mana file itu pergi setelah tombol proses ditekan?",
      "Banyak alat populer bekerja dengan mengunggah file ke server, memprosesnya di sana, lalu mengirim hasilnya kembali. Alat yang berjalan di browser memakai pendekatan berbeda, dan perbedaannya cukup penting untuk dipahami.",
      "Artikel ini menjelaskan arti pemrosesan lokal, apa yang masih melintasi jaringan, cara memeriksa sendiri apakah sebuah alat benar-benar lokal, serta batasan yang tetap ada meski file tidak pernah diunggah.",
    ],
    en: [
      "Compressing a PDF full of payslips or cropping a photo of your ID on a free site feels convenient. The question people rarely ask is where the file goes after the process button is pressed.",
      "Many popular tools work by uploading your file to a server, processing it there, and sending the result back. Tools that run in the browser take a different approach, and the difference is worth understanding.",
      "This article explains what local processing means, what still crosses the network, how to check for yourself whether a tool is really local, and which limits remain even when a file is never uploaded.",
    ],
  },
  sections: {
    id: [
      {
        heading: "Apa arti diproses di browser",
        paragraphs: [
          "Situs web modern bukan hanya halaman statis. Kode JavaScript bisa membaca file yang kamu pilih melalui input file, memuatnya ke memori, dan mengolahnya langsung di perangkat. Untuk gambar, canvas HTML5 menyediakan akses piksel, pengubahan ukuran, dan encoding ulang. Untuk PDF, pustaka seperti pdf-lib atau pdf.js bekerja sepenuhnya di sisi klien.",
          "Di Ai2 All Compress, pemrosesan gambar berjalan di Web Worker dan canvas, sedangkan penggabungan PDF memakai pdf-lib di browser. Tidak ada endpoint unggahan yang menerima isi file. Server hanya mengirim halaman dan aset tampilan; setelah itu pekerjaan berlangsung di perangkatmu.",
          "Konsekuensinya nyata. Menutup tab menghentikan proses dan membebaskan memori, karena file hanya ada di sana. Tidak ada antrean di server, tidak ada tautan hasil yang kedaluwarsa, dan tidak ada salinan yang tersisa di infrastruktur penyedia.",
        ],
      },
      {
        heading: "Apa yang tetap melintasi jaringan",
        paragraphs: [
          "Lokal bukan berarti tidak ada lalu lintas jaringan sama sekali. Halaman itu sendiri harus diunduh: HTML, bundel JavaScript, stylesheet, font, dan ikon. Permintaan ini wajar dan terjadi pada semua situs.",
          "Jika iklan diaktifkan, skrip iklan pihak ketiga juga dimuat. Di Ai2 All Compress, AdSense bersifat opsional dan hanya muncul bila sudah dikonfigurasi serta kamu menyetujui cookie yang relevan. Yang penting, tidak ada analitik yang membaca isi filemu, dan tidak ada data file yang dikirim ke jaringan iklan.",
          "Preferensi tema, bahasa, dan persetujuan cookie disimpan di localStorage browser. Itu hanya pengaturan tampilan, bukan salinan dokumen, dan bisa dihapus kapan saja melalui pengaturan situs di browser.",
        ],
      },
      {
        heading: "Risiko konverter berbasis cloud",
        paragraphs: [
          "Alat cloud bukan otomatis buruk. Banyak di antaranya jujur soal kebijakan penyimpanan dan menghapus file dalam hitungan jam. Masalahnya, kebijakan itu tidak selalu mudah diverifikasi, dan file berisi dokumen pribadi tetap meninggalkan perangkatmu.",
          "Risiko utamanya ada tiga. Pertama, retensi: file bisa disimpan lebih lama dari yang kamu kira, terutama bila kebijakan berubah. Kedua, akses pihak ketiga: pemrosesan di server berarti operator dan penyedia infrastruktur secara teknis bisa mengakses file. Ketiga, tautan publik: sebagian layanan menghasilkan URL yang bisa dibuka siapa pun yang memiliki alamatnya.",
          "Untuk foto biasa, risiko ini mungkin dapat diterima. Untuk KTP, akta, laporan medis, atau kontrak kerja, memilih alat yang tidak mengunggah file adalah keputusan yang lebih mudah dipertanggungjawabkan.",
        ],
      },
      {
        heading: "Cara memeriksa apakah alat benar-benar lokal",
        paragraphs: [
          "Kamu tidak perlu memercayai klaim di halaman depan. Buka DevTools dengan F12 atau klik kanan lalu Inspect, pindah ke tab Network, dan saring berdasarkan Fetch/XHR. Lalu jalankan satu file melalui alat tersebut sambil memperhatikan daftar permintaan.",
          "Pada alat yang benar-benar lokal, aset halaman akan terlihat dimuat, tetapi tidak ada permintaan yang membawa isi file ke domain lain saat proses berjalan. Coba juga dengan file besar: unggahan nyata memakan waktu dan menampilkan progres transfer, sedangkan pemrosesan lokal biasanya selesai tanpa lalu lintas data keluar.",
          "Beberapa pemeriksaan tambahan yang berguna:",
        ],
        bullets: [
          "Putuskan koneksi internet setelah halaman selesai dimuat, lalu proses file. Alat lokal sering tetap berfungsi.",
          "Cari permintaan POST berukuran besar di tab Network tepat saat kamu menekan proses.",
          "Periksa apakah ada tautan hasil yang bisa dibuka di perangkat lain. Alat lokal biasanya hanya menyediakan unduhan langsung.",
          "Untuk penggunaan rutin, pertimbangkan menjalankan versi kode yang bisa di-host sendiri bila tersedia.",
        ],
      },
      {
        heading: "Batas memori browser dan artinya bagi kamu",
        paragraphs: [
          "Pemrosesan lokal memindahkan beban dari server ke perangkat. Browser harus menyimpan file, salinan hasil, dan data antara di RAM. Karena itu ada batas yang masuk akal: gambar maksimal 50 MB dan PDF maksimal 100 MB per file, dengan antrean maksimal 20 file.",
          "Pada perangkat dengan RAM terbatas, PDF besar diproses halaman demi halaman agar tab tidak kehabisan memori. Meski begitu, membuka banyak tab berat tetap berisiko membuat tab crash. Jika itu terjadi, file asli di perangkat tidak terpengaruh; hanya proses yang berjalan yang hilang.",
          "Batas ini juga menjelaskan mengapa kecepatan bergantung pada perangkat. Ponsel lama akan jauh lebih lambat daripada laptop, terutama untuk render ulang PDF berwarna dengan banyak halaman. Tidak ada server cepat yang bisa menutupi perbedaan itu.",
        ],
      },
      {
        heading: "Kewaspadaan yang tetap berlaku",
        paragraphs: [
          "Tidak adanya unggahan menghilangkan satu risiko, bukan semua risiko. Kode situs tetap harus dipercaya, karena JavaScript di halaman memiliki akses ke file yang kamu pilih. Memilih alat dari sumber yang jelas dan, bila mungkin, meninjau kodenya tetap penting.",
          "Keamanan perangkat juga menjadi tanggung jawabmu. Malware, ekstensi browser berbahaya, dan komputer bersama bisa membaca file jauh sebelum alat apa pun terlibat. Ekstensi yang meminta akses ke semua situs adalah kandidat pertama untuk ditinjau.",
          "Terakhir, biasakan menyimpan cadangan. File asli sebaiknya tidak pernah ditimpa, dan hasil kompresi diperiksa sebelum file asli dihapus. Pemrosesan lokal mengurangi permukaan risiko, tetapi tidak menggantikan kebiasaan dasar dalam mengelola file pribadi.",
        ],
      },
    ],
    en: [
      {
        heading: "What processing in the browser actually means",
        paragraphs: [
          "A modern website is more than a static page. JavaScript can read a file you select through a file input, load it into memory, and work on it directly on your device. For images, HTML5 canvas provides pixel access, resizing, and re-encoding. For PDFs, libraries such as pdf-lib or pdf.js run entirely on the client.",
          "At Ai2 All Compress, images are processed in a Web Worker and canvas, while PDF merging uses pdf-lib in the browser. There is no upload endpoint that receives file contents. The server delivers the page and interface assets; after that, the work happens on your device.",
          "The consequences are real. Closing the tab stops processing and frees memory, because the file only exists there. There is no server queue, no expiring download link, and no copy left in the provider infrastructure.",
        ],
      },
      {
        heading: "What still travels over the network",
        paragraphs: [
          "Local does not mean zero network traffic. The page itself has to be downloaded: HTML, JavaScript bundles, stylesheets, fonts, and icons. That is true of every website.",
          "If ads are enabled, third-party ad scripts load too. At Ai2 All Compress, AdSense is optional and only appears when it has been configured and you have consented to the relevant cookies. Importantly, no analytics read your file contents, and no file data reaches advertising networks.",
          "Theme, language, and cookie consent preferences live in browser localStorage. That is interface settings only, not document copies, and can be cleared at any time through browser site settings.",
        ],
      },
      {
        heading: "The risks of cloud-based converters",
        paragraphs: [
          "Cloud tools are not automatically bad. Many are honest about retention policies and delete files within hours. Such policies are not always easy to verify, and a file with personal documents still leaves your device.",
          "Three risks matter most. First, retention: files may be kept longer than you expect, especially if a policy changes. Second, third-party access: server-side processing means operators and infrastructure providers can technically reach the file. Third, public links: some services generate URLs that anyone holding the address can open.",
          "For an ordinary photo, those risks may be acceptable. For an ID card, a deed, a medical report, or an employment contract, choosing a tool that does not upload the file is the easier decision to defend.",
        ],
      },
      {
        heading: "How to check whether a tool is really local",
        paragraphs: [
          "You do not have to trust the claim on the home page. Open DevTools with F12 or right-click and choose Inspect, switch to the Network tab, and filter by Fetch/XHR. Then run one file through the tool while watching the list of requests.",
          "With a genuinely local tool you will see page assets load, but no request carrying file contents to another domain while processing runs. Try a large file: a real upload takes time and shows transfer progress, whereas local processing usually finishes without outbound traffic.",
          "A few extra checks:",
        ],
        bullets: [
          "Disconnect from the internet once the page has loaded, then process a file. Local tools often keep working.",
          "Watch for a large POST request in the Network tab when you press process.",
          "Check whether a result link can be opened on another device. Local tools usually offer only a direct download.",
          "For routine work, consider running a self-hostable version of the code if one exists.",
        ],
      },
      {
        heading: "Browser memory limits and what they mean for you",
        paragraphs: [
          "Local processing moves the load from a server to your device. The browser must hold the file, a copy of the result, and intermediate data in RAM. That is why sensible limits exist: images up to 50 MB and PDFs up to 100 MB per file, with queues of up to 20 files.",
          "On devices with limited RAM, large PDFs are processed page by page so the tab does not run out of memory. Even so, keeping many heavy tabs open still risks a crash. If that happens, the original file is unaffected; only the running process is lost.",
          "These limits also explain why speed depends on the device. An older phone is much slower than a laptop, especially when re-rendering a long colour PDF. No fast server can hide that difference.",
        ],
      },
      {
        heading: "Caveats that still apply",
        paragraphs: [
          "The absence of an upload removes one risk, not all of them. The site code still has to be trusted, because JavaScript on the page has access to the file you select. Choosing a tool from a clear source and, where possible, reviewing its code still matters.",
          "Device security is your responsibility too. Malware, malicious browser extensions, and shared computers can read files long before any tool is involved. Extensions with access to all sites are the first candidates for review.",
          "Finally, make backups a habit. The original file should never be overwritten, and a compressed result should be checked before the original is deleted. Local processing reduces the attack surface, but it does not replace basic file hygiene.",
        ],
      },
    ],
  },
  conclusion: {
    id: [
      "Alat file yang berjalan di browser menawarkan model privasi berbeda dari konverter cloud: file tidak dikirim, tidak disimpan, dan tidak meninggalkan perangkat. Itu keuntungan nyata untuk dokumen pribadi.",
      "Tetap periksa sendiri, jangan hanya percaya klaim. Lihat tab Network, uji dengan file besar, pahami batas memori, dan jaga keamanan perangkat. Privasi yang baik adalah kombinasi antara alat yang tepat dan kebiasaan yang tepat.",
    ],
    en: [
      "File tools that run in the browser offer a different privacy model from cloud converters: files are not uploaded, not stored, and never leave the device. That is a real advantage for personal documents.",
      "Still verify rather than trust. Watch the Network tab, test with a large file, understand the memory limits, and keep your device secure. Good privacy is a combination of the right tool and the right habits.",
    ],
  },
};
