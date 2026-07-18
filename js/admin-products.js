// ======================================
// DHUHA ADMIN PRODUCTS
// ======================================

let products = [];

document.addEventListener("DOMContentLoaded",()=>{

loadProducts();

});

async function loadProducts(){

try{

const response=await fetch("../data/products.json");

products=await response.json();

renderProducts(products);

}catch(error){

console.log(error);

}

}
function renderProducts(list){

const table=document.getElementById("product-list-admin");

table.innerHTML="";

list.forEach(product=>{

table.innerHTML+=`

<tr>

<td>

<img src="../${product.image}"

class="admin-product-image">

</td>

<td>

${product.name}

</td>

<td>

${product.category}

</td>

<td>

Rp ${Number(product.price).toLocaleString("id-ID")}

</td>

<td>

${product.stock ?? "-"}

</td>

<td>

<a

href="edit-product.html?id=${product.id}"

class="btn">

Edit

</a>

<button

class="btn delete-btn"

onclick="deleteProduct(${product.id})">

Hapus

</button>

</td>

</tr>

`;

});

  // ======================================
// SEARCH
// ======================================

const search=document.getElementById("search-product");

if(search){

search.addEventListener("keyup",()=>{

const keyword=search.value.toLowerCase();

const result=products.filter(item=>

item.name.toLowerCase().includes(keyword)

);

renderProducts(result);

});

}
  // ======================================
// FILTER
// ======================================

const category=document.getElementById("filter-category");

if(category){

category.addEventListener("change",()=>{

if(category.value==="Semua"){

renderProducts(products);

return;

}

const result=products.filter(item=>

item.category===category.value

);

renderProducts(result);

});

}
}
// ======================================
// DELETE
// ======================================

function deleteProduct(id){

const ok=confirm(

"Hapus produk ini?"

);

if(!ok)return;

products=products.filter(item=>item.id!==id);

renderProducts(products);

}
