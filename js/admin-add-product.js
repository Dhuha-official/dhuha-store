// =====================================
// DHUHA ADMIN ADD PRODUCT
// FINAL
// BAGIAN 1
// =====================================

const form =
document.getElementById("add-product-form");

const imageInput =
document.getElementById("product-image");

const preview =
document.getElementById("preview-image");

// =====================================
// PREVIEW
// =====================================

imageInput.onchange = () => {

    const files = imageInput.files;

    if(files.length){

        preview.src =
        URL.createObjectURL(files[0]);

    }

};

// =====================================
// SUBMIT
// =====================================

form.addEventListener("submit", async(e)=>{

    e.preventDefault();

    const files =
    imageInput.files;

    if(files.length===0){

        alert("Pilih minimal 1 gambar.");

        return;

    }

    if(files.length>7){

        alert("Maksimal 7 gambar.");

        return;

    }

    const imageUrls=[];

    for(let i=0;i<files.length;i++){

        const file=files[i];

        const ext=
        file.name.split(".").pop();

        const fileName=

        Date.now()+"-"+

        Math.random()

        .toString(36)

        .substring(2,8)

        +"."+ext;

        const {error:uploadError}=

        await window.supabaseClient

        .storage

        .from("products")

        .upload(fileName,file);

        if(uploadError){

            alert(uploadError.message);

            return;

        }

        const {data}=

        window.supabaseClient

        .storage

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

    /// =====================================
// SIMPAN PRODUK
// =====================================

const { data: product, error } =
await window.supabaseClient
.from("products")
.insert([{

    name,

    category,

    price,

    stock,

    description,

    colors,

    sizes,

    image_url: imageUrls[0]

}])
.select()
.single();

if(error){

    alert(error.message);

    return;

}

// =====================================
// SIMPAN SEMUA GAMBAR
// =====================================

const gallery = [];

for(let i=0;i<imageUrls.length;i++){

    gallery.push({

        product_id: product.id,

        image_url: imageUrls[i],

        sort_order: i+1

    });

}

const { error: galleryError } =
await window.supabaseClient
.from("product_images")
.insert(gallery);

if(galleryError){

    alert(galleryError.message);

    return;

}

// =====================================
// SELESAI
// =====================================

alert("Produk berhasil ditambahkan.");

form.reset();

preview.src = "../images/no-image.png";

location.href = "products.html";
