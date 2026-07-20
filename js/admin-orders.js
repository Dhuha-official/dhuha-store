// ======================================
// DHUHA ADMIN ORDERS
// ======================================

let orders = [];

document.addEventListener("DOMContentLoaded", () => {

    loadOrders();

});

function loadOrders() {

    orders = JSON.parse(localStorage.getItem("orders")) || [];

    renderOrders(orders);

}

function renderOrders(list) {

    const table = document.getElementById("orders-table");

    if (!table) return;

    table.innerHTML = "";

    if (list.length === 0) {

        table.innerHTML = `
        <tr>
            <td colspan="6" style="text-align:center">
                Belum ada pesanan
            </td>
        </tr>
        `;

        return;

    }

    list.forEach((order, index) => {

        table.innerHTML += `

<tr>

<td>${order.orderNumber}</td>

<td>${order.customer.name}</td>

<td>${order.createdAt}</td>

<td>Rp ${Number(order.total).toLocaleString("id-ID")}</td>

<td>

<select
class="order-status"
data-index="${index}">

<option value="Menunggu Pembayaran" ${order.status==="Menunggu Pembayaran"?"selected":""}>
Menunggu Pembayaran
</option>

<option value="Menunggu Verifikasi" ${order.status==="Menunggu Verifikasi"?"selected":""}>
Menunggu Verifikasi
</option>

<option value="Diproses" ${order.status==="Diproses"?"selected":""}>
Diproses
</option>

<option value="Dikirim" ${order.status==="Dikirim"?"selected":""}>
Dikirim
</option>

<option value="Selesai" ${order.status==="Selesai"?"selected":""}>
Selesai
</option>

<option value="Dibatalkan" ${order.status==="Dibatalkan"?"selected":""}>
Dibatalkan
</option>

</select>

</td>

<td>

<button
class="btn"
onclick="showOrder(${index})">

Detail

</button>

</td>

</tr>

`;

    });

}

// ==========================
// DETAIL
// ==========================

function showOrder(index){

const order=orders[index];

let items="";

order.items.forEach(item=>{

items+=`

${item.name}

(${item.qty}x)

${item.size ? " | "+item.size : ""}

${item.color ? " | "+item.color : ""}

\n`;

});

alert(

`Nomor :

${order.orderNumber}

-------------------------

Pelanggan :

${order.customer.name}

WA :

${order.customer.phone}

-------------------------

Alamat :

${order.customer.address}

${order.customer.city}

${order.customer.province}

${order.customer.postcode}

-------------------------

Produk :

${items}

-------------------------

Kurir :

${order.courier}

Pembayaran :

${order.payment}

-------------------------

Total :

Rp ${Number(order.total).toLocaleString("id-ID")}

`);

}

// ==========================
// SEARCH
// ==========================

const search=document.getElementById("search-order");

if(search){

search.addEventListener("keyup",()=>{

const key=search.value.toLowerCase();

renderOrders(

orders.filter(item=>

item.id.toLowerCase().includes(key)

||

item.customer.name.toLowerCase().includes(key)

)

);

});

}

// ==========================
// FILTER
// ==========================

const filter=document.getElementById("filter-status");

if(filter){

filter.addEventListener("change",()=>{

if(filter.value==="Semua"){

renderOrders(orders);

return;

}

renderOrders(

orders.filter(item=>item.status===filter.value)

);

});

}

// ==========================
// UPDATE STATUS
// ==========================

document.addEventListener("change",(e)=>{

if(!e.target.classList.contains("order-status")) return;

const index=e.target.dataset.index;

orders[index].status=e.target.value;

localStorage.setItem(

"orders",

JSON.stringify(orders)

);

alert("Status pesanan berhasil diperbarui.");

});
