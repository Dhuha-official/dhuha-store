let productData = null;

async function loadProduct(){

    const params = new URLSearchParams(window.location.search);

    const id = Number(params.get("id"));

    try{

        const response = await fetch("data/products.json");

        const products = await response.json();

        productData = products.find(item=>item.id===id);

        if(!productData){

            document.body.innerHTML="<h2 style='text-align:center;padding:50px'>Produk tidak ditemukan</h2>";

            return;

        }

        document.getElementById("product-image").src=productData.image;

        document.getElementById("product-name").textContent=productData.name;

        document.getElementById("product-price").textContent=
        "Rp "+Number(productData.price).toLocaleString("id-ID");

        const desc=document.getElementById("product-description");

        if(desc){

            desc.textContent=productData.description;

        }

    }catch(err){

        console.error(err);

    }

}

function addToCart(){

    let
