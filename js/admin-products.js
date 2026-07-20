// =====================================
// DHUHA ADMIN PRODUCTS
// =====================================

let products = [];

document.addEventListener("DOMContentLoaded", () => {

    loadProducts();

});

// ==========================
// LOAD
// ==========================

function loadProducts() {

    products = JSON.parse(localStorage.getItem("products")) || [];

    renderProducts();

}

// ==========================
// RENDER
// ==========================

function renderProducts() {

    const table = document.getElementById("products-table");

    if (!table) return;

    table.innerHTML = "";

    if (products.length === 0) {

        table.innerHTML = `
        <tr>
            <td colspan="7">
            Belum ada produk
            </td>
        </tr>
        `;

        return;

    }

    products.forEach((item, index) => {

        table.innerHTML += `

<tr>

<td>

<img src="${item.image}" width="60">

</td>

<td>${item.name}</td>

<td>${item.category}</td>

<td>

Rp ${Number(item.price).toLocaleString("id-ID")}

</td>

<td>${item.stock}</td>

<td>

<button onclick="editProduct(${index})">

Edit

</button>

<button onclick="deleteProduct(${index})">

Hapus

</button>

</td>

</tr>

`;

    });

}

// ==========================
// SIMPAN
// ==========================

function saveProducts(){

localStorage.setItem(

"products",

JSON.stringify(products)

);

renderProducts();

}

// ==========================
// TAMBAH
// ==========================

function addProduct(){

const product={

id:Date.now(),

name:document.getElementById("product-name").value,

category:document.getElementById("product-category").value,

price:Number(document.getElementById("product-price").value),

stock:Number(document.getElementById("product-stock").value),

image:document.getElementById("product-image").value,

description:document.getElementById("product-description").value

};

products.push(product);

saveProducts();

alert("Produk berhasil ditambahkan.");

}

// ==========================
// EDIT
// ==========================

function editProduct(index){

const p=products[index];

document.getElementById("product-name").value=p.name;

document.getElementById("product-category").value=p.category;

document.getElementById("product-price").value=p.price;

document.getElementById("product-stock").value=p.stock;

document.getElementById("product-image").value=p.image;

document.getElementById("product-description").value=p.description;

document.getElementById("saveBtn").onclick=()=>{

p.name=document.getElementById("product-name").value;

p.category=document.getElementById("product-category").value;

p.price=Number(document.getElementById("product-price").value);

p.stock=Number(document.getElementById("product-stock").value);

p.image=document.getElementById("product-image").value;

p.description=document.getElementById("product-description").value;

saveProducts();

alert("Produk berhasil diperbarui.");

};

}

// ==========================
// HAPUS
// ==========================

function deleteProduct(index){

if(!confirm("Hapus produk ini?")) return;

products.splice(index,1);

saveProducts();

      }
