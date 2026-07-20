let productData = null;

async function loadProduct() {

    const params = new URLSearchParams(window.location.search);
    const id = Number(params.get("id"));

    try {

        const response = await fetch("data/products.json");
        const products = await response.json();

        productData = products.find(item => item.id === id);

        if (!productData) {
            document.body.innerHTML = "<h2 style='text-align:center;padding:50px'>Produk tidak ditemukan</h2>";
            return;
        }

        document.getElementById("product-image").src = productData.image;
        document.getElementById("product-name").textContent = productData.name;
        document.getElementById("product-price").textContent =
            "Rp " + Number(productData.price).toLocaleString("id-ID");

        const desc = document.getElementById("product-description");

        const related = document.getElementById("related-products");

if (related) {

    related.innerHTML = "";

    products
        .filter(item => item.category === productData.category && item.id !== productData.id)
        .slice(0, 4)
        .forEach(item => {

            related.innerHTML += `

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

    } catch (err) {
        console.error(err);
    }

}

function addToCart() {
function addToCart() {

    const selectedSize =
        document.querySelector(".size-list .active");

    const selectedColor =
        document.querySelector(".color.active");

    const size =
        selectedSize ? selectedSize.innerText : "";

    const color =
        selectedColor ? selectedColor.dataset.color || selectedColor.title || "" : "";

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(item =>

        item.id === productData.id &&
        item.size === size &&
        item.color === color

    );

    if(existing){

        existing.qty += qty;

    }else{

        cart.push({

            ...productData,

            qty: qty,

            size: size,

            color: color

        });

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    if(typeof updateCartBadge==="function"){

        updateCartBadge();

    }

    alert("Produk berhasil ditambahkan ke keranjang.");

}

loadProduct();

const cartBtn = document.getElementById("add-cart");

if (cartBtn) {
    cartBtn.onclick = addToCart;
}

const wishBtn = document.getElementById("wishlist-btn");

if (wishBtn) {
    wishBtn.onclick = addToWishlist;
}
/* ===========================
   PILIH UKURAN
=========================== */

document.querySelectorAll(".size-list button").forEach(button=>{

    button.onclick=()=>{

        document.querySelectorAll(".size-list button")
        .forEach(btn=>btn.classList.remove("active"));

        button.classList.add("active");

    };

});

/* ===========================
   PILIH WARNA
=========================== */

document.querySelectorAll(".color").forEach(color=>{

    color.onclick=()=>{

        document.querySelectorAll(".color")
        .forEach(c=>c.classList.remove("active"));

        color.classList.add("active");

    };

});

/* ===========================
   QTY
=========================== */

let qty = 1;

const qtyText = document.getElementById("qty");

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

/* ===========================
   BELI SEKARANG
=========================== */

const checkoutBtn = document.querySelector(".checkout-btn");

if(checkoutBtn){

checkoutBtn.onclick = ()=>{

    const selectedSize =
        document.querySelector(".size-list .active");

    const selectedColor =
        document.querySelector(".color.active");

    const size =
        selectedSize ? selectedSize.innerText : "";

    const color =
        selectedColor ? selectedColor.dataset.color || selectedColor.title || "" : "";

    localStorage.setItem("buyNow",JSON.stringify([

        {

            ...productData,

            qty:qty,

            size:size,

            color:color

        }

    ]));

    window.location.href="checkout.html";

};

    }
