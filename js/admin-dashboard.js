// ======================================
// DHUHA ADMIN DASHBOARD
// ======================================

loadDashboard();

async function loadDashboard() {

    try {

        // Produk
        const {
            count: productCount
        } =
        await window.supabaseClient
        .from("products")
        .select("*", {
            count: "exact",
            head: true
        });

        // Pesanan
        const {
            data: orders
        } =
        await window.supabaseClient
        .from("orders")
        .select("*");

        const totalOrders =
        orders?.length || 0;

        // Omzet
        const revenue =
        (orders || []).reduce((sum, item) => {

            return sum + Number(item.total || 0);

        }, 0);

        // Pelanggan
        const customers =
        [...new Set(

            (orders || []).map(item =>
                item.phone
            )

        )];

        document.getElementById("total-products").innerHTML =
        productCount || 0;

        document.getElementById("total-orders").innerHTML =
        totalOrders;

        document.getElementById("total-customers").innerHTML =
        customers.length;

        document.getElementById("total-revenue").innerHTML =
        "Rp " +
        revenue.toLocaleString("id-ID");

    } catch (err) {

        console.error(err);

    }

          }
// ======================================
// PRODUK TERBARU
// ======================================

loadLatestProducts();

async function loadLatestProducts() {

    const container =
    document.getElementById("latest-products");

    if (!container) return;

    const { data, error } =
    await window.supabaseClient
    .from("products")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);

    if (error) {

        container.innerHTML = "Gagal memuat produk.";

        return;

    }

    container.innerHTML = "";

    data.forEach(product => {

        container.innerHTML += `

<div class="latest-product">

<img src="${product.image_url}">

<div>

<h4>${product.name}</h4>

<p>

Rp ${Number(product.price).toLocaleString("id-ID")}

</p>

</div>

</div>

`;

    });

        }
// ======================================
// PESANAN TERBARU
// ======================================

loadLatestOrders();

async function loadLatestOrders() {

    const tbody =
    document.getElementById("latest-orders");

    if (!tbody) return;

    const { data, error } =
    await window.supabaseClient
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);

    if (error) {

        tbody.innerHTML = `
<tr>
<td colspan="4">Gagal memuat data.</td>
</tr>`;

        return;

    }

    tbody.innerHTML = "";

    if (data.length === 0) {

        tbody.innerHTML = `
<tr>
<td colspan="4">Belum ada pesanan.</td>
</tr>`;

        return;

    }

    data.forEach(order => {

        tbody.innerHTML += `

<tr>

<td>${order.id}</td>

<td>${order.customer_name}</td>

<td>

Rp ${Number(order.total).toLocaleString("id-ID")}

</td>

<td>${order.status}</td>

</tr>

`;

    });

        }
