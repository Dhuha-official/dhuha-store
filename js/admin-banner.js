// ======================================
// DHUHA ADMIN BANNER
// ======================================

const desktopInput=document.getElementById("banner-desktop");

const mobileInput=document.getElementById("banner-mobile");

const desktopPreview=document.getElementById("desktop-preview");

const mobilePreview=document.getElementById("mobile-preview");

const form=document.getElementById("banner-form");
// ======================================
// PREVIEW DESKTOP
// ======================================

desktopInput.addEventListener("change",(e)=>{

const file=e.target.files[0];

if(!file)return;

desktopPreview.src=URL.createObjectURL(file);

});
// ======================================
// PREVIEW MOBILE
// ======================================

mobileInput.addEventListener("change",(e)=>{

const file=e.target.files[0];

if(!file)return;

mobilePreview.src=URL.createObjectURL(file);

});
// ======================================
// SAVE BANNER
// ======================================

form.addEventListener("submit",(e)=>{

e.preventDefault();

const banner={

desktop:desktopPreview.src,

mobile:mobilePreview.src,

active:document.getElementById("banner-active").checked

};

console.log(banner);

alert("Banner berhasil disimpan.");

});
