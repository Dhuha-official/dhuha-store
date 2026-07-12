const SUPABASE_URL = "https://valwpmiwzaqgijtrbizl.supabase.co";

const SUPABASE_KEY = "sb_publishable_REbhQNOsjfE4aT5oMXX6YA_COOzqYF8";

const supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

async function loadProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*");

  if (error) {
    console.log(error);
    return;
  }

  const list = document.getElementById("product-list");

  list.innerHTML = "";

  data.forEach(product => {
    list.innerHTML += `
      <div class="product">
        <img src="${product.image_url}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>Rp ${product.price.toLocaleString("id-ID")}</p>
      </div>
    `;
  });
}

loadProducts();
