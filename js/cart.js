// ======================================
// DHUHA CART FINAL
// ======================================

let cart =
JSON.parse(localStorage.getItem("cart")) || [];

const cartList =
document.getElementById("cart-list");

const cartTotal =
document.getElementById("cart-total");

const checkoutBtn =
document.getElementById("checkoutBtn");

// ======================================
// SAVE CART
// ======================================

function saveCart(){

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    if(typeof updateCartBadge==="function"){

        updateCartBadge();

    }

}

// ======================================
// RENDER CART
// ======================================

function renderCart(){

    if(!cartList) return;

    cartList.innerHTML="";

    if(cart.length===0){

        cartList.innerHTML=`

<div class="empty-cart">

<h3>Keranjang masih kosong</h3>

<p>Yuk pilih produk favoritmu.</p>

<a href="shop.html" class="checkout-btn">

Belanja Sekarang

</a>

</div>

`;

        cartTotal.innerHTML="Rp 0";

        if(checkoutBtn){

            checkoutBtn.disabled=true;

        }

        return;

    }

    if(checkoutBtn){

        checkoutBtn.disabled=false;

    }

    let total=0;

    cart.forEach((item,index)=>{

        const qty=item.qty||1;

        const subtotal=
        Number(item.price)*qty;

        total+=subtotal;

        cartList.innerHTML+=`

<div class="cart-item">

<div class="cart-image">

<img src="${item.image}" alt="${item.name}">

</div>

<div class="cart-info">

<h3>${item.name}</h3>

<p class="cart-price">

Rp ${Number(item.price).toLocaleString("id-ID")}

</p>

${item.size ? `<p>Ukuran : ${item.size}</p>` : ""}

${item.color ? `<p>Warna : ${item.color}</p>` : ""}

<div class="cart-action">

<div class="cart-qty">

<button onclick="changeQty(${index},-1)">

−

</button>

<span>

${qty}

</span>

<button onclick="changeQty(${index},1)">

+

</button>

</div>

<button

class="remove-btn"

onclick="removeItem(${index})">

Hapus

</button>

</div>

</div>

</div>

`;

    });

    cartTotal.innerHTML=

    "Rp "+total.toLocaleString("id-ID");

}

// ======================================
// UBAH QTY
// ======================================

function changeQty(index,value){

    cart[index].qty=(cart[index].qty||1)+value;

    if(cart[index].qty<=0){

        cart.splice(index,1);

    }

    saveCart();

    renderCart();

}

// ======================================
// HAPUS
// ======================================

function removeItem(index){

    if(!confirm("Hapus produk ini?")) return;

    cart.splice(index,1);

    saveCart();

    renderCart();

}

// ======================================
// CHECKOUT
// ======================================

if(checkoutBtn){

    checkoutBtn.onclick=()=>{

        if(cart.length===0){

            alert("Keranjang kosong.");

            return;

        }

        localStorage.setItem(

            "buyNow",

            JSON.stringify(cart)

        );

        location.href="checkout.html";

    };

}

// ======================================
// REFRESH ANTAR TAB
// ======================================

window.addEventListener("storage",()=>{

    cart=

    JSON.parse(localStorage.getItem("cart"))||[];

    renderCart();

});

// ======================================
// LOAD
// ======================================

renderCart();
