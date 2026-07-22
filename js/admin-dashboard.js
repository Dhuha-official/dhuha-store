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
