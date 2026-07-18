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

<div class="product-card">

<div class="product-image">

<img src="${product.image}" alt="${product.name}">

</div>

<div class="product-info">

<h3>${product.name}</h3>

<div class="product-price">

Rp ${Number(product.price).toLocaleString("id-ID")}

</div>

<a href="product.html?id=${product.id}" class="product-btn">

Lihat Produk

</a>

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
