// ===============================
// DHUHA ADMIN PRODUCTS
// ===============================

let allProducts = [];

// ===============================
// LOAD PRODUCTS
// ===============================

async function loadProducts() {

    const tbody = document.getElementById("product-list-admin");

    if (!tbody) return;

    tbody.innerHTML = `
    <tr>
        <td colspan="6">Loading...</td>
    </tr>
    `;

    try {

        const { data, error } = await window.supabaseClient
            .from("products")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) throw error;

        allProducts = data || [];

        renderProducts(allProducts);

    } catch (err) {

        console.error(err);

        tbody.innerHTML = `
        <tr>
            <td colspan="6">
                Gagal memuat produk
            </td>
        </tr>
        `;

    }

}

// ===============================
// RENDER PRODUCTS
// ===============================

function renderProducts(list) {

    const tbody = document.getElementById("product-list-admin");

    if (!tbody) return;

    tbody.innerHTML = "";

    if (list.length === 0) {

        tbody.innerHTML = `
        <tr>
            <td colspan="6">
                Tidak ada produk
            </td>
        </tr>
        `;

        return;

    }

    list.forEach(product => {

        tbody.innerHTML += `

<tr>

<td>

<img
src="${product.image_url}"
style="width:60px;height:60px;object-fit:cover;border-radius:10px;">

</td>

<td>${product.name}</td>

<td>${product.category}</td>

<td>

Rp ${Number(product.price).toLocaleString("id-ID")}

</td>

<td>${product.stock}</td>

<td>

<a
href="edit-product.html?id=${product.id}"
class="btn">

Edit

</a>

<button
class="btn delete-btn"
onclick="deleteProduct('${product.id}')">

Hapus

</button>

</td>

</tr>

`;

    });

}

// ===============================
// DELETE
// ===============================

async function deleteProduct(id) {

    if (!confirm("Yakin ingin menghapus produk ini?")) return;

    try {

        const { error } = await window.supabaseClient
            .from("products")
            .delete()
            .eq("id", id);

        if (error) throw error;

        alert("Produk berhasil dihapus.");

        loadProducts();

    } catch (err) {

        console.error(err);

        alert(err.message);

    }

}

// ===============================
// SEARCH
// ===============================

const searchInput = document.getElementById("search-product");

if (searchInput) {

    searchInput.addEventListener("input", function () {

        const keyword = this.value.toLowerCase();

        const result = allProducts.filter(product =>
            product.name.toLowerCase().includes(keyword)
        );

        renderProducts(result);

    });

}

// ===============================
// FILTER
// ===============================

const filterCategory = document.getElementById("filter-category");

if (filterCategory) {

    filterCategory.addEventListener("change", function () {

        if (this.value === "Semua") {

            renderProducts(allProducts);

            return;

        }

        const result = allProducts.filter(product =>
            product.category === this.value
        );

        renderProducts(result);

    });

}

// ===============================
// START
// ===============================

loadProducts();
