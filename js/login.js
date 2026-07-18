document
.getElementById("login-btn")
.onclick = ()=>{

const email =
document
.getElementById("login-email")
.value;

const password =
document
.getElementById("login-password")
.value;

const user =
JSON.parse(localStorage.getItem("user"));

if(!user){

alert("Silakan daftar terlebih dahulu.");

return;

}

if(

email===user.email &&

password===user.password

){

localStorage.setItem("login","true");

alert("Login berhasil.");

window.location.href="account.html";

}else{

alert("Email atau password salah.");

}

};
