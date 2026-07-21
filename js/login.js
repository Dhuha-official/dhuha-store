document.getElementById("login-btn").onclick = () => {

    const email = document.getElementById("login-email").value.trim();

    const password = document.getElementById("login-password").value.trim();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(item =>

        item.email === email &&
        item.password === password

    );

    if (!user) {

        alert("Email atau password salah.");

        return;

    }

    localStorage.setItem("user", JSON.stringify(user));

    localStorage.setItem("login", "true");

    alert("Login berhasil.");

    window.location.href = "account.html";

};
