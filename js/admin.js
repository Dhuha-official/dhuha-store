/* ==========================================
   DHUHA ADMIN DASHBOARD
========================================== */

// ===========================
// LOGIN CHECK
// ===========================

if (localStorage.getItem("adminLogin") !== "true") {
    window.location.href = "login.html";
}

// ===========================
// LOGOUT
// ===========================

const logoutBtn = document.querySelector(".sidebar-menu a[href='login.html']");

if (logoutBtn) {

    logoutBtn.addEventListener("click", function (e) {

        e.preventDefault();

        if (confirm("Keluar dari Dashboard Admin?")) {

            localStorage.removeItem("adminLogin");

            window.location.href = "login.html";

        }

    });

}

// ===========================
// DATA
// ===========================

let products = [];
let orders = [];
let customers = [];

// ===========================
// LOAD PRODUCT
// ===========================

async function loadProducts() {

    try {

        const response = await fetch("../data/products.json");

        products = await response.json();

        document.getElementById("total-products").textContent =
            products.length;

        renderLatestProducts();

    } catch (err) {

        console.log(err);

    }

}

// ===========================
// LOAD ORDER
// ===========================

function loadOrders() {

    orders = JSON.parse(localStorage.getItem("orders")) || [];

    document.getElementById("total-orders").textContent =
        orders.length;

    renderLatestOrders();

}

// ===========================
// LOAD CUSTOMER
// ===========================

function loadCustomers() {

    customers = JSON.parse(localStorage.getItem("customers")) || [];

    document.getElementById("total-customers").textContent =
        customers.length;

}

// ===========================
// TOTAL INCOME
// ===========================

function loadIncome() {

    let total = 0;

    orders.forEach(order => {

        total += order.total || 0;

    });

    document.getElementById("total-income").textContent =
        "Rp " + total.toLocaleString("id-ID");

}
