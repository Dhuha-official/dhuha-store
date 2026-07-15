document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const { data, error } = await window.supabaseClient.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) {
            alert(error.message);
            return;
        }

        alert("Login berhasil");

        window.location.href = "account.html";

    } catch (err) {
        alert("Error: " + err.message);
        console.error(err);
    }
});
