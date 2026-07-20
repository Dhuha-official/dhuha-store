// ==========================
// AMBIL DATA PESANAN
// ==========================

const order = JSON.parse(localStorage.getItem("order"));

if (!order) {
    window.location.href = "checkout.html";
}

// ==========================
// NOMOR PESANAN
// ==========================

const orderNumber =
"DH" + Date.now().toString().slice(-10);

localStorage.setItem("orderNumber", orderNumber);

document.getElementById("order-number").textContent =
orderNumber;

// ==========================
// DAFTAR PRODUK
// ==========================

const list = document.getElementById("payment-list");

order.items.forEach(item => {

    const qty = item.qty || 1;

    const total = qty * item.price;

    list.innerHTML += `
    <div class="payment-item">

        <div>

            <strong>${item.name}</strong><br>

            <small>${qty} x Rp ${item.price.toLocaleString("id-ID")}</small>

        </div>

        <strong>

            Rp ${total.toLocaleString("id-ID")}

        </strong>

    </div>
    `;

});

// ==========================
// TOTAL
// ==========================

document.getElementById("payment-subtotal").textContent =
"Rp " + order.subtotal.toLocaleString("id-ID");

document.getElementById("payment-shipping").textContent =
"Rp " + order.shipping.toLocaleString("id-ID");

document.getElementById("payment-total").textContent =
"Rp " + order.total.toLocaleString("id-ID");

// ==========================
// METODE PEMBAYARAN
// ==========================

document.getElementById("payment-method").textContent =
order.payment;

const info = document.getElementById("payment-info");

if (order.payment === "QRIS") {

    info.innerHTML = `
    <p>Silakan scan QRIS berikut untuk melakukan pembayaran.</p>

    <img src="images/qris.png" alt="QRIS">

    <p><b>Status:</b> Menunggu Pembayaran</p>
    `;

} else {

    info.innerHTML = `
    <p>Transfer ke rekening berikut:</p>

    <p>
    <b>BCA</b><br>
    1234567890<br>
    a.n. DHUHA
    </p>

    <p><b>Status:</b> Menunggu Pembayaran</p>
    `;

}

// ==========================
// SUDAH BAYAR
// ==========================

document.getElementById("paidBtn").onclick = () => {

    window.location.href = "success.html";

};
<div class="upload-proof">

<h3>Upload Bukti Pembayaran</h3>

<input
type="file"
id="paymentProof"
accept="image/*">

<button id="uploadBtn">

Upload Bukti

</button>

</div>
const uploadBtn =
document.getElementById("uploadBtn");

if(uploadBtn){

uploadBtn.onclick=()=>{

const file =
document.getElementById("paymentProof").files[0];

if(!file){

alert("Silakan pilih bukti pembayaran.");

return;

}

alert("Bukti pembayaran berhasil diupload.");

window.location.href="success.html";

}

}
