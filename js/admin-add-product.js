const form = document.getElementById("add-product-form");
const imageInput = document.getElementById("product-image");
const preview = document.getElementById("preview-image");

imageInput.onchange = () => {

    const file = imageInput.files[0];

    if(file){

        preview.src = URL.createObjectURL(file);

    }

};

form.addEventListener("submit", async(e)=>{

    e.preventDefault();

    const file = imageInput.files[0];

    if(!file){

        alert("Pilih gambar.");

        return;

    }

    const fileExt = file.name.split(".").pop();

    const fileName = Date.now()+"."+fileExt;

    const {error:uploadError} =
    await window.supabaseClient.storage
    .from("products")
    .upload(fileName,file);

    if(uploadError){

        alert(uploadError.message);

        return;

    }

    const {data} =
    window.supabaseClient.storage
    .from("products")
    .getPublicUrl(fileName);

    const imageUrl = data.publicUrl;

    const {error} =
    await window.supabaseClient
    .from("products")
    .insert([{

        const name = document.getElementById("product-name").value.trim();
const category = document.getElementById("product-category").value;
const price = Number(document.getElementById("product-price").value);
const stock = Number(document.getElementById("product-stock").value);
const description = document.getElementById("product-description").value.trim();

const colors =
document.getElementById("product-colors").value.trim();

const sizes =
document.getElementById("product-sizes").value.trim();

const file = imageInput.files[0];
    }]);

    if(error){

        alert(error.message);

        return;

    }

    alert("Produk berhasil ditambahkan.");

    location.href="products.html";

});
