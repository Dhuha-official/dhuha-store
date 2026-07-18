// ======================================
// DHUHA ADMIN ADD PRODUCT
// ======================================

const form=document.getElementById("add-product-form");

const imageInput=document.getElementById("product-image");

const preview=document.getElementById("preview-image");
// ======================================
// PREVIEW IMAGE
// ======================================

imageInput.addEventListener("change",(e)=>{

const file=e.target.files[0];

if(!file)return;

preview.src=URL.createObjectURL(file);

});
// ======================================
// SAVE PRODUCT
// ======================================

form.addEventListener("submit",(e)=>{

e.preventDefault();

const product={

id:Date.now(),

name:document.getElementById("product-name").value,

category:document.getElementById("product-category").value,

price:Number(document.getElementById("product-price").value),

stock:Number(document.getElementById("product-stock").value),

description:document.getElementById("product-description").value,

image:preview.src

};

console.log(product);

alert("Produk berhasil ditambahkan.");

form.reset();

preview.src="../images/no-image.png";

});
// ======================================
// AUTO FOCUS
// ======================================

window.onload=()=>{

document.getElementById("product-name").focus();

};
