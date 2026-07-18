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
loadProduct();

const btn = document.getElementById("add-cart");

if(btn){
    btn.onclick = addToCart;
}

const wishBtn = document.getElementById("wishlist-btn");

if(wishBtn){

    wishBtn.onclick = () => {

        let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

        const exist = wishlist.find(item => item.id === productData.id);

        if(!exist){

            wishlist.push(productData);

            localStorage.setItem("wishlist", JSON.stringify(wishlist));

            alert("Ditambahkan ke Wishlist");

        }else{

            alert("Produk sudah ada di Wishlist");

        }

    };

}
    let
