async function loadProducts() {

  const productList = document.getElementById("product-list");

  if (!productList) return;

  try {

    const response = await fetch("data/products.json");
    const products = await response.json();

    productList.innerHTML = "";

    products.forEach(product => {

      productList.innerHTML += `
        <div class="product">

          <img src="${product.image}" alt="${product.name}" class="product-image">

          <h3>${product.name}</h3>

          <p>Rp ${Number(product.price).toLocaleString("id-ID")}</p>

          <a href="product.html?id=${product.id}" class="btn-product">
            Lihat Produk
          </a>

          <button class="btn-cart" onclick="addToCart(${product.id})">
            Tambah ke Keranjang
          </button>

        </div>
      `;

    });

    window.products = products;

  } catch (err) {

    console.error(err);

    productList.innerHTML =
      "<h2>Produk gagal dimuat.</h2>";

  }

}

function addToCart(id) {

  const product = window.products.find(p => p.id == id);

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existing = cart.find(item => item.id == id);

  if (existing) {

    existing.qty += 1;

  } else {

    cart.push({
      ...product,
      qty: 1
    });

  }

  localStorage.setItem("cart", JSON.stringify(cart));

  alert(product.name + " berhasil ditambahkan.");

}

loadProducts();
const filterBtn = document.getElementById("filter-btn");
const filterPanel = document.getElementById("filter-panel");

filterBtn.onclick = () => {
    filterPanel.classList.toggle("show");
};
