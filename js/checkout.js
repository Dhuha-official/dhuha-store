// ==========================
// KODE POS (HANYA ANGKA)
// ==========================

const postcode = document.getElementById("postcode");

if(postcode){

postcode.addEventListener("input", function(){

this.value = this.value.replace(/\D/g,"");

});

}

// ==========================
// DATA CART
// ==========================

const cart = JSON.parse(localStorage.getItem("cart")) || [];

const checkoutList = document.getElementById("checkout-list");
const subtotalElement = document.getElementById("subtotal");
const shippingCostElement = document.getElementById("shippingCost");
const shippingTotalElement = document.getElementById("shippingTotal");
const shippingEstimateElement = document.getElementById("shippingEstimate");
const totalElement = document.getElementById("checkout-total");

let subtotal = 0;

// ==========================
// TAMPILKAN PRODUK
// ==========================

function renderCheckout(){

if(!checkoutList) return;

checkoutList.innerHTML = "";

subtotal = 0;

cart.forEach(item=>{

const qty = item.qty || 1;

const total = item.price * qty;

subtotal += total;

checkoutList.innerHTML += `

<div class="checkout-item">

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

subtotalElement.innerHTML =
"Rp " + subtotal.toLocaleString("id-ID");

updateShipping();

}

// ==========================
// ONGKIR
// ==========================

function updateShipping(){

const courier = document.querySelector("input[name='shipping']:checked").value;

let cost = 0;
let estimate = "-";

switch(courier){

case "JNE":
cost = 18000;
estimate = "2-4 Hari";
break;

case "J&T":
cost = 20000;
estimate = "1-3 Hari";
break;

case "SiCepat":
cost = 17000;
estimate = "2-3 Hari";
break;

}

shippingCostElement.innerHTML =
"Rp " + cost.toLocaleString("id-ID");

shippingTotalElement.innerHTML =
"Rp " + cost.toLocaleString("id-ID");

shippingEstimateElement.innerHTML =
estimate;

totalElement.innerHTML =
"Rp " + (subtotal + cost).toLocaleString("id-ID");

}

document.querySelectorAll("input[name='shipping']")
.forEach(item=>{

item.addEventListener("change", updateShipping);

});

// ==========================
// LOAD
// ==========================

renderCheckout();
