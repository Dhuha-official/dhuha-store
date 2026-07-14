alert("register.js berhasil dimuat");

document.getElementById("register-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  if (password !== confirmPassword) {
    alert("Password dan konfirmasi password tidak sama.");
    return;
  }

  const { error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) {
    alert("Pendaftaran gagal: " + error.message);
    return;
  }

  alert("Pendaftaran berhasil! Silakan cek email Anda untuk verifikasi, lalu login.");

  window.location.href = "login.html";
});
