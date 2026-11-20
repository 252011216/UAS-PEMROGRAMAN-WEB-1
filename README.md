# Proyek UAS Pemrograman Web 1: Kopi Nusantara Roastery & Community

Proyek website komprehensif yang dirancang untuk memenuhi kriteria Ujian Akhir Semester (UAS) mata kuliah **Pemrograman Web 1**.

Website ini mengintegrasikan seluruh tema yang dipersyaratkan (**Penjualan Online, Web Profile, Pemasaran/Promosi, Forum/Komunitas**) ke dalam satu brand nyata yang otentik: **Kopi Nusantara Roastery**, yaitu roastery kopi specialty artisan dan ruang komunitas barista terbesar di Indonesia.

---

## 🌟 Pemenuhan Kriteria Persyaratan Tugas

| Kriteria Persyaratan | Status | Implementasi pada Proyek |
| :--- | :---: | :--- |
| **Tema Komprehensif** | ✅ Terpenuhi | Mengintegrasikan **Penjualan Online** (Katalog & Transaksi), **Web Profile** (Sejarah, Visi Misi, Tim & Fasilitas), **Pemasaran/Promosi** (Hero Banner Promo, Kupon Diskon, Flash Sale Bundling), dan **Forum/Komunitas** (Diskusi Resep Seduh, Agenda Cupping). |
| **Konten Otentik (Bebas Dummy/Lorem)** | ✅ Terpenuhi | 100% teks menggunakan bahasa Indonesia naratif dan profesional. Tidak ada satupun teks *Lorem Ipsum*. Informasi nama kopi, tasting notes, elevasi kebun, profil roaster, artikel, hingga ulasan pelanggan ditulis secara nyata. |
| **Bebas Gambar Dummy** | ✅ Terpenuhi | Tidak menggunakan gambar placeholder kosong. Seluruh gambar menggunakan fotografi resolusi tinggi bertema kopi artisan, roastery, manual brew, dan potret profesional asli. |
| **Minimal 4 File HTML Saling Terkait** | ✅ Terpenuhi (5 Halaman) | Terdiri dari 5 file HTML lengkap yang dapat saling diakses melalui Navbar dan tautan di halaman utama: <br>1. `index.html` (Beranda & Promosi)<br>2. `profil.html` (Web Profile Perusahaan)<br>3. `produk.html` (Penjualan Online & Filter)<br>4. `forum.html` (Forum & Komunitas)<br>5. `transaksi.html` (Formulir Transaksi, Membership & Feedback) |
| **Memuat Formulir Lengkap** | ✅ Terpenuhi | Terdapat di `transaksi.html` yang memuat:<br>• **Formulir Transaksi & Pemesanan Produk** (Perhitungan subtotal & ongkir otomatis, voucher diskon, invoice modal)<br>• **Formulir Registrasi Member VIP Komunitas**<br>• **Formulir Umpan Balik / Review Pelanggan**<br>• Didukung validasi formulir (HTML5 & JS) |
| **Komponen Carousel** | ✅ Terpenuhi | • `index.html`: Hero Carousel 3 slide promosi dengan animasi fade & caption interaktif.<br>• `profil.html`: Carousel galeri fasilitas roastery, sensory bar, dan ruang cupping. |
| **Komponen Card** | ✅ Terpenuhi | • Card produk kopi specialty dengan badge promo & harga.<br>• Card tim ahli & barista roastery.<br>• Card thread diskusi forum komunitas.<br>• Card testimoni pelanggan & kotak nilai tambah. |
| **Komponen Nav Menu & Responsif** | ✅ Terpenuhi | Navbar sticky modern dengan logo brand, menu navigasi dengan indikator halaman aktif, tombol call-to-action pemesanan, hamburger toggler untuk layar HP/tablet, dan layout responsif grid Bootstrap 5. |

---

## 📁 Struktur Berkas Proyek

```text
UAS-PEMROGRAMAN-WEB-1/
├── index.html          # Halaman Beranda Utama, Promosi Festival Kopi & Cuplikan Profil
├── profil.html         # Web Profile: Sejarah, Visi-Misi, Fasilitas Roastery & Tim Ahli
├── produk.html         # Penjualan Online: Katalog 8 Produk, Filter Kategori & Pencarian
├── forum.html          # Forum & Komunitas: Thread Diskusi Seduh, Agenda & Modal Posting Baru
├── transaksi.html      # Formulir: Pemesanan Produk, Membership VIP & Umpan Balik Layanan
├── web.html            # File Pengalihan Cepat (Redirect) otomatis ke index.html
├── assets/
│   ├── css/
│   │   └── style.css   # Desain Kustom: Palet Coffee/Crema, Font, Bayangan & Responsive Rules
│   └── js/
│       └── script.js   # Logika JS: Filter Produk, Pencarian, Kalkulasi Biaya, Validasi & Forum
└── README.md           # Panduan dan Dokumentasi Proyek UAS
```

---

## 🚀 Fitur Unggulan & Interaktivitas

### 1. Pemasaran & Promosi (`index.html`)
- **Top Announcement Bar**: Pengumuman promo kupon diskon festival kopi.
- **Hero Carousel**: 3 slide visual dinamis yang mengiklankan festival kopi, varian specialty Gayo Wine, dan forum komunitas.
- **Flash Sale Banner**: Highlight paket bundling barista lengkap dengan harga promo dan hitungan stok.
- **Best Seller Cards**: Card biji kopi terlaris dengan catatan rasa (*tasting notes*) dan tombol beli cepat.

