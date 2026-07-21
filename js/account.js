// ======================================
// DHUHA ACCOUNT
// ======================================

const user = JSON.parse(localStorage.getItem("user"));

const userName = document.getElementById("user-name");
const userEmail = document.getElementById("user-email");

const loginArea = document.getElementById("login-area");
const logoutArea = document.getElementById("logout-area");

if (user) {

    if (userName) userName.innerText = user.name;

    if (userEmail) userEmail.innerText = user.email;

    if (loginArea) loginArea.style.display = "none";

    if (logoutArea) logoutArea.style.display = "block";

} else {

    if (userName) userName.innerText = "Guest";

    if (userEmail) userEmail.innerText = "Silakan login untuk melanjutkan";

    if (loginArea) loginArea.style.display = "block";

    if (logoutArea) logoutArea.style.display = "none";

}

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.onclick = () => {

        localStorage.removeItem("user");
        localStorage.removeItem("login");

        alert("Berhasil logout.");

        window.location.href = "login.html";

    };

}
