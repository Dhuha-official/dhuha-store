const logout=document.getElementById("logoutBtn");

if(logout){

logout.onclick=function(){

if(confirm("Yakin ingin logout?")){

localStorage.removeItem("user");

window.location.href="login.html";

}

};

}
