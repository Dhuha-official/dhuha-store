const wishlistList = document.getElementById("wishlist-list");
const wishlistEmpty = document.getElementById("wishlist-empty");
const wishlistCount = document.getElementById("wishlist-count");
const clearWishlist = document.getElementById("clearWishlist");

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

function renderWishlist(){

wishlistList.innerHTML="";

wishlistCount.innerText=`Total ${wishlist.length} Produk`;

if(wishlist.length===0){

wishlistEmpty.style.display="block";

wishlistList.style.display="none";

return;

}

wishlistEmpty.style.display="none";

wishlistList.style.display="flex";

wishlist.forEach((product,index)=>{

wishlistList.innerHTML+=`

<div class="wishlist-card">

<img src="${product.image}" alt="${product.name}">

<div class="wishlist-info">

<h3>${product.name}</h3>

<div class="wishlist-price">

Rp ${Number(product.price).toLocaleString("id-ID")}

</div>

<div class="stock">

🟢 Stok tersedia

</div>

<a href="product.html?id=${product.id}" class="view-product">

Lihat Produk

</a>

</div>

<button class="remove-btn" onclick="removeWishlist(${index})">

🗑

</button>

</div>

`;

});

}

function removeWishlist(index){

wishlist.splice(index,1);

localStorage.setItem("wishlist",JSON.stringify(wishlist));

renderWishlist();

}

clearWishlist.onclick=()=>{

if(confirm("Hapus semua wishlist?")){

wishlist=[];

localStorage.removeItem("wishlist");

renderWishlist();

}

}

renderWishlist();
