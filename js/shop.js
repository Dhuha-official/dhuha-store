// ==========================
// DHUHA SHOP
// ==========================

let products = [];

// ==========================
// LOAD PRODUK
// ==========================

document.addEventListener("DOMContentLoaded", loadProducts);

async function loadProducts() {

    products = JSON.parse(localStorage.getItem("products"));

    if (!products || products.length === 0) {

        const response = await fetch("data/products.json");

        products = await response.json();

        localStorage.setItem(
            "products",
            JSON.stringify(products)
        );

    }

    renderProducts(products);

}

// ==========================
// RENDER
// ==========================

function renderProducts(list) {

    const container =
        document.getElementById("product-list");

    if (!container) return;

    container.innerHTML = "";

    if (list.length === 0) {

        container.innerHTML =
        "<p>Produk tidak ditemukan.</p>";

        return;

    }

    list.forEach(product => {

        container.innerHTML += `

<div class="product-card">

<img src="${product.image}" alt="${product.name}">

<h3>${product.name}</h3>

<p>

Rp ${Number(product.price).toLocaleString("id-ID")}

</p>

<a href="product.html?id=${product.id}" class="product-btn">

Lihat Produk

</a>

</div>

`;

    });

}

// ==========================
// SEARCH
// ==========================

const search =
document.getElementById("searchInput")

if (search) {

    search.addEventListener("keyup", () => {

        const key =
        search.value.toLowerCase();

        renderProducts(

            products.filter(product =>

                product.name.toLowerCase().includes(key)

            )

        );

    });

}

// ==========================
// FILTER
// ==========================

function filterCategory(category) {

    if (category === "Semua") {

        renderProducts(products);

        return;

    }

    renderProducts(

        products.filter(product =>

            product.category === category

        )

    );

}

// ==========================
// AUTO REFRESH
// ==========================

window.addEventListener("storage", () => {

    loadProducts();

});
