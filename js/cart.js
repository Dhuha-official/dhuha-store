// ======================================
// DHUHA CART
// ======================================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartList = document.getElementById("cart-list");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkoutBtn");

// ======================================
// SAVE CART
// ======================================

function saveCart() {

    localStorage.setItem("cart", JSON.stringify(cart));

    if (typeof updateCartBadge === "function") {
        updateCartBadge();
    }

}

// ======================================
// RENDER CART
// ======================================

function renderCart() {

    if (!cartList) return;

    cartList.innerHTML = "";

    if (cart.length === 0) {

        cartList.innerHTML = `
        <div style="text-align:center;padding:60px 20px;">

            <h3>Keranjang masih kosong</h3>

            <p>Yuk pilih produk favoritmu.</p>

            <a href="shop.html"
               class="checkout-btn"
               style="margin-top:20px;display:inline-block;width:auto;padding:14px 24px;">

                Belanja Sekarang

            </a>

        </div>
        `;

        if (cartTotal) {
            cartTotal.textContent = "Rp 0";
        }

        if (checkoutBtn) {
            checkoutBtn.disabled = true;
        }

        return;

    }

    if (checkoutBtn) {
        checkoutBtn.disabled = false;
    }

    let total = 0;

    cart.forEach((item, index) => {

        const qty = item.qty || 1;

        const subtotal = Number(item.price) * qty;

        total += subtotal;

        cartList.innerHTML += `

<div class="cart-item">

    <img src="${item.image}" alt="${item.name}">

    <div class="cart-info">

        <h3>${item.name}</h3>

        <div class="cart-price">

            Rp ${Number(item.price).toLocaleString("id-ID")}

        </div>

        <small>

            ${item.size ? "Ukuran : " + item.size : ""}

            ${item.color ? "<br>Warna : " + item.color : ""}

        </small>

        <div class="cart-action">

            <div class="cart-qty">

                <button class="qty-btn" onclick="changeQty(${index},-1)">−</button>

                <span class="qty-number">${qty}</span>

                <button class="qty-btn" onclick="changeQty(${index},1)">+</button>

            </div>

            <button class="remove-btn" onclick="removeItem(${index})">

                Hapus

            </button>

        </div>

    </div>

</div>

`;

    });

    if (cartTotal) {

        cartTotal.textContent =
        "Rp " + total.toLocaleString("id-ID");

    }

}

// ======================================
// QTY
// ======================================

function changeQty(index, value) {

    cart[index].qty += value;

    if (cart[index].qty <= 0) {

        cart.splice(index, 1);

    }

    saveCart();

    renderCart();

}

// ======================================
// HAPUS
// ======================================

function removeItem(index) {

    cart.splice(index, 1);

    saveCart();

    renderCart();

}

// ======================================
// CHECKOUT
// ======================================

if (checkoutBtn) {

    checkoutBtn.onclick = () => {

        if (cart.length === 0) {

            alert("Keranjang masih kosong.");

            return;

        }

        localStorage.setItem(
    "checkoutItems",
    JSON.stringify(cart)
);

window.location.href = "checkout.html";
    };

}

// ======================================
// LOAD
// ======================================

renderCart();
if (typeof updateCartBadge === "function") {
    updateCartBadge();
}
