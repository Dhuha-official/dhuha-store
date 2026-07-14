let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartList = document.getElementById("cart-list");
const cartTotal = document.getElementById("cart-total");

let total = 0;

cartList.innerHTML = "";

if (cart.length === 0) {
  cartList.innerHTML = "<p>Keranjang masih kosong.</p>";
}

cart.forEach((product) => {

  const qty = product.qty || 1;

  const harga = Number(product.price.replace(/[^\d]/g, ""));

  const subtotal = harga * qty;

  total += subtotal;

  cartList.innerHTML += `
    <div class="cart-item">

      <img src="${product.image}" alt="${product.name}">

      <div>

        <h2>${product.name}</h2>

        <p>${product.price}</p>

        <p>Qty : ${qty}</p>

        <p>Subtotal : Rp${subtotal.toLocaleString("id-ID")}</p>

      </div>

    </div>
  `;

});

cartTotal.innerHTML =
"Total : Rp" + total.toLocaleString("id-ID");
