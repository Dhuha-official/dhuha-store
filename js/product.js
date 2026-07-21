const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

async function loadProduct() {

    try {

        const { data, error } =
        await window.supabaseClient
        .from("products")
        .select("*")
        .eq("id", productId)
        .single();

        if (error) throw error;

        document.getElementById("product-image").src =
        data.image_url;

        document.getElementById("product-name").innerText =
        data.name;

        document.getElementById("product-price").innerText =
        "Rp " + Number(data.price).toLocaleString("id-ID");

        document.getElementById("product-description").innerText =
        data.description;

        document.getElementById("buy-now").onclick = () => {

            localStorage.setItem(
                "checkoutProduct",
                JSON.stringify(data)
            );

            location.href = "checkout.html";

        };

    } catch (err) {

        console.error(err);

        alert("Produk tidak ditemukan.");

    }

}

loadProduct();
