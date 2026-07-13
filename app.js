

const productList = document.getElementById("product-list");

if (productList) {
  products.forEach(product => {
    productList.innerHTML += `
      <div class="product">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.price}</p>
        <a href="product.html?id=${product.id}" class="btn-product">Lihat Produk</a>
<button class="btn-cart" onclick="addToCart(${product.id})">
  Tambah ke Keranjang
</button>
      </div>
    `;
  });
}
function addToCart(id){

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const product = products.find(item => item.id === id);

  const existing = cart.find(item => item.id === id);

  if(existing){
    existing.qty += 1;
  }else{
    cart.push({
      ...product,
      qty: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  alert(product.name + " berhasil ditambahkan ke keranjang.");

}
