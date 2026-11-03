import type { BlogPost } from "@/content/blog/types";

export const compressPhotoForRegistration: BlogPost = {
  slug: "compress-photo-for-registration",
  category: "tips",
  publishedAt: "2026-09-08",
  updatedAt: "2026-10-21",
  readingMinutes: 8,
  relatedTools: ["imageCompress", "imageCrop", "imageResize"],
  title: {
    id: "Kompres Foto untuk Pendaftaran: Rasio, Piksel, dan Batas KB",
    en: "Compressing a Photo for an Application: Ratios, Pixels, KB",
  },
  description: {
    id: "Panduan menyiapkan foto pendaftaran agar lolos unggah: membaca syarat portal, memotong rasio 3×4 atau 4×6, mengatur piksel, dan mencapai batas KB.",
    en: "How to prepare a registration photo that uploads on the first try: read the portal rules, crop to 3×4 or 4×6, set pixel dimensions, and meet the KB limit.",
  },
  intro: {
    id: [
      "Foto pendaftaran termasuk berkas yang paling sering ditolak sistem, dan penyebabnya jarang soal wajah. Lebih sering karena ukuran file beberapa kilobyte di atas batas, rasio yang tidak sesuai, atau resolusi yang terlalu kecil ketika portal memperbesarnya.",
      "Kabar baiknya, memperbaikinya tidak memerlukan aplikasi mahal. Kamu hanya perlu membaca syarat dengan teliti, memotong foto pada rasio yang benar, lalu mengecilkan ukurannya secara terkendali.",
      "Urutan langkah di bawah ini disusun agar kamu tidak mengulang siklus kompres, unggah, ditolak.",
    ],
    en: [
      "Registration photos are among the files systems reject most often, and the reason is rarely the face. More often the file sits a few kilobytes above the limit, the ratio does not match, or the resolution is so low that the portal enlarges it into a blur.",
      "None of it requires expensive software. You need to read the requirements, crop to the right ratio, and reduce the size in a controlled way.",
      "The steps below are ordered so you do not repeat the compress, upload, reject cycle.",
    ],
  },
  sections: {
    id: [
      {
        heading: "Mulai dari persyaratan portal, bukan dari fotonya",
        paragraphs: [
          "Sebelum menyentuh gambar, buka halaman pendaftaran dan cari bagian unggah foto. Biasanya ada empat angka yang menentukan: dimensi piksel minimum atau maksimum, ukuran file maksimum dalam KB, format yang diterima, serta rasio atau proporsi wajah yang diminta. Sebagian portal juga mengatur latar belakang, pakaian, dan cara memberi nama file.",
          "Catat semuanya di satu tempat. Jika petunjuknya hanya menulis “maksimal 200 KB”, jangan berhenti di situ; cari juga batas dimensinya. Foto 200 KB dengan lebar 200 piksel akan lolos unggahan tetapi tetap terlihat kabur di kartu peserta.",
          "Satu hal yang mudah terlewat: syarat bisa berbeda antara unggah awal dan verifikasi ulang. Simpan versi petunjuk terbaru agar kamu tidak mengirim foto yang sudah sesuai aturan lama.",
        ],
      },
      {
        heading: "Rasio 3×4 dan 4×6: pilih yang diminta formulir",
        paragraphs: [
          "Ini dua rasio yang paling umum di Indonesia. 3×4 berarti perbandingan lebar dan tinggi 3:4, sedangkan 4×6 adalah 2:3 dan memberi lebih banyak ruang di sekitar wajah. Kalau formulir menyebut salah satunya, jangan menebak. Portal sering memotong otomatis, dan rasio yang tidak sesuai bisa memenggal dagu atau dahi.",
          "Gunakan alat potong dengan rasio terkunci, lalu geser kotak seleksi agar wajah berada di tengah dan bagian atas kepala masih terlihat. Sisakan sedikit ruang di atas kepala, jangan menempel ke tepi. Untuk foto setengah badan, potongan biasanya berhenti di bawah bahu.",
          "Jangan langsung mengunggah setelah memotong. Periksa apakah hasilnya masih seimbang dalam ukuran pratinjau, karena tampilan portal sering tidak lebih besar dari perangko.",
        ],
      },
      {
        heading: "Tentukan ukuran piksel, bukan hanya ukuran file",
        paragraphs: [
          "Batas KB dan dimensi piksel adalah dua syarat berbeda, dan keduanya bisa menggagalkan unggahan. Portal yang meminta 300×400 piksel akan menolak foto 1200×1600 walaupun ukurannya hanya 80 KB. Sebaliknya, gambar 300×400 yang dipaksa menjadi 2 MB tetap terlihat kasar karena detailnya memang tidak ada.",
          "Sebagai gambaran, cetak 3×4 cm pada 300 dpi setara dengan sekitar 354×472 piksel, sedangkan 4×6 cm sekitar 472×709 piksel. Banyak formulir memakai angka bulat seperti 300×400 atau 600×900, jadi ikuti angka yang diminta, bukan hitungan teoretis.",
          "Kalau foto asli jauh lebih besar dari kebutuhan, turunkan resolusi ke angka yang diminta lebih dulu, baru atur kualitas. Urutan itu lebih aman daripada menekan kualitas serendah mungkin pada resolusi penuh.",
        ],
      },
      {
        heading: "Mengejar batas KB dengan cara yang benar",
        paragraphs: [
          "Mode target ukuran mencoba beberapa kombinasi kualitas dan resolusi, lalu menyimpan hasil terbesar yang masih berada di bawah batas. Masukkan angka persis seperti di formulir, misalnya 100 KB atau 200 KB, dan biarkan alat mencari kualitas tertinggi yang muat.",
          "Untuk pas foto, 50–200 KB biasanya cukup tajam di layar maupun cetak kecil. Jika target sangat ketat, turunkan resolusi sebelum menurunkan kualitas. Wajah yang sedikit lembut masih lebih baik daripada wajah yang dipenuhi blok JPEG.",
          "Format juga berpengaruh. JPG adalah pilihan paling aman untuk portal, sementara WebP menghasilkan file lebih kecil pada kualitas setara tetapi belum tentu diterima. Kalau formulir hanya menerima JPG, jangan memaksakan format lain hanya demi beberapa kilobyte.",
        ],
      },
      {
        heading: "Hindari memperbesar foto, dan simpan cadangan",
        paragraphs: [
          "Memperbesar foto 300×400 menjadi 900×1200 tidak menambah detail. Yang terjadi hanya interpolasi, dan hasilnya terlihat lebih lunak daripada aslinya. Jika portal meminta dimensi besar, mulai dari foto asli beresolusi tinggi, bukan dari hasil kompresi sebelumnya.",
          "Selalu simpan file asli di folder terpisah. Setiap pemrosesan menghasilkan file baru, dan metadata EXIF seperti informasi kamera serta lokasi hilang saat gambar ditulis ulang. Untuk foto pendaftaran, hilangnya metadata justru membantu menjaga privasi, tetapi kamu tetap perlu salinan asli untuk keperluan lain.",
          "Beri nama file yang jelas, misalnya foto-pendaftaran-3x4.jpg, tanpa spasi ganda atau karakter aneh. Sebagian sistem lama menolak nama file yang mengandung tanda kurung atau simbol.",
        ],
      },
      {
        heading: "Periksa hasilnya, dan kenali penyebab unggahan gagal",
        paragraphs: [
          "Buka hasil kompresi pada ukuran 100 persen dan periksa mata, tepi wajah, serta teks pada papan nama bila ada. Lihat juga latar belakang: kompresi berlebihan sering meninggalkan noda di area polos. Setelah itu, coba unggah di desktop dan ponsel, karena sebagian portal berperilaku berbeda di keduanya.",
          "Penyebab penolakan biasanya bisa ditebak:",
          "Jika semua sudah benar tetapi unggahan tetap gagal, coba nama file yang lebih sederhana dan koneksi yang stabil sebelum menyimpulkan ada masalah pada fotonya.",
        ],
        bullets: [
          "Ukuran file masih di atas batas karena formulir menghitung kilobyte desimal, bukan biner.",
          "Dimensi piksel di luar rentang yang diterima, terlalu kecil maupun terlalu besar.",
          "Format tidak cocok, misalnya PNG padahal portal meminta JPG.",
          "Rasio berbeda dari ketentuan sehingga portal memotong sendiri.",
          "Wajah terlalu kecil, latar belakang ramai, atau pencahayaan tidak merata.",
          "Gambar berasal dari aplikasi yang menambahkan lapisan proteksi.",
        ],
      },
    ],
    en: [
      {
        heading: "Start with the portal requirements, not the photo",
        paragraphs: [
          "Before you touch the image, open the registration page and find the photo upload section. Four numbers usually decide everything: the minimum or maximum pixel dimensions, the maximum file size in KB, the accepted formats, and the required ratio or face proportion. Some portals also specify background colour, clothing, and how the file should be named.",
          "Write all of it down in one place. If the instructions only say “maximum 200 KB”, keep looking for a dimension limit. A 200 KB photo only 200 pixels wide uploads fine and still looks soft on a participant card.",
          "One detail is easy to miss: requirements can differ between the first upload and a later verification step. Keep the latest instructions so you do not resend a photo that matched the old rules.",
        ],
      },
      {
        heading: "3×4 and 4×6: pick the ratio the form asks for",
        paragraphs: [
          "These are the two most common ratios in Indonesia. 3×4 means a width-to-height ratio of 3:4, while 4×6 is 2:3 and leaves more room around the face. If the form names one of them, do not guess. Portals often crop automatically, and an unexpected ratio can slice off a chin or a forehead.",
          "Use a cropper with the ratio locked, then move the selection so the face sits in the middle and the top of the head is still visible. Leave some space above the head instead of pressing it against the edge. For a head-and-shoulders portrait, the crop usually ends below the shoulder.",
          "Do not upload straight after cropping. Check whether the result still looks balanced at thumbnail size, because portal previews are often no bigger than a postage stamp.",
        ],
      },
      {
        heading: "Set the pixel size, not just the file size",
        paragraphs: [
          "The KB limit and the pixel dimensions are two separate requirements, and either one can block an upload. A portal that asks for 300×400 pixels will reject a 1200×1600 photo even if it is only 80 KB. The reverse is also true: a 300×400 image padded out to 2 MB still looks coarse; the detail was never there.",
          "As a reference, a 3×4 cm print at 300 dpi is roughly 354×472 pixels, and 4×6 cm about 472×709 pixels. Many forms use round numbers such as 300×400 or 600×900; follow what they ask for, not the theoretical calculation.",
          "If the original is much larger than needed, reduce the resolution to the requested figure first and adjust quality afterwards. That is safer than pushing quality to its lowest setting at full resolution.",
        ],
      },
      {
        heading: "Chasing the KB limit the right way",
        paragraphs: [
          "Target size mode tries several quality and resolution combinations, then keeps the largest result that still fits under the limit. Enter the number exactly as stated, such as 100 KB or 200 KB, and let the tool find the highest quality that fits.",
          "For a portrait, 50–200 KB is usually sharp enough on screen and in a small print. If the target is very tight, lower the resolution before lowering quality. A slightly soft face is better than a face covered in JPEG blocks.",
          "Format matters too. JPG is the safest choice for portals, while WebP produces a smaller file at similar quality but is not always accepted. If the form only takes JPG, do not force another format to save a few kilobytes.",
        ],
      },
      {
        heading: "Avoid upscaling, and keep a backup",
        paragraphs: [
          "Enlarging a 300×400 photo to 900×1200 does not add detail. It only interpolates, and the result looks softer. If the portal asks for a large dimension, start from a high-resolution original, not a compressed version.",
          "Always keep the original file in a separate folder. Every edit produces a new file, and EXIF metadata such as camera information and location is removed when an image is re-encoded. For a registration photo, that loss of metadata helps privacy, but keep the original for other uses.",
          "Give the file a clear name, such as application-photo-3x4.jpg, with no double spaces or odd characters. Some older systems reject names with brackets or symbols.",
        ],
      },
      {
        heading: "Check the result, and know why uploads fail",
        paragraphs: [
          "Open the compressed file at 100 percent and inspect the eyes, the edge of the face, and any text on a name tag. Look at the background as well: heavy compression often leaves blotches in flat areas. Then try uploading on both desktop and phone; some portals behave differently.",
          "The usual reasons for rejection are predictable:",
          "If everything checks out and the upload still fails, try a simpler file name and a stable connection before blaming the photo.",
        ],
        bullets: [
          "The file is still over the limit because the form counts decimal kilobytes.",
          "Pixel dimensions fall outside the accepted range.",
          "The format does not match, for example a PNG when the form expects JPG.",
          "The ratio differs from the requirement, so the portal crops on its own.",
          "The face is too small, the background is busy, or the lighting is uneven.",
          "The image came from an app that added protection.",
        ],
      },
    ],
  },
  conclusion: {
    id: [
      "Foto yang lolos biasanya bukan yang paling canggih, melainkan yang paling patuh pada petunjuk. Baca angka yang diminta, potong pada rasio yang benar, tentukan piksel, lalu capai batas KB lewat target ukuran. Dengan urutan itu, kamu menghindari siklus kompres, unggah, ditolak yang melelahkan.",
      "Semua langkah di atas bisa dilakukan di browser, termasuk memotong, mengubah ukuran, dan mengecilkan file. Gambar tetap berada di perangkatmu, jadi foto pribadi tidak perlu dikirim ke server mana pun.",
    ],
    en: [
      "A photo that gets through is rarely the most sophisticated one. It is the one that follows the instructions: read the numbers, crop to the right ratio, set the pixels, then reach the KB limit with a size target. That order saves you the exhausting compress, upload, reject loop.",
      "All of these steps can be done in a browser, including cropping, resizing, and reducing the file. The image stays on your device, so a personal portrait never has to be sent to a server.",
    ],
  },
};
