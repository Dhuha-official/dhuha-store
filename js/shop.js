// =====================================
// DHUHA SHOP
// BAGIAN 1
// =====================================

let products = [];
let currentCategory = "Semua";
let currentSort = "newest";

// =====================================
// LOAD PRODUCT
// =====================================

document.addEventListener("DOMContentLoaded", initShop);

async function initShop(){

    await loadProducts();

    initSearch();

    initFilter();

    initSort();

    initBottomSheet();

}

async function loadProducts(){

    try{

        const localProducts =
        JSON.parse(localStorage.getItem("products"));

        if(localProducts && localProducts.length){

            products = localProducts;

        }else{

            const response =
            await fetch("data/products.json");

            products = await response.json();

            localStorage.setItem(
                "products",
                JSON.stringify(products)
            );

        }

        renderProducts(products);

    }catch(err){

        console.error(err);

    }

}

// =====================================
// RENDER PRODUCT
// =====================================

function renderProducts(list){

    const container =
    document.getElementById("product-list");

    if(!container) return;

    container.innerHTML="";

    if(list.length===0){

        container.innerHTML=`

<div class="empty-product">

<h3>Produk tidak ditemukan</h3>

</div>

`;

        return;

    }

    list.forEach(product=>{

        container.innerHTML+=`

<div class="product-card">

<a href="product.html?id=${product.id}">

<div class="product-image">

<img src="${product.image}" alt="${product.name}">

</div>

<div class="product-info">

<h3>${product.name}</h3>

<p class="price">

Rp ${Number(product.price).toLocaleString("id-ID")}

</p>

</div>

</a>

</div>

`;

    });

}
// =====================================
// SEARCH
// =====================================

function initSearch() {

    const searchInput =
    document.getElementById("searchInput");

    if (!searchInput) return;

    searchInput.addEventListener("input", function () {

        filterAndRender();

    });

}

// =====================================
// FILTER KATEGORI
// =====================================

function initFilter(){

document.querySelectorAll(".filter-item").forEach(btn=>{

btn.onclick=()=>{

currentCategory=btn.dataset.category;

filterAndRender();

document.getElementById("filterSheet").classList.remove("show");

};

});

}

// =====================================
// FILTER DATA
// =====================================

function filterAndRender() {

    let result = [...products];

    // SEARCH

    const keyword =
    document
    .getElementById("searchInput")
    .value
    .toLowerCase()
    .trim();

    if (keyword !== "") {

        result = result.filter(product =>

            product.name
            .toLowerCase()
            .includes(keyword)

        );

    }

    // FILTER KATEGORI

    if (currentCategory !== "Semua") {

        result = result.filter(product =>

            product.category === currentCategory

        );

    }

    // SORT

    result = sortProducts(result);

    renderProducts(result);

      }
// =====================================
// SORT
// =====================================
function initSort(){

document.querySelectorAll(".sort-item").forEach(btn=>{

btn.onclick=()=>{

currentSort=btn.dataset.sort;

filterAndRender();

document.getElementById("sortSheet").classList.remove("show");

};

});

}

function sortProducts(list) {

    let result = [...list];

    switch (currentSort) {

        case "low":

            result.sort((a, b) =>

                Number(a.price) - Number(b.price)

            );

            break;

        case "high":

            result.sort((a, b) =>

                Number(b.price) - Number(a.price)

            );

            break;

        case "az":

            result.sort((a, b) =>

                a.name.localeCompare(b.name)

            );

            break;

        case "za":

            result.sort((a, b) =>

                b.name.localeCompare(a.name)

            );

            break;

        case "newest":

        default:

            result.sort((a, b) =>

                Number(b.id) - Number(a.id)

            );

            break;

    }

    return result;

}

// =====================================
// BOTTOM SHEET
// =====================================

function initBottomSheet() {

    const filterBtn =
    document.getElementById("filterBtn");

    const sortBtn =
    document.getElementById("sortBtn");

    const filterSheet =
    document.getElementById("filterSheet");

    const sortSheet =
    document.getElementById("sortSheet");

    if (filterBtn && filterSheet) {

        filterBtn.onclick = () => {

            filterSheet.classList.add("show");

            sortSheet.classList.remove("show");

        };

    }

    if (sortBtn && sortSheet) {

        sortBtn.onclick = () => {

            sortSheet.classList.add("show");

            filterSheet.classList.remove("show");

        };

    }

    window.addEventListener("click", (e) => {

        if (e.target === filterSheet) {

            filterSheet.classList.remove("show");

        }

        if (e.target === sortSheet) {

            sortSheet.classList.remove("show");

        }

    });

                       }
// =====================================
// AUTO REFRESH DARI ADMIN
// =====================================

window.addEventListener("storage", () => {

    loadProducts();

});

// =====================================
// REFRESH SAAT KEMBALI KE TAB
// =====================================

document.addEventListener("visibilitychange", () => {

    if (!document.hidden) {

        loadProducts();

    }

});

// =====================================
// UPDATE DARI ADMIN PANEL
// =====================================

setInterval(() => {

    const localProducts =
        JSON.parse(localStorage.getItem("products")) || [];

    if (localProducts.length !== products.length) {

        products = localProducts;

        filterAndRender();

    }

}, 1000);

// =====================================
// ACTIVE MENU
// =====================================

document.querySelectorAll(".bottom-nav .nav-item")
.forEach(link => {

    const href = link.getAttribute("href");

    if (window.location.pathname.endsWith(href)) {

        link.classList.add("active");

    }

});

// =====================================
// UPDATE ICON
// =====================================

if (typeof lucide !== "undefined") {

    lucide.createIcons();

}
