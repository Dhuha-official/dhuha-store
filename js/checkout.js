const checkoutList = document.getElementById("checkout-list");
const checkoutTotal = document.getElementById("checkout-total");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let total = 0;

function loadCheckout(){

    checkoutList.innerHTML = "";

    total = 0;

    if(cart.length === 0){

        checkoutList.innerHTML = `
            <p>Keranjang masih kosong.</p>
        `;

        checkoutTotal.innerText = "Rp 0";

        return;

    }

    cart.forEach(product=>{

        total += product.price * product.qty;

        checkoutList.innerHTML += `

<div class="checkout-item">

<img src="${product.image}" alt="${product.name}">

<div class="checkout-info">

<h4>${product.name}</h4>

<p>
${product.qty} × Rp ${Number(product.price).toLocaleString("id-ID")}
</p>

</div>

</div>

`;

    });

    checkoutTotal.innerText =
    "Rp " + total.toLocaleString("id-ID");

}

loadCheckout();

document.querySelector(".buy-btn").onclick = ()=>{

    if(cart.length===0){

        alert("Keranjang masih kosong.");

        return;

    }

    alert("Pesanan berhasil dibuat.");

    localStorage.removeItem("cart");

    window.location.href="index.html";

};
