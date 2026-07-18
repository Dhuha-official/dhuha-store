document.getElementById("register-btn").onclick = () => {

    const name = document.getElementById("register-name").value.trim();

    const email = document.getElementById("register-email").value.trim();

    const password = document.getElementById("register-password").value;

    const confirm = document.getElementById("register-confirm").value;

    if (!name || !email || !password || !confirm) {

        alert("Semua data wajib diisi.");

        return;

    }

    if (password !== confirm) {

        alert("Konfirmasi password tidak sama.");

        return;

    }

    const user = {

        name: name,

        email: email,

        password: password

    };

    localStorage.setItem("user", JSON.stringify(user));

    alert("Pendaftaran berhasil.");

    window.location.href = "login.html";

};
