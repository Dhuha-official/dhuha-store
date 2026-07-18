let allProducts = [];

const productList = document.getElementById("product-list");

const searchInput = document.getElementById("searchInput");

const filterBtn = document.getElementById("filterBtn");

const filterSheet = document.getElementById("filterSheet");

async function loadProducts(){

const response = await fetch("data/products.json");

allProducts = await response.json();

renderProducts(allProducts);

}

function renderProducts(products){

productList.innerHTML = "";

products.forEach(product=>{

productList.innerHTML += createCard(product);

});

}

function createCard(product){

return `

<div class="product-card">

<div class="product-image">

<img src="${product.image}" alt="${product.name}">

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

<a
class="product-btn"
href="product.html?id=${product.id}">

Lihat Produk

</a>

</div>

</div>

`;

}

loadProducts();
filterBtn.onclick = ()=>{

filterSheet.classList.toggle("show");

};

document.querySelectorAll(".sheet-body button").forEach(button=>{

button.onclick=()=>{

const category = button.dataset.category;

if(category==="Semua"){

renderProducts(allProducts);

}else{

renderProducts(

allProducts.filter(item=>item.category===category)

);

}

filterSheet.classList.remove("show");

};

});
searchInput.addEventListener("input",()=>{

const keyword = searchInput.value.toLowerCase();

const filtered = allProducts.filter(product=>

product.name.toLowerCase().includes(keyword)

);

renderProducts(filtered);

});
