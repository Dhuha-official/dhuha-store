
const supabaseUrl = "https://valwpmiwzaqgijtrbizl.supabase.co";

const supabaseKey = "sb_publishable_REbhQNOsjfE4aT5oMXX6YA_COOzqYF8";

const supabase = window.supabase.createClient(
  supabaseUrl,
  supabaseKey
);

async function loadProducts() {

  const { data, error } = await supabase
    .from("products")
    .select("*");

  if (error) {
    console.error(error);
    return;
  }

  const container = document.getElementById("product-list");

  if (!container) return;

  container.innerHTML = "";

  data.forEach(product => {

    container.innerHTML += `

      <div class="product">

        <img src="${product.image_url}" alt="${product.name}">

        <h3>${product.name}</h3>

        <p>Rp ${Number(product.price).toLocaleString("id-ID")}</p>

      </div>

    `;

  });

}

loadProducts();
