Fadhil Bahana Megantara
124140208
RB

# Mini POS - Kasir & Keranjang Belanja

## Deskripsi

Mini POS adalah aplikasi web sederhana yang digunakan untuk membantu proses
kasir pada kantin atau toko kampus.

Aplikasi ini memiliki fitur validasi input barang, perhitungan subtotal,
perhitungan total belanja, diskon otomatis, pembayaran dan kembalian,
serta penyimpanan keranjang menggunakan localStorage.

## Fitur

1. Validasi nama barang minimal 3 karakter.
2. Validasi harga minimal Rp 500.
3. Validasi jumlah barang minimal 1 dan harus berupa bilangan bulat.
4. Menambahkan barang ke keranjang.
5. Menghitung subtotal secara otomatis.
6. Menghitung total belanja secara otomatis.
7. Diskon 10% jika total belanja minimal Rp 50.000.
8. Menghitung uang pembayaran.
9. Menghitung kembalian secara otomatis.
10. Menampilkan pesan jika uang pembayaran kurang.
11. Menghapus barang dari keranjang.
12. Menyimpan data keranjang menggunakan localStorage.
13. Memuat kembali data setelah halaman di-refresh.
14. Menghapus seluruh data melalui tombol Transaksi Baru.

## Teknologi

- HTML
- CSS
- JavaScript
- localStorage
- JSON.stringify()
- JSON.parse()

## Struktur File

mini-pos/
│
├── index.html
├── style.css
├── script.js
└── README.md

## Cara Menjalankan

1. Buat folder bernama `mini-pos`.
2. Masukkan file `index.html`, `style.css`, `script.js`, dan `README.md`.
3. Buka file `index.html menggunakan browser.
4. Masukkan data barang.
5. Klik tombol "Tambah ke Keranjang".
6. Barang akan masuk ke tabel keranjang.
7. Data tetap tersimpan walaupun halaman di-refresh.

## Aturan Diskon

Jika total belanja mencapai Rp 50.000 atau lebih,
maka pelanggan mendapatkan diskon sebesar 10%.

Contoh:

Total Belanja = Rp 100.000

Diskon = 10% × Rp 100.000
        = Rp 10.000

Total Akhir = Rp 90.000

## Perhitungan Kembalian

Kembalian dihitung menggunakan rumus:

Kembalian = Uang Bayar - Total Akhir

Jika uang bayar lebih kecil dari total akhir,
sistem akan menampilkan bahwa uang belum mencukupi.