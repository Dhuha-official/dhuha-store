const list=document.getElementById("orders-list");

let orders=JSON.parse(localStorage.getItem("orders"))||[];

if(orders.length===0){

list.innerHTML=`

<div class="empty">

<h2>Belum ada pesanan</h2>

<p>Pesanan yang dibuat akan muncul di sini.</p>

<a href="shop.html" class="shop-btn">

Belanja Sekarang

</a>

</div>

`;

}else{

orders.forEach(order=>{

list.innerHTML+=`

<div class="order-card">

<div class="top">

<b>${order.id}</b>

<span>${order.status}</span>

</div>

<p>${order.createdAt}</p>

<p>

${order.items.length} Produk

</p>

<h3>

Rp ${Number(order.total).toLocaleString("id-ID")}

</h3>

<a href="payment.html">

Lihat Detail

</a>

</div>

`;

});

}
