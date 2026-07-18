// ======================================
// DHUHA ADMIN SETTINGS
// ======================================

const form = document.getElementById("settings-form");

const settings = {
    name: "",
    email: "",
    whatsapp: "",
    instagram: "",
    tiktok: "",
    shopee: "",
    tokopedia: "",
    address: ""
};
// ======================================
// LOAD SETTINGS
// ======================================

window.addEventListener("DOMContentLoaded", () => {

const saved = localStorage.getItem("dhuha_settings");

if(saved){

const data = JSON.parse(saved);

document.getElementById("store-name").value = data.name || "";

document.getElementById("store-email").value = data.email || "";

document.getElementById("store-whatsapp").value = data.whatsapp || "";

document.getElementById("store-instagram").value = data.instagram || "";

document.getElementById("store-tiktok").value = data.tiktok || "";

document.getElementById("store-shopee").value = data.shopee || "";

document.getElementById("store-tokopedia").value = data.tokopedia || "";

document.getElementById("store-address").value = data.address || "";

}

});
// ======================================
// SAVE SETTINGS
// ======================================

form.addEventListener("submit",(e)=>{

e.preventDefault();

settings.name = document.getElementById("store-name").value;

settings.email = document.getElementById("store-email").value;

settings.whatsapp = document.getElementById("store-whatsapp").value;

settings.instagram = document.getElementById("store-instagram").value;

settings.tiktok = document.getElementById("store-tiktok").value;

settings.shopee = document.getElementById("store-shopee").value;

settings.tokopedia = document.getElementById("store-tokopedia").value;

settings.address = document.getElementById("store-address").value;

localStorage.setItem(

"dhuha_settings",

JSON.stringify(settings)

);

alert("Pengaturan berhasil disimpan.");

});
// ======================================
// AUTO FOCUS
// ======================================

window.onload=()=>{

document.getElementById("store-name").focus();

};
