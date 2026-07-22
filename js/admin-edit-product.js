// ======================================
// DHUHA ADMIN EDIT PRODUCT
// ======================================

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

const form = document.getElementById("edit-product-form");
const imageInput = document.getElementById("edit-image");
const preview = document.getElementById("edit-preview");

let oldImage = "";

// ======================================
// LOAD PRODUCT
// ======================================

loadProduct();

async function loadProduct() {

    try {

        const { data, error } =
        await window.supabaseClient
        .from("products")
        .select("*")
        .eq("id", productId)
        .single();

        if (error) throw error;

        document.getElementById("edit-name").value =
        data.name;

        document.getElementById("edit-category").value =
        data.category;

        document.getElementById("edit-price").value =
        data.price;

        document.getElementById("edit-stock").value =
        data.stock;

        document.getElementById("edit-description").value =
        data.description || "";

        preview.src =
        data.image_url;

        oldImage = data.image_url;

    } catch (err) {

        console.error(err);

        alert("Produk tidak ditemukan.");

    }

}

// ======================================
// PREVIEW IMAGE
// ======================================

imageInput.addEventListener("change", () => {

    const file = imageInput.files[0];

    if (!file) return;

    preview.src =
    URL.createObjectURL(file);

});
// ======================================
// SIMPAN PERUBAHAN
// ======================================

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    let imageUrl = oldImage;

    try {

        // Upload gambar baru jika dipilih
        if (imageInput.files.length > 0) {

            const file = imageInput.files[0];

            const fileName =
            Date.now() + "-" +
            file.name.replace(/\s+/g, "-");

            const { error: uploadError } =
            await window.supabaseClient.storage
            .from("products")
            .upload(fileName, file);

            if (uploadError) throw uploadError;

            const {
                data: { publicUrl }
            } =
            window.supabaseClient.storage
            .from("products")
            .getPublicUrl(fileName);

            imageUrl = publicUrl;

        }

        const { error } =
        await window.supabaseClient
        .from("products")
        .update({

            name:
            document.getElementById("edit-name").value,

            category:
            document.getElementById("edit-category").value,

            price:
            Number(document.getElementById("edit-price").value),

            stock:
            Number(document.getElementById("edit-stock").value),

            description:
            document.getElementById("edit-description").value,

            image_url:
            imageUrl

        })
        .eq("id", productId);

        if (error) throw error;

        alert("Produk berhasil diperbarui.");

        window.location.href =
        "products.html";

    } catch (err) {

        console.error(err);

        alert(err.message);

    }

});
// ======================================
// HAPUS PRODUK
// ======================================

document
.getElementById("delete-product")
.addEventListener("click", async () => {

    const konfirmasi =
    confirm("Yakin ingin menghapus produk ini?");

    if (!konfirmasi) return;

    try {

        const { error } =
        await window.supabaseClient
        .from("products")
        .delete()
        .eq("id", productId);

        if (error) throw error;

        alert("Produk berhasil dihapus.");

        window.location.href =
        "products.html";

    } catch (err) {

        console.error(err);

        alert(err.message);

    }

});
