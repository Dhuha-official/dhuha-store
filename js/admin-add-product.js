// =====================================
// DHUHA ADMIN ADD PRODUCT
// BAGIAN 1
// =====================================

const form = document.getElementById("add-product-form");
const imageInput = document.getElementById("product-image");
const preview = document.getElementById("preview-image");

imageInput.onchange = () => {

    const files = imageInput.files;

    if (files.length > 0) {

        preview.src = URL.createObjectURL(files[0]);

    }

};

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const files = imageInput.files;

    if (files.length === 0) {

        alert("Pilih minimal 1 gambar.");
        return;

    }

    const imageUrls = [];

    for (const file of files) {

        const fileExt = file.name.split(".").pop();

        const fileName =
            Date.now() +
            "-" +
            Math.random().toString(36).substring(2,8) +
            "." +
            fileExt;

        const { error: uploadError } =
        await window.supabaseClient.storage
        .from("products")
        .upload(fileName, file);

        if (uploadError) {

            alert(uploadError.message);
            return;

        }

        const { data } =
        window.supabaseClient.storage
        .from("products")
        .getPublicUrl(fileName);

        imageUrls.push(data.publicUrl);

    }

    const name =
    document.getElementById("product-name").value.trim();

    const category =
    document.getElementById("product-category").value;

    const price =
    Number(document.getElementById("product-price").value);

    const stock =
    Number(document.getElementById("product-stock").value);

    const description =
    document.getElementById("product-description").value.trim();

    const colors =
    document.getElementById("product-colors").value.trim();

    const sizes =
    document.getElementById("product-sizes").value.trim();

const { data: product, error } =
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

    image_url: imageUrls[0]

}])
.select()
.single();

    if (error) {

    alert(error.message);

    return;

}

const imageRows = imageUrls.map((url, index) => ({

    product_id: product.id,

    image_url: url,

    sort_order: index + 1

}));

const { error: imageError } =
await window.supabaseClient
.from("product_images")
.insert(imageRows);

if (imageError) {

    alert(imageError.message);

    return;

    }
    
    if(error){

        alert(error.message);

        return;

    }

    alert("Produk berhasil ditambahkan.");

    form.reset();

    preview.src="../images/no-image.png";

    location.href="products.html";

});
