const tombol = document.getElementById("pesan-wa");

tombol.onclick = async function () {

  const {
    data: { user }
  } = await window.supabaseClient.auth.getUser();

  if (!user) {
    alert("Silakan login terlebih dahulu.");
    window.location.href = "login.html";
    return;
  }

  const nama = document.getElementById("nama").value;
  const telepon = document.getElementById("telepon").value;
  const alamat = document.getElementById("alamat").value;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    alert("Keranjang masih kosong.");
    return;
  }

  let pesan = "Halo DHUHA,%0A%0ASaya ingin memesan:%0A%0A";
  let total = 0;

  for (const item of cart) {

    const qty = item.qty || 1;
    const harga = Number(item.price.replace(/[^\d]/g, ""));

    total += harga * qty;

    pesan +=
      "• " + item.name +
      " x" + qty +
      " - " + item.price +
      "%0A";

    const { error } = await window.supabaseClient
      .from("orders")
      .insert({
        user_id: user.id,
        product_name: item.name,
        price: harga,
        quantity: qty,
        total: harga * qty
      });

    if (error) {
      alert("Gagal menyimpan pesanan: " + error.message);
      return;
    }
  }

  pesan += "%0A";
  pesan += "Total : Rp" + total.toLocaleString("id-ID") + "%0A%0A";
  pesan += "Nama : " + nama + "%0A";
  pesan += "No. WA : " + telepon + "%0A";
  pesan += "Alamat : " + alamat;

  localStorage.removeItem("cart");

  window.open(
    "https://wa.me/6283191855735?text=" + pesan,
    "_blank"
  );
};
