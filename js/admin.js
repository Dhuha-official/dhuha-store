let products = JSON.parse(localStorage.getItem("products")) || [];

const list = document.getElementById("admin-products");

function render(){

list.innerHTML="";

products.forEach((item,index)=>{

list.innerHTML+=`

<div class="admin-card">

<img src="${item.image}">

<div>

<h3>${item.name}</h3>

<p>Rp ${Number(item.price).toLocaleString("id-ID")}</p>

</div>

<button onclick="removeProduct(${index})">

Hapus

</button>

</div>

`;

});

}

render();

document.getElementById("save-product").onclick=()=>{

const product={

id:Date.now(),

name:document.getElementById("name").value,

price:Number(document.getElementById("price").value),

category:document.getElementById("category").value,

image:document.getElementById("image").value,

description:document.getElementById("description").value

};

products.push(product);

localStorage.setItem("products",JSON.stringify(products));

render();

};
let products = JSON.parse(localStorage.getItem("products")) || [];

const list = document.getElementById("admin-products");

function render(){

list.innerHTML="";

products.forEach((item,index)=>{

list.innerHTML+=`

<div class="admin-card">

<img src="${item.image}">

<div>

<h3>${item.name}</h3>

<p>Rp ${Number(item.price).toLocaleString("id-ID")}</p>

</div>

<button onclick="removeProduct(${index})">

Hapus

</button>

</div>

`;

});

}

render();

document.getElementById("save-product").onclick=()=>{

const product={

id:Date.now(),

name:document.getElementById("name").value,

price:Number(document.getElementById("price").value),

category:document.getElementById("category").value,

image:document.getElementById("image").value,

description:document.getElementById("description").value

};

products.push(product);

localStorage.setItem("products",JSON.stringify(products));

render();

};
