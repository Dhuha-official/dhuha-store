// =====================================
// DHUHA PRODUCT
// BAGIAN 1
// =====================================

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

let productData = null;

let selectedSize = "";
let selectedColor = "";
let quantity = 1;

// =====================================
// LOAD
// =====================================

document.addEventListener("DOMContentLoaded", async () => {

    await loadProduct();

    initQty();

});

// =====================================
// LOAD PRODUCT
// =====================================

async function loadProduct() {

    try {

        const { data, error } =
        await window.supabaseClient
        .from("products")
        .select("*")
        .eq("id", productId)
        .single();

        if (error) throw error;

        productData = data;

        // =====================================
// LOAD PRODUCT IMAGES
// =====================================

const { data: images } =
await window.supabaseClient
.from("product_images")
.select("*")
.eq("product_id", productId)
.order("sort_order");

window.productImages = images || [];
        
        // =====================================
// LOAD MULTIPLE IMAGE
// =====================================

const images = data.images
? data.images.split(",")
: [data.image_url];

window.productImages = images;

const mainImage =
document.getElementById("product-image");

if (window.productImages.length > 0) {

    mainImage.src =
    window.productImages[0].image_url;

    renderProductImages();

} else {

    mainImage.src = data.image_url;

}
renderThumbnails(images);
        document.getElementById("product-name").innerText =
        data.name;

        document.getElementById("product-price").innerText =
        "Rp " + Number(data.price).toLocaleString("id-ID");

        document.getElementById("product-description").innerText =
        data.description || "";

        // =====================
        // SIZE
        // =====================

        const sizeList =
        document.querySelector(".size-list");

        sizeList.innerHTML = "";

        if (data.sizes) {

            const sizes =
            data.sizes.split(",");

            selectedSize =
            sizes[0].trim();

            sizes.forEach(size => {

                sizeList.innerHTML += `
<button
class="size-btn"
data-size="${size.trim()}">

${size.trim()}

</button>
`;

            });

        }

        // =====================
        // COLOR
        // =====================

        const colorList =
        document.querySelector(".color-list");

        colorList.innerHTML = "";

        if (data.colors) {

            const colors =
            data.colors.split(",");

            selectedColor =
            colors[0].trim();

            colors.forEach(color => {

                colorList.innerHTML += `
<button
class="color-btn"
data-color="${color.trim()}">

${color.trim()}

</button>
`;

            });

        }

        initSize();

        initColor();

        loadRelatedProducts();

    } catch (err) {

        console.error(err);

        alert("Produk tidak ditemukan.");

    }

}

// =====================================
// SIZE
// =====================================

function initSize() {

    const buttons =
    document.querySelectorAll(".size-btn");

    buttons.forEach((btn,index)=>{

        if(index===0){

            btn.classList.add("active");

        }

        btn.onclick=()=>{

            buttons.forEach(b=>
                b.classList.remove("active")
            );

            btn.classList.add("active");

            selectedSize =
            btn.dataset.size;

        };

    });

}

// =====================================
// COLOR
// =====================================

function initColor(){

    const buttons =
    document.querySelectorAll(".color-btn");

    buttons.forEach((btn,index)=>{

        if(index===0){

            btn.classList.add("active");

        }

        btn.onclick=()=>{

            buttons.forEach(b=>
                b.classList.remove("active")
            );

            btn.classList.add("active");

            selectedColor =
            btn.dataset.color;

        };

    });

}

// =====================================
// QTY
// =====================================

function initQty(){

    const qty =
    document.getElementById("qty");

    document.getElementById("plus").onclick=()=>{

        quantity++;

        qty.innerText=quantity;

    };

    document.getElementById("minus").onclick=()=>{

        if(quantity>1){

            quantity--;

            qty.innerText=quantity;

        }

    };

        }
// =====================================
// ADD TO CART
// =====================================

document.getElementById("add-cart").onclick = () => {

    if (!productData) return;

    let cart =
    JSON.parse(localStorage.getItem("cart")) || [];

    const index =
    cart.findIndex(item =>

        item.id === productData.id &&
        item.size === selectedSize &&
        item.color === selectedColor

    );

    if (index > -1) {

        cart[index].qty += quantity;

    } else {

        cart.push({

            id: productData.id,

            name: productData.name,

            image: productData.image_url,

            price: productData.price,

            size: selectedSize,

            color: selectedColor,

            qty: quantity

        });

    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    if (typeof updateCartBadge === "function") {

        updateCartBadge();

    }

    alert("Produk berhasil ditambahkan ke keranjang.");

};

// =====================================
// WISHLIST
// =====================================

document.getElementById("wishlist-btn").onclick = () => {

    if (!productData) return;

    let wishlist =
    JSON.parse(localStorage.getItem("wishlist")) || [];

    const exist =
    wishlist.find(item => item.id === productData.id);

    if (exist) {

        alert("Produk sudah ada di wishlist.");

        return;

    }

    wishlist.push({

        id: productData.id,

        name: productData.name,

        image: productData.image_url,

        price: productData.price

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

document.querySelector(".checkout-btn").onclick = () => {

    if (!productData) return;

    const item = {

        id: productData.id,

        name: productData.name,

        image: productData.image_url,

        price: productData.price,

        qty: quantity,

        size: selectedSize,

        color: selectedColor

    };

    localStorage.setItem(
        "buyNow",
        JSON.stringify([item])
    );

    location.href = "checkout.html";

};
// =====================================
// RELATED PRODUCTS
// =====================================

async function loadRelatedProducts() {

    if (!productData) return;

    try {

        const { data, error } =
        await window.supabaseClient
        .from("products")
        .select("*")
        .eq("category", productData.category)
        .neq("id", productData.id)
        .limit(4);

        if (error) throw error;

        renderRelatedProducts(data || []);

    } catch (err) {

        console.error(err);

    }

}

function renderRelatedProducts(list) {

    const container =
    document.getElementById("related-products");

    if (!container) return;

    container.innerHTML = "";

    if (list.length === 0) {

        container.innerHTML =
        "<p>Tidak ada produk lainnya.</p>";

        return;

    }

    list.forEach(product => {

        container.innerHTML += `

<a href="product.html?id=${product.id}" class="product-card">

    <div class="product-image">

        <img src="${product.image_url}" alt="${product.name}">

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
// UPDATE ICON
// =====================================

if (typeof lucide !== "undefined") {
function renderThumbnails(images){

    const container =
    document.getElementById("product-thumbnails");

    if(!container) return;

    container.innerHTML = "";

    images.forEach((img,index)=>{

        container.innerHTML += `

<img
src="${img}"
class="thumb-img ${index===0?'active':''}"
onclick="changeImage(${index})">

`;

    });

}

function changeImage(index){

    document.getElementById("product-image").src =
    window.productImages[index];

    document
    .querySelectorAll(".thumb-img")
    .forEach(img=>img.classList.remove("active"));

    document
    .querySelectorAll(".thumb-img")[index]
    .classList.add("active");

}
    lucide.createIcons();

}
// =====================================
// PRODUCT GALLERY
// =====================================

function renderProductImages() {

    const container =
    document.getElementById("product-thumbnails");

    if (!container) return;

    container.innerHTML = "";

    window.productImages.forEach((img, index) => {

        container.innerHTML += `

<img
src="${img.image_url}"
class="product-thumb ${index===0?'active':''}"
onclick="changeImage('${img.image_url}',this)">

`;

    });

}

function changeImage(url, element){

    document.getElementById("product-image").src = url;

    document
    .querySelectorAll(".product-thumb")
    .forEach(img=>img.classList.remove("active"));

    element.classList.add("active");

}
