// ======================================
// DHUHA ADMIN EDIT PRODUCT
// ======================================

const params=new URLSearchParams(window.location.search);

const productId=Number(params.get("id"));

let products=[];

let currentProduct=null;
document.addEventListener("DOMContentLoaded",()=>{

loadProduct();

});

async function loadProduct(){

const response=await fetch("../data/products.json");

products=await response.json();

currentProduct=products.find(item=>item.id===productId);

if(!currentProduct){

alert("Produk tidak ditemukan.");

location.href="products.html";

return;

}

fillForm();

}
function fillForm(){

document.getElementById("edit-name").value=currentProduct.name;

document.getElementById("edit-category").value=currentProduct.category;

document.getElementById("edit-price").value=currentProduct.price;

document.getElementById("edit-stock").value=currentProduct.stock||0;

document.getElementById("edit-description").value=currentProduct.description||"";

document.getElementById("edit-preview").src="../"+currentProduct.image;

}
const image=document.getElementById("edit-image");

image.addEventListener("change",(e)=>{

const file=e.target.files[0];

if(!file)return;

document.getElementById("edit-preview").src=

URL.createObjectURL(file);

});
const form=document.getElementById("edit-product-form");

form.addEventListener("submit",(e)=>{

e.preventDefault();

currentProduct.name=

document.getElementById("edit-name").value;

currentProduct.category=

document.getElementById("edit-category").value;

currentProduct.price=

Number(document.getElementById("edit-price").value);

currentProduct.stock=

Number(document.getElementById("edit-stock").value);

currentProduct.description=

document.getElementById("edit-description").value;

alert("Perubahan berhasil disimpan.");

console.log(products);

});
document

.getElementById("delete-product")

.addEventListener("click",()=>{

const ok=confirm(

"Yakin ingin menghapus produk ini?"

);

if(!ok)return;

products=products.filter(item=>

item.id!==productId

);

alert("Produk berhasil dihapus.");

location.href="products.html";

});
