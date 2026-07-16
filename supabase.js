const supabaseUrl = "https://valwpmiwzaqgijtrbizl.supabase.co";
const supabaseKey = "sb_publishable_REbhQNOsjfE4aT5oMXX6YA_COOzqYF8";

window.supabaseClient = window.supabase.createClient(
    supabaseUrl,
    supabaseKey
);

async function loadProducts() {
    const container = document.getElementById("product-list");
    if (!container) return;

    const { data, error } = await window.supabaseClient
        .from("products")
        .select("*");

    if (error) {
        console.error(error);
        return;
    }

    container.innerHTML = "";

    data.forEach(product => {
        container.innerHTML += `
<div class="product">
    <img src="${product.image_url}" alt="${product.name}" class="product-image">

    <h3>${product.name}</h3>

    <p>Rp ${Number(product.price).toLocaleString("id-ID")}</p>

    <a href="product.html?id=${product.id}" class="btn-product">
        Lihat Produk
    </a>
</div>`;
    });
}

loadProducts();
