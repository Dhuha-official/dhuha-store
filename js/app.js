let allProducts = [];

async function loadProducts() {

    try {

        const response = await fetch("data/products.json");

        allProducts = await response.json();

        renderProducts(allProducts);

    } catch (err) {

        console.error(err);

        document.getElementById("product-list").innerHTML =
        "<p style='text-align:center'>Produk gagal dimuat.</p>";

    }

}

function renderProducts(products){

    const productList = document.getElementById("product-list");

    productList.innerHTML = "";

    products.forEach(product=>{

        productList.innerHTML += `

<div class="product">

<img src="${product.image}" alt="${product.name}">

<h3>${product.name}</h3>

<p>Rp ${Number(product.price).toLocaleString("id-ID")}</p>

<a class="btn-product"
href="product.html?id=${product.id}">

Lihat Produk

</a>

<button class="btn-cart"
onclick="addToCart(${product.id})">

Tambah ke Keranjang

</button>

</div>

`;

    });

}

function filterProducts(category){

    if(category==="Semua"){

        renderProducts(allProducts);

        return;

    }

    const filtered = allProducts.filter(product=>product.category===category);

    renderProducts(filtered);

}

function addToCart(id){

    const product = allProducts.find(item=>item.id===id);

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(item=>item.id===id);

    if(existing){

        existing.qty++;

    }else{

        cart.push({

            ...product,

            qty:1

        });

    }

    localStorage.setItem("cart
