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

        if (desc) {
            desc.textContent = productData.description;
        }

    } catch (err) {
        console.error(err);
    }

}

function addToCart() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(item => item.id === productData.id);

    if (existing) {
        existing.qty++;
    } else {
        cart.push({
            ...productData,
            qty: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Produk berhasil ditambahkan ke keranjang.");

}

function addToWishlist() {

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    const existing = wishlist.find(item => item.id === productData.id);

    if (existing) {
        alert("Produk sudah ada di Wishlist.");
        return;
    }

    wishlist.push(productData);

    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    alert("Produk berhasil ditambahkan ke Wishlist.");

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

    checkoutBtn.onclick=()=>{

        addToCart();

        window.location.href="checkout.html";

    };

        }
