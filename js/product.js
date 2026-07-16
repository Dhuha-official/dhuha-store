const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

async function loadProduct() {

  const { data: product, error } = await window.supabaseClient
    .from("products")
    .select("*")
    .eq("id", productId)
    .single();

  if (error || !product) {
    document.body.innerHTML = "<h2>Produk tidak ditemukan</h2>";
    return;
  }

  document.getElementById("product-image").src = product.image_url;
  document.getElementById("product-name").textContent = product.name;
  document.getElementById("product-price").textContent =
    "Rp " + Number(product.price).toLocaleString("id-ID");

  if (document.getElementById("product-description")) {
    document.getElementById("product-description").textContent =
      product.description || "";
  }

  document.getElementById("add-cart").onclick = () => {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(item => item.id == product.id);

    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image_url,
        qty: 1
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Produk berhasil ditambahkan ke keranjang.");

  };

}

loadProduct();
