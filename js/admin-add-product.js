// ======================================
// DHUHA ADMIN ADD PRODUCT
// ======================================

const form = document.getElementById("add-product-form");
const imageInput = document.getElementById("product-image");
const preview = document.getElementById("preview-image");

// Preview gambar
imageInput.onchange = () => {

    const file = imageInput.files[0];

    if (file) {

        preview.src = URL.createObjectURL(file);

    }

};

// Submit
form.addEventListener("submit", async (e) => {

    e.preventDefault();

    // Ambil data form
    const name = document.getElementById("product-name").value.trim();
    const category = document.getElementById("product-category").value;
    const price = Number(document.getElementById("product-price").value);
    const stock = Number(document.getElementById("product-stock").value);
    const description = document.getElementById("product-description").value.trim();
    const colors = document.getElementById("product-colors").value.trim();
    const sizes = document.getElementById("product-sizes").value.trim();

    const file = imageInput.files[0];

    if (!name || !category || !price || !stock || !file) {

        alert("Mohon lengkapi semua data.");

        return;

    }

    // Upload gambar
    const fileExt = file.name.split(".").pop();
    const fileName = Date.now() + "." + fileExt;

    const { error: uploadError } =
        await window.supabaseClient.storage
        .from("products")
        .upload(fileName, file);

    if (uploadError) {

        alert(uploadError.message);

        return;

    }

    // URL gambar
    const { data } =
        window.supabaseClient.storage
        .from("products")
        .getPublicUrl(fileName);

    const imageUrl = data.publicUrl;

    // Simpan ke database
    const { error } =
        await window.supabaseClient
        .from("products")
        .insert([{

            name: name,
            category: category,
            price: price,
            stock: stock,
            description: description,
            colors: colors,
            sizes: sizes,
            image_url: imageUrl

        }]);

    if (error) {

        alert(error.message);

        return;

    }

    alert("Produk berhasil ditambahkan.");

    location.href = "products.html";

});
