// ======================================
// DHUHA REGISTER
// ======================================

document.getElementById("register-btn").onclick = () => {

    const name =
    document.getElementById("register-name").value.trim();

    const email =
    document.getElementById("register-email").value.trim();

    const password =
    document.getElementById("register-password").value;

    const confirm =
    document.getElementById("register-confirm").value;

    if (!name || !email || !password || !confirm) {

        alert("Semua data wajib diisi.");

        return;

    }

    if (password !== confirm) {

        alert("Konfirmasi password tidak sama.");

        return;

    }

    let users =
    JSON.parse(localStorage.getItem("users")) || [];

    const exist =
    users.find(item => item.email === email);

    if (exist) {

        alert("Email sudah terdaftar.");

        return;

    }

    const user = {

        id: Date.now(),

        name,

        email,

        password

    };

    users.push(user);

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );

    alert("Pendaftaran berhasil.");

    window.location.href = "login.html";

};
