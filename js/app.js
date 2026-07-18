const productContainer = document.getElementById("home-products");

if(productContainer){

productContainer.innerHTML="";

for(let i=0;i<4;i++){

productContainer.innerHTML+=`

<div class="skeleton">

<div class="skeleton-image"></div>

<div class="skeleton-text"></div>

<div class="skeleton-price"></div>

</div>

`;

}

}
async function loadHomeProducts(){

    const response = await fetch("data/products.json");

    const products = await response.json();

    const home = document.getElementById("home-products");

    const best = document.getElementById("best-products");

    if(home){

        home.innerHTML = "";

        products.slice(0,4).forEach(product=>{

            home.innerHTML += createCard(product);

        });

    }

    if(best){

        best.innerHTML = "";

        products.slice(4,8).forEach(product=>{

            best.innerHTML += createCard(product);

        });

    }

}

function createCard(product){

return `

<div class="product-card">

<div class="product-image">

<img src="${product.image}">

<span class="badge">

NEW

</span>

</div>

<div class="product-info">

<h3>

${product.name}

</h3>

<div class="product-price">

Rp ${Number(product.price).toLocaleString("id-ID")}

</div>

<a class="product-btn"

href="product.html?id=${product.id}">

Lihat Produk

</a>

</div>

</div>

`;

}

loadHomeProducts();
