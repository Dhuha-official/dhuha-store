// ===============================
// DHUHA ADMIN DASHBOARD
// ===============================

let products = [];

async function loadDashboard(){

try{

const response = await fetch("../data/products.json");

products = await response.json();

dashboardCard();

latestProducts();

}catch(error){

console.log(error);

}

}

document.addEventListener("DOMContentLoaded",()=>{

loadDashboard();

});
// ===============================
// DASHBOARD CARD
// ===============================

function dashboardCard(){

document.getElementById("total-products").textContent = products.length;

document.getElementById("total-orders").textContent = 0;

document.getElementById("total-customers").textContent = 0;

let total = products.reduce((sum,item)=>sum+Number(item.price),0);

document.getElementById("total-income").textContent =

"Rp "+total.toLocaleString("id-ID");

}
// ===============================
// LATEST PRODUCT
// ===============================

function latestProducts(){

const latest = document.getElementById("latest-products");

latest.innerHTML = "";

products.slice(0,5).forEach(product=>{

latest.innerHTML += `

<div class="latest-item">

<img src="../${product.image}" class="latest-image">

<div class="latest-info">

<h4>${product.name}</h4>

<p>${product.category}</p>

<span>

Rp ${Number(product.price).toLocaleString("id-ID")}

</span>

</div>

</div>

`;

});

}
// ===============================
// DUMMY ORDER
// ===============================

const orderTable = document.getElementById("latest-orders");

if(orderTable){

orderTable.innerHTML=`

<tr>

<td>#1001</td>

<td>Kevin Andrean</td>

<td>Rp 249.000</td>

<td>

<span class="status process">

Diproses

</span>

</td>

</tr>

<tr>

<td>#1002</td>

<td>Teuku Rizki</td>

<td>Rp 149.000</td>

<td>

<span class="status success">

Selesai

</span>

</td>

</tr>

`;

}
