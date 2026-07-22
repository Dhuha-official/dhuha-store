// =====================================
// DHUHA PRODUCT
// FINAL VERSION
// BAGIAN 1
// =====================================

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

let productData = null;
let productImages = [];

let selectedSize = "";
let selectedColor = "";

let quantity = 1;
let currentImage = 0;

// =====================================
// START
// =====================================

document.addEventListener("DOMContentLoaded", async () => {

    await loadProduct();

    initQuantity();

});

// =====================================
// LOAD PRODUCT
// =====================================

async function loadProduct(){

    try{

        // ==========================
        // PRODUCT
        // ==========================

        const { data, error } =
        await window.supabaseClient
        .from("products")
        .select("*")
        .eq("id",productId)
        .single();

        if(error) throw error;

        productData = data;

        // ==========================
        // PRODUCT IMAGES
        // ==========================

        const { data: gallery } =
        await window.supabaseClient
        .from("product_images")
        .select("*")
        .eq("product_id",productId)
        .order("sort_order");

        productImages = gallery || [];

        if(productImages.length===0){

            productImages = [{

                image_url:data.image_url,

                sort_order:1

            }];

        }

        currentImage = 0;

        // ==========================
        // MAIN IMAGE
        // ==========================

        document.getElementById("product-image").src =
        productImages[0].image_url;

        // ==========================
        // PRODUCT INFO
        // ==========================

        document.getElementById("product-name").innerText =
        data.name;

        document.getElementById("product-price").innerText =
        "Rp " +
        Number(data.price).toLocaleString("id-ID");

        document.getElementById("product-description").innerText =
        data.description || "";

        renderGallery();

        renderSizes();

        renderColors();

        loadRelatedProducts();

    }catch(err){

        console.error(err);

        alert("Produk tidak ditemukan.");

    }

            }
// =====================================
// SIZE
// =====================================

function renderSizes(){

    const container =
    document.querySelector(".size-list");

    container.innerHTML = "";

    if(!productData.sizes) return;

    const sizes =
    productData.sizes.split(",");

    selectedSize = sizes[0].trim();

    sizes.forEach((size,index)=>{

        container.innerHTML += `

<button
class="size-btn ${index===0?'active':''}"
data-size="${size.trim()}">

${size.trim()}

</button>

`;

    });

    document
    .querySelectorAll(".size-btn")
    .forEach(btn=>{

        btn.onclick=()=>{

            document
            .querySelectorAll(".size-btn")
            .forEach(b=>b.classList.remove("active"));

            btn.classList.add("active");

            selectedSize =
            btn.dataset.size;

        };

    });

}

// =====================================
// COLOR
// =====================================

function renderColors(){

    const container =
    document.querySelector(".color-list");

    container.innerHTML = "";

    if(!productData.colors) return;

    const colors =
    productData.colors.split(",");

    selectedColor = colors[0].trim();

    colors.forEach((color,index)=>{

        container.innerHTML += `

<button
class="color-btn ${index===0?'active':''}"
data-color="${color.trim()}">

${color.trim()}

</button>

`;

    });

    document
    .querySelectorAll(".color-btn")
    .forEach(btn=>{

        btn.onclick=()=>{

            document
            .querySelectorAll(".color-btn")
            .forEach(b=>b.classList.remove("active"));

            btn.classList.add("active");

            selectedColor =
            btn.dataset.color;

        };

    });

}

// =====================================
// QUANTITY
// =====================================

function initQuantity(){

    const qty =
    document.getElementById("qty");

    document.getElementById("plus").onclick=()=>{

        quantity++;

        qty.innerText = quantity;

    };

    document.getElementById("minus").onclick=()=>{

        if(quantity<=1) return;

        quantity--;

        qty.innerText = quantity;

    };

}

// =====================================
// PRODUCT GALLERY
// =====================================

function renderGallery(){

    const container =
    document.getElementById("product-thumbnails");

    if(!container) return;

    container.innerHTML = "";

    productImages.forEach((img,index)=>{

        container.innerHTML += `

<img
src="${img.image_url}"
class="product-thumb ${index===0?'active':''}"
data-index="${index}">

`;

    });

    document
    .querySelectorAll(".product-thumb")
    .forEach((thumb,index)=>{

        thumb.onclick=()=>{

            currentImage=index;

            updateGallery();

        };

    });

    initSwipe();

}

function updateGallery(){

    document.getElementById("product-image").src =
    productImages[currentImage].image_url;

    document
    .querySelectorAll(".product-thumb")
    .forEach((thumb,index)=>{

        thumb.classList.toggle(
            "active",
            index===currentImage
        );

    });

}
// =====================================
// SWIPE GALLERY
// =====================================

