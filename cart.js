let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartList = document.getElementById("cart-list");
const cartTotal = document.getElementById("cart-total");

let total = 0;

cartList.innerHTML = "";

cart.forEach((product, index) => {

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

        <button onclick="kurang(${index})">-</button>
        <button onclick="tambah(${index})">+</button>
        <button onclick="hapus(${index})">Hapus</button>
      </div>
    </div>
  `;

});

cartTotal.innerHTML = "Total : Rp" + total.toLocaleString("id-ID");

function tambah(index){
  cart[index].qty = (cart[index].qty || 1) + 1;
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}

function kurang(index){
  cart[index].qty = cart[index].qty || 1;

  if(cart[index].qty > 1){
    cart[index].qty--;
  }else{
    cart.splice(index,1);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}

function hapus(index){
  cart.splice(index,1);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}
