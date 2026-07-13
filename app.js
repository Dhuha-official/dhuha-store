const products = [
  {
    id: 1,
    name: "DHUHA Royal",
    category: "Parfum",
    price: "Rp249.000",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "DHUHA Noir",
    category: "Parfum",
    price: "Rp279.000",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Kaos Oversize DHUHA",
    category: "Kaos",
    price: "Rp149.000",
    image: "images/placeholder.png"
  },
  {
    id: 4,
    name: "Polo Premium DHUHA",
    category: "Polo",
    price: "Rp189.000",
    image: "images/placeholder.png"
  }
];

const productList = document.getElementById("product-list");

if (productList) {
  products.forEach(product => {
    productList.innerHTML += `
      <div class="product">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.price}</p>
        <a href="product.html" class="btn-product">Lihat Produk</a>
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

  cart.push(product);

  localStorage.setItem("cart", JSON.stringify(cart));

  alert(product.name + " berhasil ditambahkan ke keranjang.");
}
