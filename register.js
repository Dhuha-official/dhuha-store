document.getElementById("register-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    alert("1");

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    alert("2");

    if (password !== confirmPassword) {
        alert("Password dan konfirmasi password tidak sama.");
        return;
    }

    alert("3");

    try {

        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password
        });

        alert("4");

        if (error) {
    alert(JSON.stringify(error, null, 2));
    return;
        }

        alert("Pendaftaran berhasil!");

        window.location.href = "login.html";

    } catch (err) {
        alert("Catch Error: " + err.message);
    }

});
