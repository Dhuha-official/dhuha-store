// ======================================
// DHUHA ADMIN ORDERS
// ======================================

let orders = [];

async function loadOrders() {

    try {

        const { data, error } =
        await window.supabaseClient
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

        if (error) throw error;

        orders = data || [];

        renderOrders();

    } catch (err) {

        console.error(err);

    }

}

function renderOrders() {

    const tbody =
    document.getElementById("orders-list");

    if (!tbody) return;

    tbody.innerHTML = "";

    if (orders.length === 0) {

        tbody.innerHTML = `
        <tr>
            <td colspan="8">Belum ada pesanan.</td>
        </tr>
        `;

        return;

    }

    orders.forEach(order => {

        tbody.innerHTML += `

<tr>

<td>${order.customer_name}</td>

<td>${order.product_name}</td>

<td>${order.quantity}</td>

<td>
Rp ${Number(order.total).toLocaleString("id-ID")}
</td>

<td>${order.courier}</td>

<td>${order.payment}</td>

<td>${order.status}</td>

<td>

<button
onclick="updateStatus('${order.id}')"
class="btn">

Update

</button>

</td>

</tr>

`;

    });

}

loadOrders();
// ======================================
// UPDATE STATUS
// ======================================

async function updateStatus(id) {

    const order =
    orders.find(item => item.id === id);

    if (!order) return;

    let status = order.status;

    switch (status) {

        case "Menunggu Pembayaran":
            status = "Diproses";
            break;

        case "Diproses":
            status = "Dikirim";
            break;

        case "Dikirim":
            status = "Selesai";
            break;

        default:
            alert("Pesanan sudah selesai.");
            return;

    }

    const { error } =
    await window.supabaseClient
    .from("orders")
    .update({

        status: status

    })
    .eq("id", id);

    if (error) {

        alert(error.message);

        return;

    }

    loadOrders();

}
