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
// DATA
// ==========================

const cart = JSON.parse(localStorage.getItem("cart")) || [];

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

    cart.forEach(item => {

        const qty = item.qty || 1;

        const total = qty * item.price;

        subtotal += total;

        checkoutList.innerHTML += `
        <div class="checkout-item">

            <div>

                <strong>${item.name}</strong><br>

                <small>${qty} x Rp ${item.price.toLocaleString("id-ID")}</small>

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

document
.querySelectorAll("input[name='shipping']")
.forEach(item => {

    item.addEventListener("change", updateShipping);

});

// ==========================
// WHATSAPP
// ==========================

checkoutBtn.addEventListener("click", () => {

    const name =
        document.getElementById("fullname").value;

    const phone =
        document.getElementById("phone").value;

    const province =
        document.getElementById("province").value;

    const city =
        document.getElementById("city").value;

    const postcode =
        document.getElementById("postcode").value;

    const address =
        document.getElementById("detailAddress").value;

    const courier =
        document.querySelector("input[name='shipping']:checked").value;

    const payment =
        document.querySelector("input[name='payment']:checked").value;

    let message =
`Halo Admin DHUHA,

Saya ingin melakukan pemesanan.

━━━━━━━━━━━━━━
DATA PEMBELI
━━━━━━━━━━━━━━

Nama : ${name}
No WA : ${phone}

Provinsi : ${province}
Kota : ${city}
Kode Pos : ${postcode}

Alamat :
${address}

━━━━━━━━━━━━━━
PESANAN
━━━━━━━━━━━━━━

`;

    cart.forEach(item => {

        const qty = item.qty || 1;

        message +=
`${item.name}
Qty : ${qty}
Harga : Rp ${item.price.toLocaleString("id-ID")}

`;

    });

    message +=
`━━━━━━━━━━━━━━

Kurir : ${courier}
Estimasi : ${shippingEstimate}

Subtotal : Rp ${subtotal.toLocaleString("id-ID")}
Ongkir : Rp ${shippingCost.toLocaleString("id-ID")}
Total : Rp ${(subtotal + shippingCost).toLocaleString("id-ID")}

Pembayaran : ${payment}

Terima kasih.
`;

    localStorage.setItem("order", JSON.stringify({
    items: cart,
    subtotal,
    shipping: shippingCost,
    total: subtotal + shippingCost,
    payment: document.querySelector("input[name='payment']:checked").value,
    status: "Menunggu Pembayaran"
}));

window.location.href = "payment.html";

});

// ==========================
// LOAD
// ==========================

renderCheckout();
