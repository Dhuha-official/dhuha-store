// ==========================
// KODE POS
// ==========================

const postcode = document.getElementById("postcode");

if (postcode) {
    postcode.addEventListener("input", function () {
        this.value = this.value.replace(/\D/g, "");
    });
}

// ==========================
// DATA CART / BUY NOW
// ==========================

let cart = JSON.parse(localStorage.getItem("buyNow"));

if (!cart) {
    cart = JSON.parse(localStorage.getItem("cart")) || [];
}

const checkoutList = document.getElementById("checkout-list");
const subtotalElement = document.getElementById("subtotal");
const shippingCostElement = document.getElementById("shippingCost");
const shippingTotalElement = document.getElementById("shippingTotal");
const shippingEstimateElement = document.getElementById("shippingEstimate");
const totalElement = document.getElementById("checkout-total");
const checkoutBtn = document.getElementById("checkoutBtn");

let subtotal = 0;
let shippingCost = 0;
let shippingEstimate = "";

// ==========================
// RENDER CHECKOUT
// ==========================

function renderCheckout() {

    if (!checkoutList) return;

    checkoutList.innerHTML = "";

    subtotal = 0;

    if (cart.length === 0) {

        checkoutList.innerHTML = `
        <p style="text-align:center;padding:40px;">
        Keranjang kosong.
        </p>`;

        return;

    }

    cart.forEach(item => {

        const qty = item.qty || 1;

        const total = qty * Number(item.price);

        subtotal += total;

        checkoutList.innerHTML += `

<div class="checkout-item">

<div>

<strong>${item.name}</strong><br>

<small>

${qty} x Rp ${Number(item.price).toLocaleString("id-ID")}

${item.size ? "<br>Ukuran : "+item.size : ""}

${item.color ? "<br>Warna : "+item.color : ""}

</small>

</div>

<strong>

Rp ${total.toLocaleString("id-ID")}

</strong>

</div>

`;

    });

    subtotalElement.innerHTML =
        "Rp " + subtotal.toLocaleString("id-ID");

    updateShipping();

}

// ==========================
// ONGKIR
// ==========================

function updateShipping() {

    const courier =
        document.querySelector("input[name='shipping']:checked").value;

    switch (courier) {

        case "JNE":
            shippingCost = 28000;
            shippingEstimate = "2-4 Hari";
            break;

        case "J&T":
            shippingCost = 30500;
            shippingEstimate = "1-3 Hari";
            break;

        case "SiCepat":
            shippingCost = 32000;
            shippingEstimate = "2-3 Hari";
            break;

    }

    shippingCostElement.innerHTML =
        "Rp " + shippingCost.toLocaleString("id-ID");

    shippingTotalElement.innerHTML =
        "Rp " + shippingCost.toLocaleString("id-ID");

    shippingEstimateElement.innerHTML =
        shippingEstimate;

    totalElement.innerHTML =
        "Rp " + (subtotal + shippingCost).toLocaleString("id-ID");

}

document.querySelectorAll("input[name='shipping']")
.forEach(item => {

    item.addEventListener("change", updateShipping);

});

// ==========================
// CHECKOUT
// ==========================

checkoutBtn.addEventListener("click", () => {

    const name = document.getElementById("fullname").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const province = document.getElementById("province").value.trim();
    const city = document.getElementById("city").value.trim();
    const postcode = document.getElementById("postcode").value.trim();
    const address = document.getElementById("detailAddress").value.trim();

    if (!name || !phone || !province || !city || !postcode || !address) {

        alert("Mohon lengkapi data penerima.");

        return;

    }

    const courier =
        document.querySelector("input[name='shipping']:checked").value;

    const payment =
        document.querySelector("input[name='payment']:checked").value;

    const orderId =
        "DH" + Date.now();

    const order = {

    orderNumber: orderId,

        customer: {

            name,

            phone,

            province,

            city,

            postcode,

            address

        },

        items: cart,

        subtotal,

        shipping: shippingCost,

        total: subtotal + shippingCost,

        courier,

        estimate: shippingEstimate,

        payment,

        status: "Menunggu Pembayaran",

        createdAt: new Date().toLocaleString("id-ID")

    };

    let orders =
        JSON.parse(localStorage.getItem("orders")) || [];

    orders.unshift(order);

    localStorage.setItem(
        "orders",
        JSON.stringify(orders)
    );

    localStorage.setItem(
        "currentOrder",
        JSON.stringify(order)
    );

    localStorage.removeItem("buyNow");

    window.location.href = "payment.html";

});

// ==========================
// LOAD
// ==========================

renderCheckout();
