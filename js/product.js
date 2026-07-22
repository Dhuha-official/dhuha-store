// =====================================
// DHUHA PRODUCT
// BAGIAN 1
// =====================================

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

let productData = null;

let selectedSize = "M";
let selectedColor = "Hitam";
let quantity = 1;

// =====================================
// LOAD PRODUCT
// =====================================

document.addEventListener("DOMContentLoaded", async () => {

    await loadProduct();

    initSize();

    initColor();

    initQty();

});

async function loadProduct() {

    try {

        const { data, error } =
        await window.supabaseClient
        .from("products")
        .select("*")
        .eq("id", productId)
        .single();

        if (error) throw error;

        productData = data;
        loadRelatedProducts();

        document.getElementById("product-image").src =
        data.image_url;

        document.getElementById("product-name").innerText =
        data.name;

        document.getElementById("product-price").innerText =
        "Rp " + Number(data.price).toLocaleString("id-ID");

        document.getElementById("product-description").innerText =
        data.description || "";

    } catch (err) {

        console.error(err);

        alert("Produk tidak ditemukan.");

    }

}

// =====================================
// SIZE
// =====================================

function initSize() {

    const buttons =
    document.querySelectorAll(".size-list button");

    buttons.forEach(btn => {

        if (btn.innerText === selectedSize) {

            btn.classList.add("active");

        }

        btn.onclick = () => {

            buttons.forEach(b =>
                b.classList.remove("active")
            );

            btn.classList.add("active");

            selectedSize = btn.innerText;

        };

    });

}

// =====================================
// COLOR
// =====================================

function initColor() {

    const buttons =
    document.querySelectorAll(".color-btn");

    buttons.forEach(btn => {

        if (btn.dataset.color === selectedColor) {

            btn.classList.add("active");

        }

        btn.onclick = () => {

            buttons.forEach(b =>
                b.classList.remove("active")
            );

            btn.classList.add("active");

            selectedColor = btn.dataset.color;

        };

    });

}

// =====================================
// QUANTITY
// =====================================

function initQty() {

    const qty =
    document.getElementById("qty");

    document.getElementById("plus").onclick = () => {

        quantity++;

        qty.innerText = quantity;

    };

    document.getElementById("minus").onclick = () => {

        if (quantity > 1) {

            quantity--;

            qty.innerText = quantity;

        }

    };

        }
// =====================================
// ADD TO CART
// =====================================

document.getElementById("add-cart").onclick = () => {

    if (!productData) return;

    let cart =
    JSON.parse(localStorage.getItem("cart")) || [];

    const index =
    cart.findIndex(item =>

        item.id === productData.id &&
        item.size === selectedSize &&
        item.color === selectedColor

    );

    if (index > -1) {

        cart[index].qty += quantity;

    } else {

        cart.push({

            id: productData.id,

            name: productData.name,

            image: productData.image_url,

            price: productData.price,

            size: selectedSize,

            color: selectedColor,

            qty: quantity

        });

    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    alert("Produk berhasil ditambahkan ke keranjang.");

};

// =====================================
// WISHLIST
// =====================================

document.getElementById("wishlist-btn").onclick = () => {

    if (!productData) return;

    let wishlist =
    JSON.parse(localStorage.getItem("wishlist")) || [];

    const already =
    wishlist.find(item => item.id === productData.id);

    if (already) {

        alert("Produk sudah ada di wishlist.");

        return;

    }

    wishlist.push({

        id: productData.id,

        name: productData.name,

        image: productData.image_url,

        price: productData.price

    });

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

    alert("Produk ditambahkan ke wishlist.");

};
// =====================================
// BUY NOW
// =====================================

const buyBtn = document.getElementById("buy-now");

if (buyBtn) {

    buyBtn.onclick = () => {

        if (!productData) return;

        const checkoutProduct = {

            id: productData.id,

            name: productData.name,

            image: productData.image_url,

            price: productData.price,

            size: selectedSize,

            color: selectedColor,

            qty: quantity

        };

        localStorage.setItem(
            "checkoutProduct",
            JSON.stringify(checkoutProduct)
        );

        window.location.href = "checkout.html";

    };

}

// =====================================
// RELATED PRODUCTS
// =====================================

loadRelatedProducts();

async function loadRelatedProducts() {

    if (!productData) return;

    try {

        const { data, error } =
        await window.supabaseClient
        .from("products")
        .select("*")
        .eq("category", productData.category)
        .neq("id", productData.id)
        .limit(4);

        if (error) throw error;

        renderRelatedProducts(data || []);

    } catch (err) {

        console.error(err);

    }

}

function renderRelatedProducts(list) {

    const container =
    document.getElementById("related-products");

    if (!container) return;

    container.innerHTML = "";

    list.forEach(product => {

        container.innerHTML += `

<a href="product.html?id=${product.id}" class="product-card">

<div class="product-image">

<img src="${product.image_url}" alt="${product.name}">

</div>

<div class="product-info">

<h3>${product.name}</h3>

<p class="price">

Rp ${Number(product.price).toLocaleString("id-ID")}

</p>

</div>

</a>

`;

    });

}

// =====================================
// UPDATE ICON
// =====================================

if (typeof lucide !== "undefined") {

    lucide.createIcons();

}
