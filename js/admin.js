// =====================================
// DHUHA ADMIN DASHBOARD
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    loadDashboard();

});

// =====================================
// LOAD DASHBOARD
// =====================================

function loadDashboard() {

    const products =
        JSON.parse(localStorage.getItem("products")) || [];

    const orders =
        JSON.parse(localStorage.getItem("orders")) || [];

    // ==========================
    // TOTAL PRODUK
    // ==========================

    document.getElementById("total-products").textContent =
        products.length;

    // ==========================
    // TOTAL PESANAN
    // ==========================

    document.getElementById("total-orders").textContent =
        orders.length;

    // ==========================
    // TOTAL PELANGGAN
    // ==========================

    const customers = [];

    orders.forEach(order => {

        if (!customers.includes(order.customer.phone)) {

            customers.push(order.customer.phone);

        }

    });

    document.getElementById("total-customers").textContent =
        customers.length;

    // ==========================
    // TOTAL PENDAPATAN
    // ==========================

    let income = 0;

    orders.forEach(order => {

        if (
            order.status === "Diproses" ||
            order.status === "Dikirim" ||
            order.status === "Selesai"
        ) {

            income += Number(order.total);

        }

    });

    document.getElementById("total-income").textContent =
        "Rp " + income.toLocaleString("id-ID");

    // ==========================
    // PRODUK TERBARU
    // ==========================

    const latestProducts =
        document.getElementById("latest-products");

    if (latestProducts) {

        latestProducts.innerHTML = "";

        if (products.length === 0) {

            latestProducts.innerHTML =
                "<p>Belum ada produk.</p>";

        } else {

            products
                .slice(-5)
                .reverse()
                .forEach(product => {

                    latestProducts.innerHTML += `

<div class="latest-item">

<img src="${product.image}" width="55">

<div>

<strong>${product.name}</strong>

<br>

<small>

Rp ${Number(product.price).toLocaleString("id-ID")}

</small>

</div>

</div>

`;

                });

        }

    }

    // ==========================
    // PESANAN TERBARU
    // ==========================

    const latestOrders =
        document.getElementById("latest-orders");

    if (latestOrders) {

        latestOrders.innerHTML = "";

        if (orders.length === 0) {

            latestOrders.innerHTML =

            `<tr>

<td colspan="4">

Belum ada pesanan

</td>

</tr>`;

        } else {

            orders
                .slice(0, 5)
                .forEach((order, index) => {

                    latestOrders.innerHTML += `

<tr>

<td>${index + 1}</td>

<td>${order.customer.name}</td>

<td>

Rp ${Number(order.total).toLocaleString("id-ID")}

</td>

<td>${order.status}</td>

</tr>

`;

                });

        }

    }

}
