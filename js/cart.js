function loadCart() {

    const cartList = document.getElementById("cart-list");
    const totalText = document.getElementById("cart-total");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cartList.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {

        cartList.innerHTML = `
        <div class="empty-cart">
            <h3>Keranjang masih kosong</h3>
            <p>Yuk mulai belanja di DHUHA.</p>
        </div>
        `;

        totalText.innerText = "Total : Rp 0";

        return;

    }

    cart.forEach((item, index) => {

        total += item.price * item.qty;

        cartList.innerHTML += `

<div class="cart-item">

<img src="${item.image}" alt="${item.name}">

<div class="cart-info">

<h3>${item.name}</h3>

<p>Rp ${Number(item.price).toLocaleString("id-ID")}</p>

<div class="qty-box">

<button onclick="minusQty(${index})">−</button>

<span>${item.qty}</span>

<button onclick="plusQty(${index})">+</button>

</div>

<button class="remove-btn" onclick="removeItem(${index})">

Hapus

</button>

</div>

</div>

`;

    });

    totalText.innerText =
        "Total : Rp " + total.toLocaleString("id-ID");

}

function plusQty(index){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart[index].qty++;

    localStorage.setItem("cart", JSON.stringify(cart));

    loadCart();

}

function minusQty(index){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if(cart[index].qty > 1){

        cart[index].qty--;

    }else{

        cart.splice(index,1);

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    loadCart();

}

function removeItem(index){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index,1);

    localStorage.setItem("cart", JSON.stringify(cart));

    loadCart();

}

loadCart();
