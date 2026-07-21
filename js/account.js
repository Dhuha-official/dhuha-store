// ======================================
// DHUHA ACCOUNT
// ======================================

const user = JSON.parse(localStorage.getItem("user"));

const name = document.getElementById("user-name");
const email = document.getElementById("user-email");

const loginArea = document.getElementById("login-area");
const logoutArea = document.getElementById("logout-area");

if (user) {

    if (name) {
        name.innerText = user.name;
    }

    if (email) {
        email.innerText = user.email;
    }

    if (loginArea) {
        loginArea.style.display = "none";
    }

    if (logoutArea) {
        logoutArea.style.display = "block";
    }

} else {

    if (name) {
        name.innerText = "Guest";
    }

    if (email) {
        email.innerText = "Silakan login untuk melanjutkan";
    }

    if (loginArea) {
        loginArea.style.display = "block";
    }

    if (logoutArea) {
        logoutArea.style.display = "none";
    }

}
