document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { error } = await window.supabaseClient.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    alert("Login gagal: " + error.message);
    return;
  }

  alert("Login berhasil!");

  window.location.href = "account.html";
});
