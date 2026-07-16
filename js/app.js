async function loadProducts() {

  const productList = document.getElementById("product-list");

  if (!productList) return;

  const { data: products, error } =
    await window.supabaseClient
      .from("products")
      .select("*");

  if (error) {
    console.error(error);
    return;
  }

  productList.innerHTML = "";

  products.forEach(product => {

    productList.innerHTML += `
      <div class="product">

        <img src="${product.image_url}" alt="${product.name}">

        <h3>${product.name}</h3>

        <p>Rp ${Number(product.price).toLocaleString("id-ID")}</p>

        <a href="product.html?id=${product.id}" class="btn-product">
          Lihat Produk
        </a>

      </div>
    `;

  });

}

loadProducts();
