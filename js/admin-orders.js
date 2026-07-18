// ======================================
// DHUHA ADMIN ORDERS
// ======================================

let orders=[];

document.addEventListener("DOMContentLoaded",()=>{

loadOrders();

});
async function loadOrders(){

orders=[

{

id:"#DH1001",

customer:"Kevin Andrean",

date:"19 Jul 2026",

total:249000,

status:"Diproses"

},

{

id:"#DH1002",

customer:"Teuku Rizki",

date:"19 Jul 2026",

total:149000,

status:"Menunggu"

},

{

id:"#DH1003",

customer:"Ahmad",

date:"18 Jul 2026",

total:398000,

status:"Selesai"

}

];

renderOrders(orders);

}
function renderOrders(list){

const table=document.getElementById("orders-table");

table.innerHTML="";

list.forEach(order=>{

table.innerHTML+=`

<tr>

<td>${order.id}</td>

<td>${order.customer}</td>

<td>${order.date}</td>

<td>Rp ${order.total.toLocaleString("id-ID")}</td>

<td>

<select class="order-status">

<option ${order.status==="Menunggu"?"selected":""}>Menunggu</option>

<option ${order.status==="Diproses"?"selected":""}>Diproses</option>

<option ${order.status==="Dikirim"?"selected":""}>Dikirim</option>

<option ${order.status==="Selesai"?"selected":""}>Selesai</option>

<option ${order.status==="Dibatalkan"?"selected":""}>Dibatalkan</option>

</select>

</td>

<td>

<button class="btn">

Detail

</button>

</td>

</tr>

`;

});

}
const search=document.getElementById("search-order");

if(search){

search.addEventListener("keyup",()=>{

const keyword=search.value.toLowerCase();

const result=orders.filter(item=>

item.id.toLowerCase().includes(keyword)

||

item.customer.toLowerCase().includes(keyword)

);

renderOrders(result);

});

}
const filter=document.getElementById("filter-status");

if(filter){

filter.addEventListener("change",()=>{

if(filter.value==="Semua"){

renderOrders(orders);

return;

}

const result=orders.filter(item=>

item.status===filter.value

);

renderOrders(result);

});

}
document.addEventListener("change",(e)=>{

if(e.target.classList.contains("order-status")){

alert("Status pesanan berhasil diperbarui.");

}

});
