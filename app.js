const products = [
  {
    name: "DHUHA Royal",
    price: "Rp249.000",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "DHUHA Noir",
    price: "Rp279.000",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop"
  }
];

const productList = document.getElementById("product-list");

products.forEach(product => {
  productList.innerHTML += `
    <div class="product">
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.price}</p>
    </div>
  `;
});