### 2. Web Profile Roastery (`profil.html`)
- **Sejarah & Narasi Otentik**: Perjalanan roastery sejak 2018 dalam mengangkat kopi nusantara melalui kemitraan langsung dengan petani lokal (*direct trade*).
- **Visi & Misi Card**: Nilai-nilai keberlanjutan dan standar mutu SCA di atas 84 poin.
- **Galeri Fasilitas Carousel**: Menampilkan mesin roaster artisan, ruang cupping lab sensory, dan manual brew bar.
- **Kartu Profil Tim Ahli**: Profil Head Roaster (Q-Grader SCA), Head Barista Juara Indonesia Brewers Cup, dan Direktur Kemitraan Agronomi.
- **Peta Lokasi Interaktif**: Lokasi fisik workshop di Jl. Malioboro, Yogyakarta.

### 3. Toko & Katalog Penjualan Online (`produk.html`)
- **Filter Kategori Dinamis**: Mengelompokkan produk berdasarkan *Semua*, *Arabika Specialty*, *Robusta Premium*, *Alat Seduh*, dan *Paket Bundling*.
- **Pencarian Real-Time**: Kolom pencarian responsif berdasarkan nama kopi maupun *tasting notes*.
- **Panduan Gilingan Kopi (*Grind Size Guide*)**: Edukasi pemilihan gilingan biji utuh, kasar, sedang, dan halus.
- **Integrasi URL Param**: Tombol "Pesan" langsung memilih produk secara otomatis di halaman `transaksi.html`.

### 4. Forum & Komunitas Pecinta Kopi (`forum.html`)
- **Statistik Komunitas**: 12.450+ member terdaftar di 45 kota.
- **Thread Diskusi Interaktif**: Kartu diskusi seputar rasio V60, kalibrasi espresso, waktu degassing roasting, dan TDS air mineral.
- **Tombol Like / Upvote Real-Time**: Pengunjung dapat memberikan apresiasi suka (*like counter* bertambah secara interaktif).
- **Formulir Topik Baru (Modal Pop-Up)**: Fitur membuat diskusi baru langsung muncul pada beranda forum secara instan tanpa reload halaman!

### 5. Formulir Pemesanan & Transaksi (`transaksi.html`)
- **Formulir Pemesanan Lengkap**:
  - Validasi HTML5 & JavaScript pada nama, nomor HP WhatsApp, email, kode pos, dan alamat.
  - Pilihan varian gilingan (*grind size*) gratis.
  - Pilihan opsi kurir ekspedisi (JNE, SiCepat, J&T, GoSend, Ambil di Toko).
  - Pilihan metode pembayaran (BCA, Mandiri, BNI, QRIS, COD).
- **Kalkulasi Biaya Otomatis**:
  - Mengkalkulasi subtotal secara dinamis saat produk, jumlah, atau kurir diubah.
  - Fitur Kupon Promo:
    - Masukkan `DISKON30` -> Mendapatkan potongan 30%.
    - Masukkan `KOPIHEBAT` -> Mendapatkan potongan 15%.
    - Masukkan `GRATISONGKIR` -> Ongkos kirim menjadi Rp 0.
- **Struk / Faktur Digital (Invoice Modal)**:
  - Setelah form disubmit dengan valid, sistem memunculkan Faktur Pembelian resmi berisikan nomor invoice acak, rincian biaya, alamat tujuan, dan tombol cetak bukti transfer (`Print`).
- **Formulir Registrasi Member VIP**:
  - Pendaftaran member gratis dengan penerbitan kartu nomor anggota virtual (contoh: `KN-VIP-7492`).
- **Formulir Umpan Balik Pelanggan**:
  - Evaluasi tingkat kepuasan dan saran perbaikan roastery.

---

## 💻 Teknologi & Pustaka yang Digunakan

1. **HTML5**: Semantik standar (`header`, `nav`, `section`, `article`, `footer`, `aside`, `form`).
2. **CSS3**: Layout grid, flexbox, kustomisasi palet warna kopi, efek hover, dan transisi halus.
3. **Bootstrap 5.3.3**: Library UI untuk Grid responsif, Navbar, Carousel, Cards, Form controls, Tabs, Modals, dan Badges.
4. **Font Awesome 6.5.2**: Ikon modern untuk visual kopi, belanja, pengguna, centang, dan navigasi.
5. **Google Fonts**: Tipografi elegan *Playfair Display* untuk judul dan *Plus Jakarta Sans* untuk teks isi.
6. **Vanilla JavaScript**: Logika filter pencarian, kalkulasi harga, aktivasi modal, validasi formulir, dan interaksi forum.

---

## 🖥️ Cara Membuka & Menjalankan Proyek

1. Buka folder proyek di file explorer:
   `C:\Users\LAB\Documents\uas\UAS-PEMROGRAMAN-WEB-1`
2. Klik ganda pada berkas **`index.html`** (atau `web.html`) menggunakan peramban web modern apa saja (Google Chrome, Microsoft Edge, Mozilla Firefox, dll).
3. Anda dapat menjelajahi seluruh menu navigasi, mencoba filter produk di katalog, memposting topik di forum, dan mengisi formulir pemesanan transaksi untuk melihat bukti faktur belanja!
