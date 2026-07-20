// ======================================
// DHUHA PRODUCT
// ======================================

let productData = null;
let allProducts = [];
let qty = 1;

// ======================================
// LOAD PRODUCT
// ======================================

document.addEventListener("DOMContentLoaded", async () => {

    await loadProduct();

    initSize();

    initColor();

    initQty();

    initButtons();

});

// ======================================
// LOAD DATA
// ======================================

async function loadProduct() {

    const params = new URLSearchParams(window.location.search);

    const id = Number(params.get("id"));

    const response = await fetch("data/products.json");

    allProducts = await response.json();

    productData = allProducts.find(item => item.id === id);

    if (!productData) {

        document.body.innerHTML =
        "<h2 style='padding:50px;text-align:center'>Produk tidak ditemukan</h2>";

        return;

    }

    document.getElementById("product-image").src =
    productData.image;

    document.getElementById("product-name").textContent =
    productData.name;

    document.getElementById("product-price").textContent =
    "Rp " +
    Number(productData.price).toLocaleString("id-ID");

    document.getElementById("product-description").textContent =
    productData.description || "";

    renderRelated();

}
// ======================================
// PRODUK TERKAIT
// ======================================

function renderRelated(){

    const related =
    document.getElementById("related-products");

    if(!related) return;

    related.innerHTML="";

    allProducts
    .filter(item=>

        item.category===productData.category &&
        item.id!==productData.id

    )
    .slice(0,4)
    .forEach(item=>{

        related.innerHTML+=`

<div class="product-card">

<div class="product-image">

<img src="${item.image}" alt="${item.name}">

</div>

<div class="product-info">

<h3>${item.name}</h3>

<div class="product-price">

Rp ${Number(item.price).toLocaleString("id-ID")}

</div>

<a href="product.html?id=${item.id}" class="product-btn">

Lihat Produk

</a>

</div>

</div>

`;

    });

}

// ======================================
// PILIH UKURAN
// ======================================

function initSize(){

document.querySelectorAll(".size-list button")
.forEach(button=>{

button.onclick=()=>{

document
.querySelectorAll(".size-list button")
.forEach(btn=>btn.classList.remove("active"));

button.classList.add("active");

};

});

}

// ======================================
// PILIH WARNA
// ======================================

function initColor(){

document.querySelectorAll(".color-btn")
.forEach(button=>{

button.onclick=()=>{

document
.querySelectorAll(".color-btn")
.forEach(btn=>btn.classList.remove("active"));

button.classList.add("active");

};

});

}

// ======================================
// QTY
// ======================================

function initQty(){

const qtyText=document.getElementById("qty");

document.getElementById("plus").onclick=()=>{

qty++;

qtyText.innerText=qty;

};

document.getElementById("minus").onclick=()=>{

if(qty>1){

qty--;

qtyText.innerText=qty;

}

};

}
// ======================================
// GET PILIHAN
// ======================================

function getSelectedSize(){

const active=document.querySelector(".size-list button.active");

return active?active.innerText:"";

}

function getSelectedColor(){

const active=document.querySelector(".color-btn.active");

return active?active.dataset.color:"";

}

// ======================================
// TAMBAH KE KERANJANG
// ======================================

function addToCart(){

const size=getSelectedSize();

const color=getSelectedColor();

let cart=JSON.parse(localStorage.getItem("cart"))||[];

const existing=cart.find(item=>

item.id===productData.id&&
item.size===size&&
item.color===color

);

if(existing){

existing.qty+=qty;

}else{

cart.push({

...productData,

qty:qty,

size:size,

color:color

});

}

localStorage.setItem("cart",JSON.stringify(cart));

if(typeof updateCartBadge==="function"){

updateCartBadge();

}

alert("Produk berhasil ditambahkan ke keranjang.");

}

// ======================================
// WISHLIST
// ======================================

function addToWishlist(){

const size=getSelectedSize();

const color=getSelectedColor();

let wishlist=JSON.parse(localStorage.getItem("wishlist"))||[];

const exist=wishlist.find(item=>

item.id===productData.id&&
item.size===size&&
item.color===color

);

if(exist){

alert("Produk sudah ada di wishlist.");

return;

}

wishlist.push({

...productData,

size:size,

color:color

});

localStorage.setItem("wishlist",JSON.stringify(wishlist));

alert("Produk berhasil ditambahkan ke wishlist.");

}

// ======================================
// BELI SEKARANG
// ======================================

function buyNow(){

const size=getSelectedSize();

const color=getSelectedColor();

localStorage.setItem("buyNow",JSON.stringify([{

...productData,

qty:qty,

size:size,

color:color

}]));

window.location.href="checkout.html";

}

// ======================================
// BUTTON
// ======================================

function initButtons(){

const cart=document.getElementById("add-cart");

if(cart){

cart.onclick=addToCart;

}

const wish=document.getElementById("wishlist-btn");

if(wish){

wish.onclick=addToWishlist;

}

const buy=document.querySelector(".checkout-btn");

if(buy){

buy.onclick=buyNow;

}

    }
