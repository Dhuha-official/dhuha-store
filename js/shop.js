// =====================================
// DHUHA SHOP FINAL
// BAGIAN 1
// =====================================

let products = [];
let currentCategory = "Semua";
let currentSort = "newest";

document.addEventListener("DOMContentLoaded", async () => {

    await loadProducts();

    initSearch();

    initFilter();

    initSort();

    initBottomSheet();

    activeMenu();

    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }

});

// =====================================
// LOAD PRODUCTS FROM SUPABASE
// =====================================

async function loadProducts() {

    try {

        const { data, error } = await window.supabaseClient
            .from("products")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) throw error;

        products = data || [];

        filterAndRender();

    } catch (err) {

        console.error("Supabase Error :", err);

        document.getElementById("product-list").innerHTML = `
            <div class="empty-product">
                <h3>Gagal memuat produk</h3>
            </div>
        `;

    }

}

// =====================================
// RENDER PRODUCTS
// =====================================

function renderProducts(list) {

    const container =
        document.getElementById("product-list");

    if (!container) return;

    container.innerHTML = "";

    if (list.length === 0) {

        container.innerHTML = `
        <div class="empty-product">
            <h3>Produk tidak ditemukan</h3>
        </div>
        `;

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
// SEARCH
// =====================================

function initSearch() {

    const input = document.getElementById("searchInput");

    if (!input) return;

    input.addEventListener("input", filterAndRender);

}

// =====================================
// FILTER
// =====================================

function initFilter() {

    document.querySelectorAll(".filter-item")
    .forEach(button => {

        button.onclick = () => {

            currentCategory =
            button.dataset.category;

            filterAndRender();

            document
            .getElementById("filterSheet")
            .classList.remove("active");

        };

    });

}

// =====================================
// SORT
// =====================================

function initSort() {

    document.querySelectorAll(".sort-item")
    .forEach(button => {

        button.onclick = () => {

            currentSort =
            button.dataset.sort;

            filterAndRender();

            document
            .getElementById("sortSheet")
            .classList.remove("active");

        };

    });

}

// =====================================
// FILTER + SEARCH + SORT
// =====================================

function filterAndRender() {

    let result = [...products];

    const keyword =
    document
    .getElementById("searchInput")
    .value
    .trim()
    .toLowerCase();

    if (keyword !== "") {

        result = result.filter(product =>

            product.name
            .toLowerCase()
            .includes(keyword)

        );

    }

    if (currentCategory !== "Semua") {

        result = result.filter(product =>

            product.category === currentCategory

        );

    }

    switch (currentSort) {

        case "low":

            result.sort((a,b)=>

                Number(a.price)-Number(b.price)

            );

            break;

        case "high":

            result.sort((a,b)=>

                Number(b.price)-Number(a.price)

            );

            break;

        case "az":

            result.sort((a,b)=>

                a.name.localeCompare(b.name)

            );

            break;

        case "za":

            result.sort((a,b)=>

                b.name.localeCompare(a.name)

            );

            break;

        default:

            result.sort((a,b)=>

                new Date(b.created_at) -
                new Date(a.created_at)

            );

    }

    renderProducts(result);

}
// =====================================
// FILTER PRODUCT
// =====================================

function filterProducts(){

let result = products.filter(product=>{


if(currentCategory === "Semua"){
return true;
}


return product.category === currentCategory;


});


renderProducts(result);


}


    // SORTING

    if(currentSort==="low"){

result.sort((a,b)=>a.price-b.price);

}


if(currentSort==="high"){

result.sort((a,b)=>b.price-a.price);

}


if(currentSort==="newest"){

result.sort((a,b)=>
new Date(b.created_at)-new Date(a.created_at)
);

}


    renderProducts(result);

}



// =====================================
// RENDER PRODUCT
// =====================================

function renderProducts(data){

    const container = document.getElementById("product-list");


    if(!container) return;


    container.innerHTML = "";


    if(data.length === 0){

        container.innerHTML = `
        <div class="empty">
            Produk tidak ditemukan
        </div>
        `;

        return;
    }



    data.forEach(product=>{


        container.innerHTML += `

        <div class="product-card">


            <img 
            src="${product.image_url}"
            alt="${product.name}"
            >


            <h3>
            ${product.name}
            </h3>


            <p class="category">
            ${product.category}
            </p>


            <p class="price">
            Rp${Number(product.price).toLocaleString("id-ID")}
            </p>



            <div class="product-action">


                <a href="product.html?id=${product.id}">
                    Lihat
                </a>


                <button onclick="addToCart('${product.id}')">
                    + Keranjang
                </button>


            </div>


        </div>

        `;


    });


                        }
// =====================================
// ADD TO CART
// =====================================

function addToCart(id){

    let cart = JSON.parse(
        localStorage.getItem("cart")
    ) || [];


    let product = products.find(
        item => item.Id == id
    );


    if(!product){
        alert("Produk tidak ditemukan");
        return;
    }



    let existing = cart.find(
        item => item.Id == id
    );



    if(existing){

        existing.qty += 1;

    }else{


        cart.push({

            id: product.id,
            name: product.name,
            price: product.price,
            image_url: product.image_url,
            category: product.category,
            qty: 1

        });


    }



    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    alert(
        product.name + " masuk keranjang"
    );

}



// =====================================
// CART COUNT
// =====================================

function updateCartCount(){

    let cart = JSON.parse(
        localStorage.getItem("cart")
    ) || [];


    let total = 0;


    cart.forEach(item=>{

        total += item.qty;

    });



    let count = document.getElementById(
        "cart-count"
    );


    if(count){

        count.innerHTML = total;

    }

}



// Jalankan saat halaman dibuka

document.addEventListener(
    "DOMContentLoaded",
    updateCartCount
);
