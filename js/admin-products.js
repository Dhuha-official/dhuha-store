// ===============================
// DHUHA ADMIN PRODUCTS
// ===============================

let allProducts = [];

async function loadProducts() {

    const tbody = document.getElementById("product-list-admin");

    tbody.innerHTML = `
        <tr>
            <td colspan="6">Loading...</td>
        </tr>
    `;

    try {

        const { data, error } =
        await window.supabaseClient
        .from("products")
        .select("*")
        .order("created_at", { ascending:false });

        if(error) throw error;

        allProducts = data;

        renderProducts(allProducts);

    } catch(err){

        console.error(err);

        tbody.innerHTML=`
        <tr>
            <td colspan="6">
                Gagal memuat produk
            </td>
        </tr>
        `;

    }

}

function renderProducts(list){

    const tbody =
    document.getElementById("product-list-admin");

    tbody.innerHTML="";

    if(list.length===0){

        tbody.innerHTML=`
        <tr>
            <td colspan="6">
                Belum ada produk
            </td>
        </tr>
        `;

        return;

    }

    list.forEach(product=>{

        tbody.innerHTML+=`

<tr>

<td>

<img
src="${product.image_url}"
style="width:70px;height:70px;object-fit:cover;border-radius:10px;">

</td>

<td>${product.name}</td>

<td>${product.category}</td>

<td>

Rp ${Number(product.price).toLocaleString("id-ID")}

</td>

<td>${product.stock}</td>

<td>

<button
class="btn"
onclick="editProduct('${product.id}')">

Edit

</button>

<button
class="btn"
style="background:#d33;margin-left:6px;"
onclick="deleteProduct('${product.id}')">

Hapus

</button>

</td>

</tr>

`;

    });

}

async function deleteProduct(id){

    if(!confirm("Hapus produk ini?")) return;

    const {error}=await window.supabaseClient

    .from("products")

    .delete()

    .eq("id",id);

    if(error){

        alert(error.message);

        return;

    }

    alert("Produk berhasil dihapus.");

    loadProducts();

}

function editProduct(id){

    location.href=
    "edit-product.html?id="+id;

}

// SEARCH

document.getElementById("search-product")
.addEventListener("input",function(){

    const keyword=this.value.toLowerCase();

    const result=allProducts.filter(product=>

        product.name
        .toLowerCase()
        .includes(keyword)

    );

    renderProducts(result);

});

// FILTER

document.getElementById("filter-category")
.addEventListener("change",function(){

    if(this.value==="Semua"){

        renderProducts(allProducts);

        return;

    }

    renderProducts(

        allProducts.filter(product=>

            product.category===this.value

        )

    );

});

loadProducts();
