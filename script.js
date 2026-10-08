// Mengambil data keranjang dari localStorage
let keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];


// Format angka menjadi Rupiah
function formatRupiah(angka) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
    }).format(angka);
}


// Menyimpan keranjang ke localStorage
function simpanKeranjang() {
    localStorage.setItem("keranjang", JSON.stringify(keranjang));
}


// Menampilkan isi keranjang
function tampilkanKeranjang() {

    const tabel = document.getElementById("tabelKeranjang");
    const keranjangKosong = document.getElementById("keranjangKosong");
    const jumlahItem = document.getElementById("jumlahItem");

    tabel.innerHTML = "";

    if (keranjang.length === 0) {

        keranjangKosong.style.display = "block";
        jumlahItem.textContent = "0 Item";

    } else {

        keranjangKosong.style.display = "none";

        let totalQty = 0;

        keranjang.forEach((barang, index) => {

            const subtotal = barang.harga * barang.qty;

            totalQty += barang.qty;

            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${index + 1}</td>

                <td>${barang.nama}</td>

                <td>${formatRupiah(barang.harga)}</td>

                <td>${barang.qty}</td>

                <td>${formatRupiah(subtotal)}</td>

                <td>
                    <button
                        class="btn-hapus"
                        onclick="hapusBarang(${index})"
                    >
                        Hapus
                    </button>
                </td>
            `;

            tabel.appendChild(row);
        });

        jumlahItem.textContent = `${totalQty} Item`;
    }

    hitungTotal();
}


// Validasi dan tambah barang
document.getElementById("formBarang").addEventListener("submit", function(event) {

    event.preventDefault();

    const nama = document.getElementById("namaBarang").value.trim();
    const harga = Number(document.getElementById("hargaBarang").value);
    const qty = Number(document.getElementById("qtyBarang").value);

    const errorNama = document.getElementById("errorNama");
    const errorHarga = document.getElementById("errorHarga");
    const errorQty = document.getElementById("errorQty");

    errorNama.textContent = "";
    errorHarga.textContent = "";
    errorQty.textContent = "";

    let valid = true;


    // Validasi nama
    if (nama === "") {

        errorNama.textContent = "Nama barang wajib diisi.";
        valid = false;

    } else if (nama.length < 3) {

        errorNama.textContent = "Nama barang minimal 3 karakter.";
        valid = false;
    }


    // Validasi harga
    if (
        document.getElementById("hargaBarang").value === ""
    ) {

        errorHarga.textContent = "Harga wajib diisi.";
        valid = false;

    } else if (harga < 500) {

        errorHarga.textContent = "Harga minimal Rp 500.";
        valid = false;
    }


    // Validasi qty
    if (
        document.getElementById("qtyBarang").value === ""
    ) {

        errorQty.textContent = "Jumlah wajib diisi.";
        valid = false;

    } else if (!Number.isInteger(qty) || qty < 1) {

        errorQty.textContent = "Qty harus berupa angka bulat minimal 1.";
        valid = false;
    }


    // Jika valid
    if (valid) {

        const barangBaru = {
            nama: nama,
            harga: harga,
            qty: qty
        };

        keranjang.push(barangBaru);

        simpanKeranjang();

        tampilkanKeranjang();

        // Reset form
        document.getElementById("formBarang").reset();
    }

});


// Menghapus barang
function hapusBarang(index) {

    keranjang.splice(index, 1);

    simpanKeranjang();

    tampilkanKeranjang();

    // Update pembayaran setelah item dihapus
    hitungKembalian();
}


// Menghitung total belanja dan diskon
function hitungTotal() {

    let totalBelanja = 0;

    keranjang.forEach(barang => {

        totalBelanja += barang.harga * barang.qty;

    });


    // Diskon 10% jika total minimal Rp 50.000
    let diskon = 0;

    if (totalBelanja >= 50000) {
        diskon = totalBelanja * 0.10;
    }


    const totalAkhir = totalBelanja - diskon;


    document.getElementById("totalBelanja").textContent =
        formatRupiah(totalBelanja);

    document.getElementById("diskon").textContent =
        formatRupiah(diskon);

    document.getElementById("totalAkhir").textContent =
        formatRupiah(totalAkhir);


    hitungKembalian();
}


// Menghitung kembalian
document.getElementById("uangBayar").addEventListener("input", function() {

    hitungKembalian();

});


function hitungKembalian() {

    let totalBelanja = 0;

    keranjang.forEach(barang => {

        totalBelanja += barang.harga * barang.qty;

    });


    let diskon = 0;

    if (totalBelanja >= 50000) {
        diskon = totalBelanja * 0.10;
    }


    const totalAkhir = totalBelanja - diskon;

    const uangBayar =
        Number(document.getElementById("uangBayar").value) || 0;

    const kembalian =
        uangBayar - totalAkhir;

    const status =
        document.getElementById("statusPembayaran");

    const hasilKembalian =
        document.getElementById("kembalian");


    if (keranjang.length === 0) {

        status.textContent = "Keranjang masih kosong.";
        status.className = "payment-status warning";

        hasilKembalian.textContent = formatRupiah(0);

    } else if (uangBayar === 0) {

        status.textContent = "Masukkan nominal pembayaran.";
        status.className = "payment-status warning";

        hasilKembalian.textContent = formatRupiah(0);

    } else if (uangBayar < totalAkhir) {

        status.textContent =
            `Uang kurang ${formatRupiah(totalAkhir - uangBayar)}.`;

        status.className = "payment-status warning";

        hasilKembalian.textContent = formatRupiah(0);

    } else {

        status.textContent = "Pembayaran cukup.";

        status.className = "payment-status success";

        hasilKembalian.textContent =
            formatRupiah(kembalian);
    }
}


// Transaksi baru
document.getElementById("btnReset").addEventListener("click", function() {

    if (keranjang.length === 0) {
        alert("Keranjang sudah kosong.");
        return;
    }

    const konfirmasi = confirm(
        "Apakah Anda yakin ingin memulai transaksi baru?"
    );

    if (konfirmasi) {

        keranjang = [];

        localStorage.removeItem("keranjang");

        document.getElementById("uangBayar").value = "";

        tampilkanKeranjang();
    }

});


// Menampilkan data ketika halaman pertama kali dibuka
tampilkanKeranjang();