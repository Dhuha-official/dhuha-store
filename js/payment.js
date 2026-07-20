// ==========================
// AMBIL ORDER
// ==========================

const order =
JSON.parse(localStorage.getItem("currentOrder"));

if(!order){

window.location.href="checkout.html";

}

// ==========================
// NOMOR ORDER
// ==========================

document.getElementById("order-number").textContent =
order.id;

// ==========================
// LIST PRODUK
// ==========================

const list =
document.getElementById("payment-list");

list.innerHTML="";

order.items.forEach(item=>{

const qty=item.qty||1;

const total=qty*Number(item.price);

list.innerHTML+=`

<div class="payment-item">

<div>

<strong>${item.name}</strong>

<br>

<small>

${qty} x Rp ${Number(item.price).toLocaleString("id-ID")}

${item.size ? "<br>Ukuran : "+item.size : ""}

${item.color ? "<br>Warna : "+item.color : ""}

</small>

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

document.getElementById("payment-subtotal").textContent=

"Rp "+order.subtotal.toLocaleString("id-ID");

document.getElementById("payment-shipping").textContent=

"Rp "+order.shipping.toLocaleString("id-ID");

document.getElementById("payment-total").textContent=

"Rp "+order.total.toLocaleString("id-ID");

// ==========================
// METODE
// ==========================

document.getElementById("payment-method").textContent=
order.payment;

const info=
document.getElementById("payment-info");

if(order.payment==="QRIS"){

info.innerHTML=`

<p>Silakan scan QRIS berikut.</p>

<img src="images/qris.png" alt="QRIS">

<p><b>Status :</b> Menunggu Pembayaran</p>

`;

}else{

info.innerHTML=`

<p>Transfer ke rekening berikut.</p>

<p>

<b>BCA</b>

<br>

1234567890

<br>

a.n DHUHA

</p>

<p>

<b>Status :</b> Menunggu Pembayaran

</p>

`;

}

// ==========================
// UPLOAD BUKTI
// ==========================

const uploadBtn=
document.getElementById("uploadBtn");

if(uploadBtn){

uploadBtn.onclick=()=>{

const file=
document.getElementById("paymentProof").files[0];

if(!file){

alert("Silakan upload bukti pembayaran.");

return;

}

order.status="Menunggu Verifikasi";

localStorage.setItem("currentOrder",JSON.stringify(order));

let orders=
JSON.parse(localStorage.getItem("orders"))||[];

const index=
orders.findIndex(item=>item.id===order.id);

if(index!==-1){

orders[index]=order;

}

localStorage.setItem("orders",JSON.stringify(orders));

localStorage.removeItem("cart");

alert("Bukti pembayaran berhasil diupload.");

window.location.href="success.html";

};

    }
