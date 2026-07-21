// ==============================
// DHUHA ADMIN ADD PRODUCT
// ==============================

const form = document.getElementById("add-product-form");
const imageInput = document.getElementById("product-image");
const preview = document.getElementById("preview-image");

// Preview gambar
imageInput.addEventListener("change", () => {

    const file = imageInput.files[0];

    if (!file) return;

    preview.src = URL.createObjectURL(file);

});

// Simpan Produk
form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const name = document.getElementById("product-name").value.trim();
    const category = document.getElementById("product-category").value;
    const price = Number(document.getElementById("product-price").value);
    const stock = Number(document.getElementById("product-stock").value);
    const description = document.getElementById("product-description").value.trim();
    const file = imageInput.files[0];

    if (!name || !category || !price || !stock || !file) {
        alert("Mohon lengkapi semua data.");
        return;
    }

    try {

        // Nama file unik
        const fileName =
            Date.now() + "-" + file.name.replace(/\s+/g, "-");

        // Upload ke Storage
        const fileExt = file.name.split(".").pop();
const fileName = `${Date.now()}.${fileExt}`;

const { error: uploadError } =
await window.supabaseClient.storage
.from("products")
.upload(fileName, file, {
    cacheControl: "3600",
    upsert: false
});

if (uploadError) throw uploadError;

        // Ambil URL gambar
        const {
            data: { publicUrl }
        } = window.supabaseClient.storage
            .from("products")
            .getPublicUrl(fileName);

        // Simpan ke database
        const { error } =
            await window.supabaseClient.from("products")
            .insert([{

                name: name,

                description: description,

                price: price,

                image_url: publicUrl,

                category: category,

                stock: stock

            }]);

        if (error) throw error;

        alert("Produk berhasil ditambahkan.");

        window.location.href = "products.html";

    } catch (err) {

        console.error(err);

        alert("Gagal upload produk.\n" + err.message);

    }

});
