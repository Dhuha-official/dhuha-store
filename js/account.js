const user = JSON.parse(localStorage.getItem("user"));

if(user){

document.getElementById("user-name").innerText = user.name;

document.getElementById("user-email").innerText = user.email;

}
