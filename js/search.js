let products=[];

const input=document.getElementById("searchInput");

const result=document.getElementById("search-result");

async function load(){

const res=await fetch("data/products.json");

products=await res.json();

}

load();

input.oninput=()=>{

const key=input.value.toLowerCase();

result.innerHTML="";

if(key==="") return;

products

.filter(item=>

item.name.toLowerCase().includes(key)

)

.forEach(item=>{

result.innerHTML+=`

<a class="search-item"

href="product.html?id=${item.id}">

<img src="${item.image}">

<div>

<h3>${item.name}</h3>

<p>

Rp ${Number(item.price).toLocaleString("id-ID")}

</p>

</div>

</a>

`;

});

};