function initSwipe(){

    const image =
    document.getElementById("product-image");

    let startX = 0;

    image.addEventListener("touchstart",(e)=>{

        startX =
        e.touches[0].clientX;

    });

    image.addEventListener("touchend",(e)=>{

        const endX =
        e.changedTouches[0].clientX;

        const distance =
        startX - endX;

        if(Math.abs(distance)<50) return;

        if(distance>0){

            nextImage();

        }else{

            prevImage();

        }

    });

}

function nextImage(){

    currentImage++;

    if(currentImage>=productImages.length){

        currentImage=0;

    }

    updateGallery();

}

function prevImage(){

    currentImage--;

    if(currentImage<0){

        currentImage=
        productImages.length-1;

    }

    updateGallery();

}

// =====================================
// ADD TO CART
// =====================================

document.getElementById("add-cart").onclick = ()=>{

    if(!productData) return;

    let cart =
    JSON.parse(localStorage.getItem("cart")) || [];

    const index =
    cart.findIndex(item=>

        item.id===productData.id &&
        item.size===selectedSize &&
        item.color===selectedColor

    );

    if(index>-1){

        cart[index].qty += quantity;

    }else{

        cart.push({

            id:productData.id,

            name:productData.name,

            image:productImages[0].image_url,

            price:productData.price,

            size:selectedSize,

            color:selectedColor,

            qty:quantity

        });

    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    if(typeof updateCartBadge==="function"){

        updateCartBadge();

    }

    alert("Produk berhasil ditambahkan ke keranjang.");

};

// =====================================
// WISHLIST
// =====================================

document.getElementById("wishlist-btn").onclick=()=>{

    if(!productData) return;

    let wishlist =
    JSON.parse(localStorage.getItem("wishlist")) || [];

    const exist =
    wishlist.find(item=>

        item.id===productData.id

    );

    if(exist){

        alert("Produk sudah ada di wishlist.");

        return;

    }

    wishlist.push({

        id:productData.id,

        name:productData.name,

        image:productImages[0].image_url,

        price:productData.price

    });

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

    alert("Produk berhasil ditambahkan ke wishlist.");

};

// =====================================
// BUY NOW
// =====================================

document.getElementById("buy-now").onclick=()=>{

    if(!productData) return;

    const checkout=[{

        id:productData.id,

        name:productData.name,

        image:productImages[0].image_url,

        price:productData.price,

        qty:quantity,

        size:selectedSize,

        color:selectedColor

    }];

    localStorage.setItem(
        "buyNow",
        JSON.stringify(checkout)
    );

    location.href="checkout.html";

};
// =====================================
// RELATED PRODUCTS
// =====================================

async function loadRelatedProducts(){

    if(!productData) return;

    try{

        const { data, error } =
        await window.supabaseClient
        .from("products")
        .select("*")
        .eq("category",productData.category)
        .neq("id",productData.id)
        .limit(4);

        if(error) throw error;

        renderRelatedProducts(data||[]);

    }catch(err){

        console.error(err);

    }

}

function renderRelatedProducts(products){

    const container =
    document.getElementById("related-products");

    if(!container) return;

    container.innerHTML="";

    if(products.length===0){

        container.innerHTML=
        "<p>Tidak ada produk lainnya.</p>";

        return;

    }

    products.forEach(product=>{

        container.innerHTML+=`

<a href="product.html?id=${product.id}" class="product-card">

<div class="product-image">

<img
src="${product.image_url}"
alt="${product.name}">

</div>

<div class="product-info">

<h3>${product.name}</h3>

<p class="price">

Rp ${Number(product.price).toLocaleString("id-ID")}

</p>

</div>

</a>

`;

    });

}

// =====================================
// AUTO UPDATE THUMBNAIL
// =====================================

const observer = new MutationObserver(()=>{

    const thumbs =
    document.querySelectorAll(".product-thumb");

    thumbs.forEach((thumb,index)=>{

        thumb.onclick=()=>{

            currentImage=index;

            updateGallery();

        };

    });

});

observer.observe(

document.body,

{

childList:true,

subtree:true

}

);

// =====================================
// LUCIDE
// =====================================

if(typeof lucide!=="undefined"){

    lucide.createIcons();

}

// =====================================
// END
// =====================================
const viewer =
document.getElementById("imageViewer");

const viewerImg =
document.getElementById("viewerImage");

document.getElementById("product-image").onclick=()=>{

    viewer.style.display="flex";

    viewerImg.src=
    document.getElementById("product-image").src;

};

document.getElementById("closeViewer").onclick=()=>{

    viewer.style.display="none";

};

viewer.onclick=(e)=>{

    if(e.target===viewer){

        viewer.style.display="none";

    }

};
