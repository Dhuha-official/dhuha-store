const wishlistList = document.getElementById("wishlist-list");

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

function loadWishlist(){

wishlistList.innerHTML="";

if(wishlist.length===0){

wishlistList.innerHTML=`
<p style="text-align:center;padding:50px">
Wishlist masih kosong
</p>
`;

return;

}

wishlist.forEach(product=>{

wishlistList.innerHTML+=`

<div class="product-card">

<div class="product-image">

<img src="${product.image}">

</div>

<div class="product-info">

<h3>${product.name}</h3>

<div class="product-price">

Rp ${Number(product.price).toLocaleString("id-ID")}

</div>

<a href="product.html?id=${product.id}"
class="product-btn">

Lihat Produk

</a>

</div>

</div>

`;

});

}

loadWishlist();
