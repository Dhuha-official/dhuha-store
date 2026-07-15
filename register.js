document.getElementById("register-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (password !== confirmPassword) {
        alert("Password dan konfirmasi password tidak sama.");
        return;
    }

    try {

        const { data, error } = await window.supabaseClient.auth.signUp({
            email,
            password
        });

        if (error) {
            alert(error.message);
            return;
        }

        alert("Pendaftaran berhasil!");
        window.location.href = "login.html";

    } catch (err) {
        alert("Catch Error: " + err.message);
    }
});
