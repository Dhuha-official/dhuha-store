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
