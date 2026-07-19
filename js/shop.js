let products = [];

const productList = document.getElementById("product-list");

async function loadProducts() {

    const response = await fetch("data/products.json");

    products = await response.json();

    renderProducts(products);

}

function renderProducts(data) {

    productList.innerHTML = "";

    if (data.length === 0) {

        productList.innerHTML = `
        <p style="text-align:center;padding:40px;">
            Produk tidak ditemukan
        </p>
        `;

        return;

    }

    data.forEach(product => {

        productList.innerHTML += `

<div class="product-card" onclick="location.href='product.html?id=${product.id}'">

<div class="product-image">

<img src="${product.image}" alt="${product.name}">

</div>

<div class="product-info">

<h3>${product.name}</h3>

<div class="product-price">

Rp ${Number(product.price).toLocaleString("id-ID")}

</div>

</div>

</div>

`;

    });

}

loadProducts();
const filterButtons = document.querySelectorAll("[data-category]");

filterButtons.forEach(button => {

    button.onclick = () => {

        const category = button.dataset.category;

        filterButtons.forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        if (category === "Semua") {

            renderProducts(products);

        } else {

            renderProducts(

                products.filter(item => item.category === category)

            );

        }

    };

});
// ==========================
// FILTER
// ==========================

const filterBtn = document.getElementById("filterBtn");
const filterSheet = document.getElementById("filterSheet");

filterBtn.addEventListener("click", () => {

    filterSheet.classList.toggle("active");

});

// Tutup saat klik di luar
window.addEventListener("click", function(e){

    if(
        !filterSheet.contains(e.target) &&
        !filterBtn.contains(e.target)
    ){

        filterSheet.classList.remove("active");

    }

});


// ==========================
// SORT
// ==========================

const sortBtn = document.getElementById("sortBtn");
const sortSheet = document.getElementById("sortSheet");

sortBtn.addEventListener("click", () => {

    sortSheet.classList.toggle("active");

});

window.addEventListener("click", function(e){

    if(
        !sortSheet.contains(e.target) &&
        !sortBtn.contains(e.target)
    ){

        sortSheet.classList.remove("active");

    }

});
