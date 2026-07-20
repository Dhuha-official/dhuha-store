const email = "admin@dhuha.com";
const password = "DHUHA123";

document.getElementById("loginBtn").onclick = () => {

const user =
document.getElementById("email").value;

const pass =
document.getElementById("password").value;

if(user===email && pass===password){

localStorage.setItem("adminLogin","true");

window.location.href="dashboard.html";

}else{

document.getElementById("loginError").innerHTML=
"Email atau Password salah.";

}

};
