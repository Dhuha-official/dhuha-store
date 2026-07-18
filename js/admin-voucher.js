// ======================================
// DHUHA ADMIN VOUCHER
// ======================================

const form=document.getElementById("voucher-form");

let vouchers=[];
form.addEventListener("submit",(e)=>{

e.preventDefault();

const voucher={

code:document.getElementById("voucher-code").value.toUpperCase(),

type:document.getElementById("voucher-type").value,

value:Number(document.getElementById("voucher-value").value),

expired:document.getElementById("voucher-expired").value,

limit:Number(document.getElementById("voucher-limit").value),

active:document.getElementById("voucher-active").checked

};

vouchers.push(voucher);

console.log(vouchers);

alert("Voucher berhasil disimpan.");

form.reset();

});
window.onload=()=>{

document.getElementById("voucher-code").focus();

};
