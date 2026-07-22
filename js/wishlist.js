// ======================================
// DHUHA WISHLIST
// ======================================

let wishlist =
JSON.parse(localStorage.getItem("wishlist")) || [];

const wishlistList =
document.getElementById("wishlist-list");

// ======================================
// RENDER
// ======================================

function renderWishlist(){

    if(!wishlistList) return;

    wishlistList.innerHTML = "";

    if(wishlist.length===0){

        wishlistList.innerHTML = `

<div class="empty-page">

<h3>Wishlist masih kosong</h3>

<p>Tambahkan produk favoritmu.</p>

<a href="shop.html" class="checkout-btn">

Belanja Sekarang

</a>

</div>

`;

        return;

    }

    wishlist.forEach((item,index)=>{

        wishlistList.innerHTML += `

<div class="wishlist-card">

<img src="${item.image}" alt="${item.name}">

<div class="wishlist-info">

<h3>${item.name}</h3>

<p>

Rp ${Number(item.price).toLocaleString("id-ID")}

</p>

${item.size ? `<small>Ukuran : ${item.size}</small><br>` : ""}

${item.color ? `<small>Warna : ${item.color}</small>` : ""}

<div class="wishlist-action">

<a
href="product.html?id=${item.id}"
class="btn">

Lihat

</a>

<button
class="btn"
onclick="moveToCart(${index})">

Tambah ke Keranjang

</button>

<button
class="delete-btn"
onclick="removeWishlist(${index})">

Hapus

</button>

</div>

</div>

</div>

`;

    });

}

// ======================================
// HAPUS
// ======================================

function removeWishlist(index){

    wishlist.splice(index,1);

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

    renderWishlist();

}

// ======================================
// PINDAH KE CART
// ======================================

function moveToCart(index){

    let cart =
    JSON.parse(localStorage.getItem("cart")) || [];

    const item = wishlist[index];

    const exist =
    cart.find(product=>

        product.id===item.id &&
        product.size===item.size &&
        product.color===item.color

    );

    if(exist){

        exist.qty += item.qty || 1;

    }else{

        cart.push({

            id:item.id,

            name:item.name,

            image:item.image,

            price:item.price,

            qty:item.qty || 1,

            size:item.size || "",

            color:item.color || ""

        });

    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    if(typeof updateCartBadge==="function"){

        updateCartBadge();

    }

    wishlist.splice(index,1);

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

    alert("Produk dipindahkan ke keranjang.");

    renderWishlist();

}

// ======================================
// AUTO REFRESH
// ======================================

window.addEventListener("storage",()=>{

    wishlist =
    JSON.parse(localStorage.getItem("wishlist")) || [];

    renderWishlist();

});

// ======================================
// LOAD
// ======================================

renderWishlist();
