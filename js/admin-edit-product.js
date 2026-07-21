// ==============================
// DHUHA EDIT PRODUCT
// ==============================

const params = new URLSearchParams(location.search);
const id = params.get("id");

let oldImage = "";

const preview = document.getElementById("edit-preview");

async function loadProduct(){

    const {data,error} =
    await window.supabaseClient
    .from("products")
    .select("*")
    .eq("id",id)
    .single();

    if(error){

        alert("Produk tidak ditemukan.");

        location.href="products.html";

        return;

    }

    document.getElementById("edit-name").value = data.name;
    document.getElementById("edit-category").value = data.category;
    document.getElementById("edit-price").value = data.price;
    document.getElementById("edit-stock").value = data.stock;
    document.getElementById("edit-description").value = data.description;

    preview.src = data.image_url;

    oldImage = data.image_url;

}

loadProduct();

document.getElementById("edit-image").onchange = function(){

    const file = this.files[0];

    if(file){

        preview.src = URL.createObjectURL(file);

    }

};

document.getElementById("edit-product-form")
.addEventListener("submit",async(e)=>{

    e.preventDefault();

    let imageUrl = oldImage;

    const file =
    document.getElementById("edit-image").files[0];

    if(file){

        const fileName =
        Date.now()+"-"+file.name;

        const {error:uploadError} =
        await window.supabaseClient.storage
        .from("products")
        .upload(fileName,file);

        if(uploadError){

            alert(uploadError.message);

            return;

        }

        imageUrl =
        window.supabaseClient
        .storage
        .from("products")
        .getPublicUrl(fileName)
        .data.publicUrl;

    }

    const {error} =
    await window.supabaseClient
    .from("products")
    .update({

        name:document.getElementById("edit-name").value,

        category:document.getElementById("edit-category").value,

        description:document.getElementById("edit-description").value,

        price:Number(document.getElementById("edit-price").value),

        stock:Number(document.getElementById("edit-stock").value),

        image_url:imageUrl

    })
    .eq("id",id);

    if(error){

        alert(error.message);

        return;

    }

    alert("Produk berhasil diperbarui.");

    location.href="products.html";

});

document.getElementById("delete-product")
.onclick = async()=>{

    if(!confirm("Yakin ingin menghapus produk ini?")) return;

    const {error} =
    await window.supabaseClient
    .from("products")
    .delete()
    .eq("id",id);

    if(error){

        alert(error.message);

        return;

    }

    alert("Produk berhasil dihapus.");

    location.href="products.html";

};
